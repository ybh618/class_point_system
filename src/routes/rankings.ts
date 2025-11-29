import type { D1Database } from '@cloudflare/workers-types'
import type { Hono } from 'hono'
import dayjs from 'dayjs'
import type { Env } from '../lib/env'
import { queryAll } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'
import { makeDateHelper, toStartOfDayIso, toEndOfDayIso } from '../lib/time'
import { fetchStudentsWithStats } from '../lib/student_queries'

export function registerRankingRoutes(app: Hono<Env>) {
  app.get('/rankings', async (c) => {
    const startDateStr = c.req.query('start_date') ?? ''
    const endDateStr = c.req.query('end_date') ?? ''
    let rangeStart: string | null = null
    let rangeEnd: string | null = null

    if (startDateStr && endDateStr) {
      const start = dayjs(startDateStr, 'YYYY-MM-DD', true)
      const end = dayjs(endDateStr, 'YYYY-MM-DD', true)
      if (start.isValid() && end.isValid() && !start.isAfter(end)) {
        rangeStart = toStartOfDayIso(start.toDate())
        rangeEnd = toEndOfDayIso(end.toDate())
      }
    }

    const students = await fetchStudentsWithStats(c.env.DB, { orderBy: 'total_points DESC' })
    const rangeMap = await fetchRangePoints(c.env.DB, rangeStart, rangeEnd)

    const studentRanking = students
      .map((student) => ({
        student,
        total_points: student.total_points,
        week_points: student.week_points,
        range_points: rangeMap.get(student.id) ?? 0
      }))
      .sort((a, b) => b.total_points - a.total_points)

    const groups = await queryAll<{
      id: number
      name: string
      class_name: string
      description: string | null
      color: string
      created_at: string
    }>(c.env.DB, 'SELECT * FROM groups ORDER BY class_name, name')

    const groupRanking = groups
      .map((group) => {
        const members = students.filter((student) => student.group_id === group.id)
        if (members.length === 0) {
          return null
        }
        const totalPoints = members.reduce((sum, student) => sum + student.total_points, 0)
        const averagePoints = members.length ? totalPoints / members.length : 0
        const weekPoints = members.reduce((sum, student) => sum + student.week_points, 0)
        const weekAverage = members.length ? weekPoints / members.length : 0
        const rangeTotal = members.reduce((sum, student) => sum + (rangeMap.get(student.id) ?? 0), 0)
        const rangeAvg = members.length ? rangeTotal / members.length : 0
        return {
          group: {
            ...group,
            created_at: makeDateHelper(group.created_at),
            students: members,
            total_points: totalPoints,
            week_points: weekPoints
          },
          average_points: averagePoints,
          week_average_points: weekAverage,
          avg_range_points: rangeAvg,
          total_range_points: rangeTotal
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.average_points - a.average_points)

    return c.html(
      renderTemplate({
        template: 'rankings.html',
        flash: readFlash(c),
        context: {
          student_ranking: studentRanking,
          group_ranking: groupRanking,
          start_date: startDateStr,
          end_date: endDateStr
        }
      })
    )
  })
}

async function fetchRangePoints(db: D1Database, start: string | null, end: string | null) {
  if (!start || !end) {
    return new Map<number, number>()
  }
  const rows = await queryAll<{ student_id: number; total: number }>(
    db,
    'SELECT student_id, COALESCE(SUM(points), 0) as total FROM points_records WHERE created_at >= ? AND created_at <= ? GROUP BY student_id',
    [start, end]
  )
  return new Map(rows.map((row) => [row.student_id, row.total]))
}
