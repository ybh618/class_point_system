import type { D1Database } from '@cloudflare/workers-types'
import type { Pagination } from './types'

export const PAGE_SIZE = 20

export async function queryAll<T>(db: D1Database, sql: string, params: unknown[] = []): Promise<T[]> {
  const stmt = db.prepare(sql)
  const result = await stmt.bind(...params).all<T>()
  return result.results ?? []
}

export async function queryOne<T>(db: D1Database, sql: string, params: unknown[] = []): Promise<T | null> {
  const rows = await queryAll<T>(db, sql, params)
  return rows[0] ?? null
}

export async function execute(db: D1Database, sql: string, params: unknown[] = []): Promise<void> {
  await db.prepare(sql).bind(...params).run()
}

let schemaEnsured = false

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
    color TEXT NOT NULL DEFAULT '#007bff',
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

export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaEnsured) {
    return
  }
  for (const statement of SCHEMA_STATEMENTS) {
    await db.prepare(statement).run()
  }
  schemaEnsured = true
}

export type PaginateOptions = {
  page?: number
  perPage?: number
}

export async function paginate<T>(db: D1Database, baseSql: string, countSql: string, params: unknown[] = [], options: PaginateOptions = {}): Promise<Pagination<T>> {
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
    pages: Math.max(1, Math.ceil(total / perPage))
  }
}

export async function ensureDefaultCategories(db: D1Database): Promise<void> {
  await ensureSchema(db)
  const existing = await queryOne<{ count: number }>(db, 'SELECT COUNT(*) as count FROM points_categories', [])
  if ((existing?.count ?? 0) > 0) {
    return
  }

  const defaults = [
    { name: '作业', description: '作业完成情况', default_points: 5 },
    { name: '考试', description: '考试成绩', default_points: 10 },
    { name: '纪律', description: '课堂纪律', default_points: 3 },
    { name: '表现', description: '课堂表现', default_points: 2 },
    { name: '其他', description: '其他情况', default_points: 1 }
  ]

  for (const item of defaults) {
    await execute(
      db,
      'INSERT INTO points_categories (name, description, default_points, is_active) VALUES (?, ?, ?, 1)',
      [item.name, item.description, item.default_points]
    )
  }
}
