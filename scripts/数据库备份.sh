#!/bin/bash

# ---------------------------
# Cloudflare D1 数据库导出脚本（中文输出）
# ---------------------------

DB_NAME="class_points_d1"   # ← 请修改为你的 D1 名称
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

SQL_FILE="d1备份_${DATE}.sql"
SQLITE_FILE="d1备份_${DATE}.sqlite"
LOG_FILE="d1导出日志_${DATE}.log"

echo "=== 开始导出 Cloudflare D1 数据库 ===" | tee -a "$LOG_FILE"
echo "数据库名称：$DB_NAME" | tee -a "$LOG_FILE"
echo "时间：$DATE" | tee -a "$LOG_FILE"

# Step 1 — 导出 SQL 文件
echo ""
echo ">> 正在导出 SQL 文件：$SQL_FILE" | tee -a "$LOG_FILE"

wrangler d1 export "$DB_NAME" --file "$SQL_FILE" 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    echo "✔ SQL 导出成功：$SQL_FILE" | tee -a "$LOG_FILE"
else
    echo "✖ SQL 导出失败！" | tee -a "$LOG_FILE"
fi

# Step 2 — 导出 SQLite 文件
echo ""
echo ">> 正在导出 SQLite 文件：$SQLITE_FILE" | tee -a "$LOG_FILE"

wrangler d1 export "$DB_NAME" --file "$SQLITE_FILE" --format=sqlite 2>&1 | tee -a "$LOG_FILE"

if [ $? -eq 0 ]; then
    echo "✔ SQLite 导出成功：$SQLITE_FILE" | tee -a "$LOG_FILE"
else
    echo "✖ SQLite 导出失败！" | tee -a "$LOG_FILE"
fi

echo ""
echo "=== 导出完成 ===" | tee -a "$LOG_FILE"
echo "日志文件：$LOG_FILE"

