#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库迁移工具
用于将开发环境的数据库迁移到打包程序中使用
"""

import os
import shutil
import sqlite3
from pathlib import Path

def backup_database():
    """备份开发环境的数据库"""
    print("正在备份数据库...")

    # 开发环境的数据库路径
    dev_db_path = "instance/class_points.db"
    backup_path = "class_points_backup.db"

    if os.path.exists(dev_db_path):
        shutil.copy2(dev_db_path, backup_path)
        print(f"✓ 数据库已备份到: {backup_path}")
        return backup_path
    else:
        print("✗ 未找到开发环境数据库文件")
        return None

def restore_database_to_packed_app():
    """将数据库恢复到打包程序的位置"""
    print("\n正在恢复数据库到打包程序...")

    backup_path = "class_points_backup.db"

    if not os.path.exists(backup_path):
        print("✗ 未找到数据库备份文件，请先运行备份")
        return False

    # 打包程序的数据库路径（相对于可执行文件）
    packed_db_dir = "instance"
    packed_db_path = os.path.join(packed_db_dir, "class_points.db")

    # 创建目录
    os.makedirs(packed_db_dir, exist_ok=True)

    # 复制数据库文件
    shutil.copy2(backup_path, packed_db_path)
    print(f"✓ 数据库已恢复到: {packed_db_path}")
    return True

def migrate_database():
    """完整的数据库迁移流程"""
    print("=" * 50)
    print("班级积分管理系统 - 数据库迁移工具")
    print("=" * 50)

    # 1. 备份开发环境数据库
    backup_file = backup_database()
    if not backup_file:
        return

    # 2. 提供使用说明
    print("\n" + "=" * 50)
    print("迁移说明：")
    print("=" * 50)
    print("1. 将备份的数据库文件复制到打包程序的相同目录")
    print("2. 打包程序的数据库路径结构：")
    print("   class_points_system.exe")
    print("   └── instance/")
    print("       └── class_points.db")
    print("\n3. 或者手动操作：")
    print(f"   - 复制 '{backup_file}' 文件")
    print("   - 粘贴到打包程序的 'instance' 文件夹中")
    print("   - 重命名为 'class_points.db'")
    print("\n4. 如果没有 'instance' 文件夹，请手动创建")

    # 3. 询问是否自动恢复
    print("\n" + "=" * 50)
    choice = input("是否自动将数据库恢复到打包程序目录？(y/n): ").strip().lower()

    if choice == 'y':
        if restore_database_to_packed_app():
            print("\n✓ 数据库迁移完成！")
        else:
            print("\n✗ 数据库迁移失败")
    else:
        print("\n✓ 数据库备份完成，请手动迁移")

if __name__ == "__main__":
    migrate_database()
    input("\n按回车键退出...")