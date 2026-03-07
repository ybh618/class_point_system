/**
 * 数据库操作模块
 * 提供 D1 数据库的基础查询和操作函数
 */

import type { D1Database } from '@cloudflare/workers-types'
import { PAGE_SIZE, DEFAULT_COLOR } from './constants'

// 重新导出 PAGE_SIZE 以保持向后兼容
export { PAGE_SIZE }

/**
 * 执行查询并返回所有结果
 * @param db D1 数据库实例
 * @param sql SQL 查询语句
 * @param params 查询参数
 * @returns 查询结果数组
 */
export async function queryAll<T>(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const stmt = db.prepare(sql)
  const result = await stmt.bind(...params).all<T>()
  return result.results ?? []
}

/**
 * 执行查询并返回第一条结果
 * @param db D1 数据库实例
 * @param sql SQL 查询语句
 * @param params 查询参数
 * @returns 第一条结果或 null
 */
export async function queryOne<T>(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await queryAll<T>(db, sql, params)
  return rows[0] ?? null
}

/**
 * 执行不返回结果的 SQL 语句（INSERT、UPDATE、DELETE）
 * @param db D1 数据库实例
 * @param sql SQL 语句
 * @param params 语句参数
 */
export async function execute(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<void> {
  await db.prepare(sql).bind(...params).run()
}

export async function executeBatch(
  db: D1Database,
  statements: Array<{ sql: string; params?: unknown[] }>,
  chunkSize = 100
): Promise<void> {
  if (statements.length === 0) {
    return
  }

  for (let i = 0; i < statements.length; i += chunkSize) {
    const chunk = statements.slice(i, i + chunkSize)
    await db.batch(
      chunk.map((statement) => db.prepare(statement.sql).bind(...(statement.params ?? [])))
    )
  }
}

// 初始化状态标记
let schemaEnsured = false
let categoriesEnsured = false
let schemaEnsurePromise: Promise<void> | null = null
let categoriesEnsurePromise: Promise<void> | null = null

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS points_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    default_points INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    class_name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '${DEFAULT_COLOR}',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    group_id INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS points_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    points INTEGER NOT NULL,
    reason TEXT,
    category TEXT NOT NULL,
    operator TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_points_records_student ON points_records(student_id)`,
  `CREATE INDEX IF NOT EXISTS idx_points_records_created ON points_records(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_points_records_student_created ON points_records(student_id, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_points_records_category ON points_records(category)`,
  `CREATE INDEX IF NOT EXISTS idx_students_group ON students(group_id)`,
  `CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_name)`,
  `CREATE INDEX IF NOT EXISTS idx_students_name ON students(name)`,
  `CREATE INDEX IF NOT EXISTS idx_students_class_name ON students(class_name, name)`
]

/**
 * 确保数据库 schema 已创建
 * @param db D1 数据库实例
 */
export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaEnsured) {
    return
  }

  if (schemaEnsurePromise) {
    await schemaEnsurePromise
    return
  }

  schemaEnsurePromise = (async () => {
    await db.batch(SCHEMA_STATEMENTS.map((statement) => db.prepare(statement)))
    schemaEnsured = true
  })()

  try {
    await schemaEnsurePromise
  } finally {
    schemaEnsurePromise = null
  }
}

/**
 * 确保默认积分类别已创建
 * 优化：使用内存标记避免重复查询数据库
 * @param db D1 数据库实例
 */
export async function ensureDefaultCategories(db: D1Database): Promise<void> {
  await ensureSchema(db)

  if (categoriesEnsured) {
    return
  }

  if (categoriesEnsurePromise) {
    await categoriesEnsurePromise
    return
  }

  categoriesEnsurePromise = (async () => {
    const defaults = [
      { name: '作业', description: '作业完成情况', default_points: 5 },
      { name: '考试', description: '考试成绩', default_points: 10 },
      { name: '纪律', description: '课堂纪律', default_points: 3 },
      { name: '表现', description: '课堂表现', default_points: 2 },
      { name: '其他', description: '其他情况', default_points: 1 },
    ]

    await db.batch(
      defaults.map((item) =>
        db.prepare(
          'INSERT OR IGNORE INTO points_categories (name, description, default_points, is_active) VALUES (?, ?, ?, 1)'
        ).bind(item.name, item.description, item.default_points)
      )
    )

    categoriesEnsured = true
  })()

  try {
    await categoriesEnsurePromise
  } finally {
    categoriesEnsurePromise = null
  }
}
