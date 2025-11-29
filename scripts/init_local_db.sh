#!/bin/bash

# 初始化本地 D1 数据库脚本
# 用法: bash scripts/init_local_db.sh

echo "初始化本地 D1 数据库..."

# 删除旧的本地数据库状态
rm -rf .wrangler/state/v3/d1

echo "✓ 已清除旧的数据库状态"

# 运行迁移
echo "运行数据库迁移..."
npm run db:migrate

echo "✓ 迁移完成"

# 导入 seed 数据
echo "导入测试数据..."
wrangler d1 execute class_points_d1 --local --file d1_seed.sql

echo "✓ 测试数据导入完成"
echo ""
echo "数据库初始化完成！"
echo "现在可以运行 npm run dev 启动开发服务器"
