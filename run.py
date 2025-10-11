#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
班级积分管理系统启动脚本
"""

from app import app, db
from models import Student, PointsRecord, PointsCategory
import os

def init_database():
    """初始化数据库"""
    with app.app_context():
        # 创建数据库表
        db.create_all()

        # 检查是否已有数据
        if PointsCategory.query.count() == 0:
            # 添加默认积分类别
            default_categories = [
                {'name': '作业', 'description': '作业完成情况', 'default_points': 5},
                {'name': '考试', 'description': '考试成绩', 'default_points': 10},
                {'name': '纪律', 'description': '课堂纪律', 'default_points': 3},
                {'name': '表现', 'description': '课堂表现', 'default_points': 2},
                {'name': '其他', 'description': '其他情况', 'default_points': 1}
            ]

            for cat_data in default_categories:
                category = PointsCategory(**cat_data)
                db.session.add(category)

            db.session.commit()
            print('数据库初始化完成！已添加默认类别。')
        else:
            print('数据库已存在数据。')

        # 显示数据库文件位置
        import os
        db_path = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
        print(f'数据库文件位置: {db_path}')

def main():
    """主函数"""
    import sys
    import io

    # 设置输出编码
    if sys.platform == 'win32':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

    print("=" * 50)
    print("班级积分管理系统")
    print("=" * 50)

    # 确保数据库目录存在
    os.makedirs('instance', exist_ok=True)

    # 初始化数据库
    init_database()

    print("\n正在启动服务器...")
    print("访问地址: http://127.0.0.1:5000")
    print("按 Ctrl+C 停止服务器")
    print("=" * 50)

    try:
        app.run(host='0.0.0.0', port=5000, debug=True)
    except KeyboardInterrupt:
        print("\n服务器已停止")

if __name__ == '__main__':
    main()