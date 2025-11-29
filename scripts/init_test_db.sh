#!/bin/bash

# 初始化测试数据库脚本
# 使用 class_point_d1.sql 作为测试数据源
# 用法: bash scripts/init_test_db.sh 或 npm run db:test

echo "🔄 初始化测试数据库..."
echo ""

# 删除旧的本地数据库状态
echo "📦 清除旧的数据库状态..."
rm -rf .wrangler/state/v3/d1

if [ $? -eq 0 ]; then
  echo "✅ 已清除旧的数据库状态"
else
  echo "⚠️  清除数据库状态失败（可能不存在）"
fi

echo ""

# 运行迁移（创建表结构）
echo "🔨 运行数据库迁移..."
npm run db:migrate

if [ $? -ne 0 ]; then
  echo "❌ 迁移失败"
  exit 1
fi

echo "✅ 迁移完成"
echo ""

# 导入测试数据
echo "📥 导入测试数据 (class_point_d1_data_only.sql)..."
wrangler d1 execute class_points_d1 --local --file class_point_d1_data_only.sql

if [ $? -eq 0 ]; then
  echo "✅ 测试数据导入完成"
else
  echo "❌ 测试数据导入失败"
  exit 1
fi

echo ""
echo "🎉 数据库初始化完成！"
echo ""
echo "📊 数据库统计："
echo "   - 学生数量: 50"
echo "   - 小组数量: 8"
echo "   - 积分类别: 9"
echo "   - 积分记录: 826+"
echo ""
echo "🚀 现在可以运行以下命令启动开发服务器："
echo "   npm run dev"
echo ""
