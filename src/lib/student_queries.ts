import type { D1Database } from '@cloudflare/workers-types'
import { queryAll } from './db'
import { makeDateHelper, getWeekStartIso } from './time'

export type StudentRow = {
  id: number
  student_id: string
  name: string
  class_name: string
  group_id: number | null
  group_name?: string | null
  group_color?: string | null
  group_description?: string | null
  created_at: string
  total_points: number
  records_count: number
}

export type StudentView = {
  id: number
  student_id: string
  name: string
  class_name: string
  group_id: number | null
  group?: {
    id: number
    name: string
    color: string
    description: string | null
  }
  created_at: ReturnType<typeof makeDateHelper>
  total_points: number
  records_count: number
  week_points: number
}

type FetchOptions = {
  search?: string
  ids?: number[]
  orderBy?: string
  limit?: number
  offset?: number
}

export async function fetchStudentsWithStats(db: D1Database, options: FetchOptions = {}): Promise<StudentView[]> {
  const { search, ids } = options
  if (ids && ids.length === 0) {
    return []
  }
  const params: unknown[] = []
  const whereParts: string[] = []

  if (search) {
    const term = `%${search}%`
    whereParts.push('(s.name LIKE ? OR s.student_id LIKE ? OR s.class_name LIKE ? )')
    params.push(term, term, term)
  }

  if (ids && ids.length > 0) {
    const placeholders = ids.map(() => '?').join(',')
    whereParts.push(`s.id IN (${placeholders})`)
    params.push(...ids)
  }

  const where = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : ''
  const orderBy = options.orderBy ?? 's.created_at DESC'
  const limitClause = typeof options.limit === 'number' ? ' LIMIT ?' : ''
  const offsetClause =
    typeof options.limit === 'number' && typeof options.offset === 'number' ? ' OFFSET ?' : ''
  if (limitClause) {
    params.push(options.limit)
  }
  if (offsetClause) {
    params.push(options.offset)
  }

  const rows = await queryAll<StudentRow>(
    db,
    `SELECT s.*, g.name as group_name, g.color as group_color, g.description as group_description,
            COALESCE(SUM(pr.points), 0) as total_points,
            COUNT(pr.id) as records_count
       FROM students s
       LEFT JOIN groups g ON g.id = s.group_id
       LEFT JOIN points_records pr ON pr.student_id = s.id
       ${where}
       GROUP BY s.id
       ORDER BY ${orderBy}${limitClause}${offsetClause}`,
    params
  )

  if (rows.length === 0) {
    return []
  }

  const studentIds = rows.map((row) => row.id)
  const weekMap = await fetchWeekPoints(db, studentIds)

  return rows.map((row) => ({
    id: row.id,
    student_id: row.student_id,
    name: row.name,
    class_name: row.class_name,
    group_id: row.group_id,
    group: row.group_id
      ? {
          id: row.group_id,
          name: row.group_name ?? '',
          color: row.group_color ?? '#0d6efd',
          description: row.group_description ?? null
        }
      : undefined,
    created_at: makeDateHelper(row.created_at),
    total_points: row.total_points ?? 0,
    records_count: row.records_count ?? 0,
    week_points: weekMap.get(row.id) ?? 0
  }))
}

async function fetchWeekPoints(db: D1Database, studentIds: number[]): Promise<Map<number, number>> {
  if (!studentIds.length) {
    return new Map()
  }
  const placeholders = studentIds.map(() => '?').join(',')
  const weekStart = getWeekStartIso()
  const rows = await queryAll<{ student_id: number; total: number }>(
    db,
    `SELECT student_id, COALESCE(SUM(points), 0) as total
       FROM points_records
      WHERE student_id IN (${placeholders}) AND created_at >= ?
      GROUP BY student_id`,
    [...studentIds, weekStart]
  )
  return new Map(rows.map((row) => [row.student_id, row.total]))
}
