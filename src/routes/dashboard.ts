import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'

export function registerDashboardRoutes(app: Hono<Env>) {
  app.get('/', async (c) => {
    const db = c.env.DB
    const totalStudents = await queryOne<{ total: number }>(db, 'SELECT COUNT(*) as total FROM students')
    const totalRecords = await queryOne<{ total: number }>(db, 'SELECT COUNT(*) as total FROM points_records')
    const todayRecords = await queryOne<{ total: number }>(
      db,
      "SELECT COUNT(*) as total FROM points_records WHERE date(created_at) = date('now')"
    )

    const recent = await queryAll<{
      id: number
      student_id: number
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
      student_name: string
    }>(
      db,
      `SELECT pr.*, s.name as student_name
       FROM points_records pr
       JOIN students s ON s.id = pr.student_id
       ORDER BY pr.created_at DESC
       LIMIT 10`
    )

    const recentRecords = recent.map((record) => ({
      ...record,
      student: { id: record.student_id, name: record.student_name },
      created_at: makeDateHelper(record.created_at)
    }))

    return c.html(
      renderTemplate({
        template: 'index.html',
        flash: readFlash(c),
        context: {
          total_students: totalStudents?.total ?? 0,
          total_records: totalRecords?.total ?? 0,
          today_records: todayRecords?.total ?? 0,
          recent_records: recentRecords
        }
      })
    )
  })
}
