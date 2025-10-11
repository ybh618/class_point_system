from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_file
from models import db, Student, PointsRecord, PointsCategory, Group
from datetime import datetime
import pandas as pd
import io
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# 数据库配置 - 兼容开发环境和打包环境
import os
import sys

def get_base_dir():
    """获取应用程序的基础目录"""
    if getattr(sys, 'frozen', False):
        # 打包后的环境
        return os.path.dirname(sys.executable)
    else:
        # 开发环境
        return os.path.abspath(os.path.dirname(__file__))

# 设置数据库路径
base_dir = get_base_dir()
db_path = os.path.join(base_dir, 'instance', 'class_points.db')

# 确保 instance 目录存在
os.makedirs(os.path.dirname(db_path), exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    """首页 - 显示概览信息"""
    total_students = Student.query.count()
    total_records = PointsRecord.query.count()
    recent_records = PointsRecord.query.order_by(PointsRecord.created_at.desc()).limit(10).all()

    # 计算今日记录数
    today = datetime.now().date()
    today_records = PointsRecord.query.filter(
        PointsRecord.created_at >= today
    ).count()

    return render_template('index.html',
                         total_students=total_students,
                         total_records=total_records,
                         recent_records=recent_records,
                         today_records=today_records)

@app.route('/students')
def students():
    """学生列表"""
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')

    query = Student.query
    if search:
        query = query.filter(Student.name.contains(search) |
                           Student.student_id.contains(search) |
                           Student.class_name.contains(search))

    students = query.paginate(page=page, per_page=20, error_out=False)

    return render_template('students.html', students=students, search=search)

@app.route('/student/add', methods=['GET', 'POST'])
def add_student():
    """添加学生"""
    if request.method == 'POST':
        # 检查是否是Excel导入
        if 'excel_file' in request.files:
            file = request.files['excel_file']
            if file and file.filename != '' and file.filename.endswith(('.xlsx', '.xls')):
                try:
                    # 读取Excel文件
                    df = pd.read_excel(file)

                    # 检查是否有第二列
                    if len(df.columns) < 2:
                        flash('Excel文件至少需要两列数据！', 'error')
                        return redirect(url_for('add_student'))

                    # 从第二列读取学生姓名（假设第一列是学号，第二列是姓名）
                    import_count = 0
                    for index, row in df.iterrows():
                        # 跳过空行
                        if pd.isna(row.iloc[1]) or str(row.iloc[1]).strip() == '':
                            continue

                        # 生成学号（使用索引+1作为临时学号）
                        student_id = f"import_{index + 1}"
                        name = str(row.iloc[1]).strip()

                        # 检查学号是否已存在
                        if not Student.query.filter_by(student_id=student_id).first():
                            student = Student(
                                student_id=student_id,
                                name=name,
                                class_name='默认班级'  # 默认班级，用户可以在导入后修改
                            )
                            db.session.add(student)
                            import_count += 1

                    db.session.commit()
                    flash(f'成功导入 {import_count} 名学生！', 'success')
                    return redirect(url_for('students'))

                except Exception as e:
                    flash(f'Excel文件读取失败：{str(e)}', 'error')
                    return redirect(url_for('add_student'))

        # 单个学生添加
        student_id = request.form['student_id']
        name = request.form['name']
        class_name = request.form['class_name']

        # 检查学号是否已存在
        if Student.query.filter_by(student_id=student_id).first():
            flash('学号已存在！', 'error')
            return redirect(url_for('add_student'))

        student = Student(student_id=student_id, name=name, class_name=class_name)
        db.session.add(student)
        db.session.commit()

        flash('学生添加成功！', 'success')
        return redirect(url_for('students'))

    return render_template('add_student.html')

@app.route('/student/<int:id>')
def student_detail(id):
    """学生详情"""
    student = Student.query.get_or_404(id)
    points_records = PointsRecord.query.filter_by(student_id=id).order_by(PointsRecord.created_at.desc()).all()

    return render_template('student_detail.html', student=student, records=points_records)

@app.route('/points/add', methods=['GET', 'POST'])
def add_points():
    """添加积分记录"""
    if request.method == 'POST':
        student_id = request.form['student_id']
        points = int(request.form['points'])
        reason = request.form.get('reason', '').strip()
        category = request.form['category']
        operator = request.form.get('operator', '').strip()

        # 如果事由为空，使用类别作为默认事由
        if not reason:
            reason = f"{category}积分记录"

        record = PointsRecord(
            student_id=student_id,
            points=points,
            reason=reason,
            category=category,
            operator=operator
        )
        db.session.add(record)
        db.session.commit()

        # 检查是否是 AJAX 请求
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            # 返回 JSON 响应
            student = Student.query.get(student_id)
            total_points = db.session.query(db.func.sum(PointsRecord.points)).filter_by(student_id=student_id).scalar() or 0
            return jsonify({
                'success': True,
                'message': '积分记录添加成功！',
                'new_total_points': total_points
            })

        flash('积分记录添加成功！', 'success')
        return redirect(url_for('points_records'))

    # GET 请求：获取所有学生及其当前积分，按小组组织
    groups_with_students = []

    # 获取所有小组
    all_groups = Group.query.all()

    # 为每个小组添加学生数据
    for group in all_groups:
        group_students = []
        for student in group.students:
            # 计算学生的总积分
            total_points = db.session.query(db.func.sum(PointsRecord.points)).filter_by(student_id=student.id).scalar() or 0

            # 计算本周积分
            from datetime import datetime, timedelta
            now = datetime.now()
            week_start = now - timedelta(days=now.weekday())
            week_start = week_start.replace(hour=0, minute=0, second=0, microsecond=0)
            week_points = db.session.query(db.func.sum(PointsRecord.points)).filter(
                PointsRecord.student_id == student.id,
                PointsRecord.created_at >= week_start
            ).scalar() or 0

            student_data = {
                'id': student.id,
                'name': student.name,
                'student_id': student.student_id,
                'class_name': student.class_name,
                'total_points': total_points,
                'week_points': week_points,
                'group': student.group,
                'group_id': student.group_id
            }
            group_students.append(student_data)

        groups_with_students.append({
            'group': group,
            'students': group_students
        })

    # 获取未分组的学生
    ungrouped_students = []
    ungrouped = Student.query.filter(Student.group_id.is_(None)).all()
    for student in ungrouped:
        # 计算学生的总积分
        total_points = db.session.query(db.func.sum(PointsRecord.points)).filter_by(student_id=student.id).scalar() or 0

        # 计算本周积分
        from datetime import datetime, timedelta
        now = datetime.now()
        week_start = now - timedelta(days=now.weekday())
        week_start = week_start.replace(hour=0, minute=0, second=0, microsecond=0)
        week_points = db.session.query(db.func.sum(PointsRecord.points)).filter(
            PointsRecord.student_id == student.id,
            PointsRecord.created_at >= week_start
        ).scalar() or 0

        student_data = {
            'id': student.id,
            'name': student.name,
            'student_id': student.student_id,
            'class_name': student.class_name,
            'total_points': total_points,
            'week_points': week_points,
            'group': None,
            'group_id': None
        }
        ungrouped_students.append(student_data)

    categories = PointsCategory.query.filter_by(is_active=True).all()

    return render_template('add_points.html',
                         groups_with_students=groups_with_students,
                         ungrouped_students=ungrouped_students,
                         categories=categories)

@app.route('/points/import', methods=['GET', 'POST'])
def import_points():
    """批量导入分数"""
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': '请选择文件'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'message': '请选择文件'})

        if not file.filename.endswith(('.xlsx', '.xls')):
            return jsonify({'success': False, 'message': '只支持 .xlsx 和 .xls 格式的Excel文件'})

        try:
            # 读取Excel文件
            df = pd.read_excel(file)

            # 检查列数
            if df.shape[1] < 2:
                return jsonify({'success': False, 'message': '文件格式错误：至少需要2列（姓名、分数）'})

            # 获取表单参数
            category = request.form.get('category', '批量导入')
            reason = request.form.get('reason', '批量导入')
            operator = request.form.get('operator', '')
            skip_not_found = request.form.get('skip_not_found') == 'on'

            # 处理数据
            success_count = 0
            failed_count = 0
            failed_records = []
            total_records = 0

            # 从第二行开始处理数据（第一行可能是标题）
            for index, row in df.iterrows():
                # 跳过空行
                if pd.isna(row.iloc[0]) or pd.isna(row.iloc[1]):
                    continue

                total_records += 1
                name = str(row.iloc[0]).strip()
                points = row.iloc[1]

                # 验证分数格式
                try:
                    points = int(points)
                except (ValueError, TypeError):
                    failed_count += 1
                    failed_records.append({
                        'name': name,
                        'points': points,
                        'error': '分数格式错误'
                    })
                    continue

                # 查找学生
                student = Student.query.filter_by(name=name).first()
                if not student:
                    if skip_not_found:
                        failed_count += 1
                        failed_records.append({
                            'name': name,
                            'points': points,
                            'error': '学生不存在'
                        })
                        continue
                    else:
                        failed_count += 1
                        failed_records.append({
                            'name': name,
                            'points': points,
                            'error': '学生不存在'
                        })
                        continue

                # 创建积分记录
                try:
                    record = PointsRecord(
                        student_id=student.id,
                        points=points,
                        reason=reason,
                        category=category,
                        operator=operator
                    )
                    db.session.add(record)
                    success_count += 1
                except Exception as e:
                    failed_count += 1
                    failed_records.append({
                        'name': name,
                        'points': points,
                        'error': f'数据库错误: {str(e)}'
                    })

            # 提交所有成功记录
            if success_count > 0:
                db.session.commit()

            return jsonify({
                'success': True,
                'message': f'导入完成！成功 {success_count} 条，失败 {failed_count} 条',
                'total_records': total_records,
                'success_count': success_count,
                'failed_count': failed_count,
                'failed_records': failed_records
            })

        except Exception as e:
            return jsonify({'success': False, 'message': f'文件处理错误: {str(e)}'})

    # GET 请求：显示导入页面
    categories = PointsCategory.query.filter_by(is_active=True).all()
    return render_template('import_points.html', categories=categories)

@app.route('/points')
def points_records():
    """积分记录列表"""
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')

    query = PointsRecord.query.join(Student)
    if search:
        query = query.filter(Student.name.contains(search) |
                           Student.student_id.contains(search) |
                           PointsRecord.reason.contains(search))

    records = query.order_by(PointsRecord.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False)

    return render_template('points_records.html', records=records, search=search)

@app.route('/statistics')
def statistics():
    """统计页面"""
    # 班级统计
    class_stats = db.session.query(
        Student.class_name,
        db.func.count(Student.id).label('student_count'),
        db.func.sum(PointsRecord.points).label('total_points')
    ).join(PointsRecord).group_by(Student.class_name).all()

    # 积分类别统计
    category_stats = db.session.query(
        PointsRecord.category,
        db.func.count(PointsRecord.id).label('record_count'),
        db.func.sum(PointsRecord.points).label('total_points')
    ).group_by(PointsRecord.category).all()

    # 学生排行榜
    student_ranking = []
    students = Student.query.all()
    for student in students:
        total_points = student.total_points()
        student_ranking.append({
            'student': student,
            'total_points': total_points
        })
    student_ranking.sort(key=lambda x: x['total_points'], reverse=True)

    return render_template('statistics.html',
                         class_stats=class_stats,
                         category_stats=category_stats,
                         student_ranking=student_ranking[:20])

@app.route('/categories')
def categories():
    """积分类别管理"""
    categories = PointsCategory.query.all()
    return render_template('categories.html', categories=categories)

@app.route('/category/add', methods=['GET', 'POST'])
def add_category():
    """添加积分类别"""
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        default_points = int(request.form['default_points'])

        category = PointsCategory(
            name=name,
            description=description,
            default_points=default_points
        )
        db.session.add(category)
        db.session.commit()

        flash('类别添加成功！', 'success')
        return redirect(url_for('categories'))

    return render_template('add_category.html')

@app.route('/category/<int:id>/edit', methods=['GET', 'POST'])
def edit_category(id):
    """编辑积分类别"""
    category = PointsCategory.query.get_or_404(id)

    if request.method == 'POST':
        category.name = request.form['name']
        category.description = request.form['description']
        category.default_points = int(request.form['default_points'])
        category.is_active = request.form.get('is_active') == 'on'

        db.session.commit()
        flash('类别更新成功！', 'success')
        return redirect(url_for('categories'))

    return render_template('edit_category.html', category=category)

@app.route('/category/<int:id>/delete', methods=['POST'])
def delete_category(id):
    """删除积分类别"""
    category = PointsCategory.query.get_or_404(id)

    # 检查是否有积分记录使用该类别
    records_count = PointsRecord.query.filter_by(category=category.name).count()
    if records_count > 0:
        flash(f'无法删除该类别，因为有 {records_count} 条积分记录正在使用它！', 'error')
        return redirect(url_for('categories'))

    db.session.delete(category)
    db.session.commit()
    flash('类别删除成功！', 'success')
    return redirect(url_for('categories'))

# 小组管理路由
@app.route('/groups')
def groups():
    """小组管理"""
    groups = Group.query.all()
    return render_template('groups.html', groups=groups)

@app.route('/group/add', methods=['GET', 'POST'])
def add_group():
    """添加小组"""
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        class_name = request.form['class_name']
        color = request.form.get('color', '#007bff')

        group = Group(
            name=name,
            description=description,
            class_name=class_name,
            color=color
        )
        db.session.add(group)
        db.session.commit()

        flash('小组添加成功！', 'success')
        return redirect(url_for('groups'))

    return render_template('add_group.html')

@app.route('/group/<int:id>/edit', methods=['GET', 'POST'])
def edit_group(id):
    """编辑小组"""
    group = Group.query.get_or_404(id)

    if request.method == 'POST':
        group.name = request.form['name']
        group.description = request.form['description']
        group.class_name = request.form['class_name']
        group.color = request.form.get('color', '#007bff')

        db.session.commit()
        flash('小组更新成功！', 'success')
        return redirect(url_for('groups'))

    # 获取该班级的所有学生（包括已分组但可以重新分配的学生）
    available_students = Student.query.filter(
        Student.class_name == group.class_name
    ).all()

    return render_template('edit_group.html', group=group, available_students=available_students)

@app.route('/group/<int:id>/delete', methods=['POST'])
def delete_group(id):
    """删除小组"""
    group = Group.query.get_or_404(id)

    # 将该小组的所有学生的小组ID设为NULL
    Student.query.filter_by(group_id=id).update({'group_id': None})

    db.session.delete(group)
    db.session.commit()

    flash('小组删除成功！', 'success')
    return redirect(url_for('groups'))

@app.route('/student/<int:id>/set_group', methods=['POST'])
def set_student_group(id):
    """设置学生小组"""
    student = Student.query.get_or_404(id)
    group_id = request.form.get('group_id')

    if group_id == '':
        student.group_id = None
    else:
        student.group_id = int(group_id)

    db.session.commit()

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({'success': True, 'message': '小组设置成功！'})

    flash('小组设置成功！', 'success')
    return redirect(url_for('students'))

@app.route('/group/<int:id>/add_students', methods=['POST'])
def add_students_to_group(id):
    """批量添加学生到小组"""
    group = Group.query.get_or_404(id)
    student_ids = request.form.getlist('student_ids')

    if not student_ids:
        flash('请选择要添加的学生！', 'error')
        return redirect(url_for('edit_group', id=id))

    added_count = 0
    for student_id in student_ids:
        student = Student.query.get(student_id)
        if student and student.class_name == group.class_name:
            student.group_id = group.id
            added_count += 1

    db.session.commit()
    flash(f'成功添加 {added_count} 名学生到小组！', 'success')
    return redirect(url_for('edit_group', id=id))

# 统计和排名路由
@app.route('/rankings')
def rankings():
    """积分排名统计 - 整合日期区间统计功能"""
    start_date_str = request.args.get('start_date', '')
    end_date_str = request.args.get('end_date', '')

    start_date = None
    end_date = None

    if start_date_str:
        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        except ValueError:
            flash('开始日期格式错误，请使用 YYYY-MM-DD 格式', 'error')

    if end_date_str:
        try:
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
        except ValueError:
            flash('结束日期格式错误，请使用 YYYY-MM-DD 格式', 'error')

    # 验证日期范围
    if start_date and end_date and start_date > end_date:
        flash('开始日期不能晚于结束日期', 'error')
        start_date = None
        end_date = None

    # 总分排名
    student_ranking = []
    students = Student.query.all()
    for student in students:
        total_points = student.total_points()
        week_points = student.week_points()
        range_points = student.points_in_date_range(start_date, end_date) if start_date and end_date else 0
        student_ranking.append({
            'student': student,
            'total_points': total_points,
            'week_points': week_points,
            'range_points': range_points
        })

    # 按总分排序
    student_ranking.sort(key=lambda x: x['total_points'], reverse=True)

    # 小组平均分排名
    group_ranking = []
    groups = Group.query.all()
    for group in groups:
        if group.students:  # 只计算有学生的小组
            avg_points = group.average_points()
            week_avg_points = group.week_average_points()
            avg_range_points = group.average_points_in_date_range(start_date, end_date) if start_date and end_date else 0
            total_range_points = group.points_in_date_range(start_date, end_date) if start_date and end_date else 0
            group_ranking.append({
                'group': group,
                'average_points': avg_points,
                'week_average_points': week_avg_points,
                'avg_range_points': avg_range_points,
                'total_range_points': total_range_points
            })

    # 按平均分排序
    group_ranking.sort(key=lambda x: x['average_points'], reverse=True)

    return render_template('rankings.html',
                         student_ranking=student_ranking,
                         group_ranking=group_ranking,
                         start_date=start_date_str,
                         end_date=end_date_str)

# 删除单独的date_range_stats路由，功能已整合到rankings中

@app.route('/export')
def export_data():
    """导出数据"""
    format_type = request.args.get('format', 'excel')

    if format_type == 'excel':
        # 导出学生积分数据到Excel
        data = []
        students = Student.query.all()

        for student in students:
            total_points = student.total_points()
            records = PointsRecord.query.filter_by(student_id=student.id).all()

            for record in records:
                data.append({
                    '学号': student.student_id,
                    '姓名': student.name,
                    '班级': student.class_name,
                    '积分': record.points,
                    '事由': record.reason,
                    '类别': record.category,
                    '操作人': record.operator,
                    '时间': record.created_at.strftime('%Y-%m-%d %H:%M:%S')
                })

        df = pd.DataFrame(data)
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='积分记录')

        output.seek(0)
        return send_file(output,
                        as_attachment=True,
                        download_name='class_points_records.xlsx',
                        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    return redirect(url_for('statistics'))

@app.cli.command()
def init_db():
    """初始化数据库"""
    db.create_all()

    # 添加默认积分类别
    default_categories = [
        {'name': '作业', 'description': '作业完成情况', 'default_points': 5},
        {'name': '考试', 'description': '考试成绩', 'default_points': 10},
        {'name': '纪律', 'description': '课堂纪律', 'default_points': 3},
        {'name': '表现', 'description': '课堂表现', 'default_points': 2},
        {'name': '其他', 'description': '其他情况', 'default_points': 1}
    ]

    for cat_data in default_categories:
        if not PointsCategory.query.filter_by(name=cat_data['name']).first():
            category = PointsCategory(**cat_data)
            db.session.add(category)

    db.session.commit()
    print('数据库初始化完成！')

if __name__ == '__main__':
    app.run(debug=True)