/**
 * 数据库操作模块
 * 提供 D1 数据库的基础查询和操作函数
 */

import type { D1Database } from '@cloudflare/workers-types'
import type { Pagination } from './types'
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

// 初始化状态标记
let schemaEnsured = false
let categoriesEnsured = false

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
  `CREATE INDEX IF NOT EXISTS idx_students_group ON students(group_id)`,
  `CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_name)`
]

/**
 * 确保数据库 schema 已创建
 * @param db D1 数据库实例
 */
export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaEnsured) {
    return
  }
  for (const statement of SCHEMA_STATEMENTS) {
    await db.prepare(statement).run()
  }
  schemaEnsured = true
}

/**
 * 分页查询选项
 */
export type PaginateOptions = {
  page?: number
  perPage?: number
}

/**
 * 执行分页查询
 * @param db D1 数据库实例
 * @param baseSql 基础查询语句（不含 LIMIT/OFFSET）
 * @param countSql 计数查询语句
 * @param params 查询参数
 * @param options 分页选项
 * @returns 分页结果
 */
export async function paginate<T>(
  db: D1Database,
  baseSql: string,
  countSql: string,
  params: unknown[] = [],
  options: PaginateOptions = {}
): Promise<Pagination<T>> {
  const page = Math.max(1, options.page ?? 1)
  const perPage = options.perPage ?? PAGE_SIZE
  const offset = (page - 1) * perPage

  const rows = await queryAll<T>(db, `${baseSql} LIMIT ? OFFSET ?`, [...params, perPage, offset])
  const countRow = await queryOne<{ total: number }>(db, countSql, params)
  const total = countRow?.total ?? 0
  return {
    items: rows,
    page,
    per_page: perPage,
    total,
    pages: Math.max(1, Math.ceil(total / perPage)),
  }
}

/**
 * 确保默认积分类别已创建
 * 优化：使用内存标记避免重复查询数据库
 * @param db D1 数据库实例
 */
export async function ensureDefaultCategories(db: D1Database): Promise<void> {
  await ensureSchema(db)
  
  // 如果已经确认类别存在，直接返回
  if (categoriesEnsured) {
    return
  }
  
  const existing = await queryOne<{ count: number }>(
    db,
    'SELECT COUNT(*) as count FROM points_categories',
    []
  )
  
  if ((existing?.count ?? 0) > 0) {
    // 标记类别已存在，后续请求不再查询
    categoriesEnsured = true
    return
  }

  const defaults = [
    { name: '作业', description: '作业完成情况', default_points: 5 },
    { name: '考试', description: '考试成绩', default_points: 10 },
    { name: '纪律', description: '课堂纪律', default_points: 3 },
    { name: '表现', description: '课堂表现', default_points: 2 },
    { name: '其他', description: '其他情况', default_points: 1 },
  ]

  for (const item of defaults) {
    await execute(
      db,
      'INSERT INTO points_categories (name, description, default_points, is_active) VALUES (?, ?, ?, 1)',
      [item.name, item.description, item.default_points]
    )
  }
  
  // 标记类别已初始化
  categoriesEnsured = true
}
