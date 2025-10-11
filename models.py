from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)  # 小组名称
    description = db.Column(db.String(200))  # 小组描述
    class_name = db.Column(db.String(50), nullable=False)  # 所属班级
    color = db.Column(db.String(7), default='#007bff')  # 小组颜色（十六进制）
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 关联学生
    students = db.relationship('Student', backref='group', lazy=True)

    def total_points(self):
        """计算小组总积分"""
        return sum(student.total_points() for student in self.students)

    def average_points(self):
        """计算小组平均积分"""
        if not self.students:
            return 0
        return self.total_points() / len(self.students)

    def week_points(self):
        """计算小组本周积分"""
        return sum(student.week_points() for student in self.students)

    def week_average_points(self):
        """计算小组本周平均积分"""
        if not self.students:
            return 0
        return self.week_points() / len(self.students)

    def points_in_date_range(self, start_date, end_date):
        """计算小组在指定日期区间内的总积分"""
        return sum(student.points_in_date_range(start_date, end_date) for student in self.students)

    def average_points_in_date_range(self, start_date, end_date):
        """计算小组在指定日期区间内的平均积分"""
        if not self.students:
            return 0
        return self.points_in_date_range(start_date, end_date) / len(self.students)

    def __repr__(self):
        return f'<Group {self.name}>'

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(20), unique=True, nullable=False)  # 学号
    name = db.Column(db.String(50), nullable=False)  # 姓名
    class_name = db.Column(db.String(50), nullable=False)  # 班级
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)  # 所属小组
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 关联积分记录
    points_records = db.relationship('PointsRecord', backref='student', lazy=True)

    def total_points(self):
        """计算学生总积分"""
        return sum(record.points for record in self.points_records)

    def week_points(self):
        """计算本周积分"""
        from datetime import datetime, timedelta
        now = datetime.utcnow()
        week_start = now - timedelta(days=now.weekday())
        week_start = week_start.replace(hour=0, minute=0, second=0, microsecond=0)

        week_records = [record for record in self.points_records
                       if record.created_at >= week_start]
        return sum(record.points for record in week_records)

    def points_in_date_range(self, start_date, end_date):
        """计算指定日期区间内的积分"""
        if start_date and end_date:
            range_records = [record for record in self.points_records
                           if start_date <= record.created_at.date() <= end_date]
            return sum(record.points for record in range_records)
        return 0

    def __repr__(self):
        return f'<Student {self.name}({self.student_id})>'

class PointsRecord(db.Model):
    __tablename__ = 'points_records'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    points = db.Column(db.Integer, nullable=False)  # 积分值（正为加分，负为扣分）
    reason = db.Column(db.String(200), default='')  # 积分事由
    category = db.Column(db.String(50), nullable=False)  # 积分类别（作业、考试、纪律等）
    operator = db.Column(db.String(50), default='')  # 操作人（老师）
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<PointsRecord {self.student.name} {self.points} points>'

class PointsCategory(db.Model):
    __tablename__ = 'points_categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)  # 类别名称
    description = db.Column(db.String(200))  # 类别描述
    default_points = db.Column(db.Integer, default=0)  # 默认积分值
    is_active = db.Column(db.Boolean, default=True)  # 是否启用

    def __repr__(self):
        return f'<PointsCategory {self.name}>'