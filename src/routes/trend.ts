import type { D1Database } from '@cloudflare/workers-types'
import type { Hono } from 'hono'
import dayjs from 'dayjs'
import type { Env } from '../lib/env'
import { queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'

export function registerTrendRoutes(app: Hono<Env>) {
  app.get('/student/:id/trend', async (c) => {
    const id = Number(c.req.param('id'))
    const db = c.env.DB

    const student = await queryOne<{
      id: number
      student_id: string
      name: string
      class_name: string
      group_id: number | null
      created_at: string
    }>(db, 'SELECT * FROM students WHERE id = ?', [id])

    if (!student) {
      return c.text('学生不存在', 404)
    }

    const totalPoints = await queryOne<{ total: number }>(
      db,
      'SELECT COALESCE(SUM(points), 0) as total FROM points_records WHERE student_id = ?',
      [id]
    )

    const recordsCount = await queryOne<{ count: number }>(
      db,
      'SELECT COUNT(*) as count FROM points_records WHERE student_id = ?',
      [id]
    )

    const avgPoints = recordsCount?.count
      ? (totalPoints?.total ?? 0) / recordsCount.count
      : 0

    const classRank = await getClassRank(db, student.class_name, totalPoints?.total ?? 0)

    // 获取班级所有有积分记录的日期
    const allDatesResult = await queryAll<{ date: string }>(
      db,
      `SELECT DISTINCT DATE(pr.created_at) as date
       FROM points_records pr
       JOIN students s ON s.id = pr.student_id
       WHERE s.class_name = ?
       ORDER BY date ASC`,
      [student.class_name]
    )
    const allDates = allDatesResult.map(r => r.date)

    const trendData = await getTrendData(db, id, allDates)
    const classAvgData = await getClassAvgTrendData(db, student.class_name, allDates)
    const classQuartiles = await getClassQuartilesTrendData(db, student.class_name, allDates)

    const classStats = await getClassStats(db, student.class_name)
    const percentile = calculatePercentile(
      totalPoints?.total ?? 0,
      classStats.avg,
      classStats.max
    )

    const categoryDistribution = await getCategoryDistribution(db, id)

    const recentRecords = await queryAll<{
      id: number
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
    }>(
      db,
      'SELECT * FROM points_records WHERE student_id = ? ORDER BY created_at DESC LIMIT 10',
      [id]
    )

    return c.html(
      renderTemplate({
        template: 'student_trend.html',
        flash: readFlash(c),
        context: {
          student: {
            ...student,
            created_at: makeDateHelper(student.created_at),
            total_points: totalPoints?.total ?? 0
          },
          stats: {
            rank: classRank,
            records_count: recordsCount?.count ?? 0,
            avg_points: avgPoints,
            percentile
          },
          class_stats: classStats,
          trend_data: trendData,
          class_avg_data: classAvgData,
          class_q1_data: classQuartiles.q1,
          class_q3_data: classQuartiles.q3,
          class_median_data: classQuartiles.median,
          category_distribution: categoryDistribution,
          recent_records: recentRecords.map((r) => ({
            ...r,
            created_at: makeDateHelper(r.created_at)
          }))
        }
      })
    )
  })
}

async function getClassRank(
  db: D1Database,
  className: string,
  studentTotal: number
): Promise<number> {
  const result = await queryOne<{ rank: number }>(
    db,
    `SELECT COUNT(*) + 1 as rank
     FROM (
       SELECT s.id, COALESCE(SUM(pr.points), 0) as total
       FROM students s
       LEFT JOIN points_records pr ON pr.student_id = s.id
       WHERE s.class_name = ?
       GROUP BY s.id
       HAVING total > ?
     )`,
    [className, studentTotal]
  )
  return result?.rank ?? 1
}

async function getTrendData(
  db: D1Database,
  studentId: number,
  allDates: string[]
): Promise<Array<{ date: string; cumulative: number }>> {
  const records = await queryAll<{ date: string; points: number }>(
    db,
    `SELECT DATE(created_at) as date, points
     FROM points_records
     WHERE student_id = ?
     ORDER BY created_at ASC`,
    [studentId]
  )

  const dailyMap = new Map<string, number>()
  for (const record of records) {
    const current = dailyMap.get(record.date) ?? 0
    dailyMap.set(record.date, current + record.points)
  }

  const result: Array<{ date: string; cumulative: number }> = []
  let cumulative = 0

  for (const date of allDates) {
    const dailyPoints = dailyMap.get(date) ?? 0
    cumulative += dailyPoints
    result.push({
      date: dayjs(date).format('MM-DD'),
      cumulative
    })
  }

  return result
}

async function getClassAvgTrendData(
  db: D1Database,
  className: string,
  allDates: string[]
): Promise<Array<{ date: string; avg: number }>> {
  const result: Array<{ date: string; avg: number }> = []

  for (const date of allDates) {
    const totals = await queryAll<{ total: number }>(
      db,
      `SELECT COALESCE(SUM(pr.points), 0) as total
       FROM students s
       LEFT JOIN points_records pr ON pr.student_id = s.id AND DATE(pr.created_at) <= ?
       WHERE s.class_name = ?
       GROUP BY s.id`,
      [date, className]
    )

    const avg = totals.length > 0 
      ? totals.reduce((sum, t) => sum + t.total, 0) / totals.length 
      : 0

    result.push({
      date: dayjs(date).format('MM-DD'),
      avg
    })
  }

  return result
}

async function getClassQuartilesTrendData(
  db: D1Database,
  className: string,
  allDates: string[]
): Promise<{
  q1: Array<{ date: string; q1: number }>
  q3: Array<{ date: string; q3: number }>
  median: Array<{ date: string; median: number }>
}> {
  const q1Data: Array<{ date: string; q1: number }> = []
  const q3Data: Array<{ date: string; q3: number }> = []
  const medianData: Array<{ date: string; median: number }> = []

  for (const date of allDates) {
    const totals = await queryAll<{ total: number }>(
      db,
      `SELECT COALESCE(SUM(pr.points), 0) as total
       FROM students s
       LEFT JOIN points_records pr ON pr.student_id = s.id AND DATE(pr.created_at) <= ?
       WHERE s.class_name = ?
       GROUP BY s.id
       ORDER BY total ASC`,
      [date, className]
    )

    if (totals.length > 0) {
      const values = totals.map((t) => t.total).sort((a, b) => a - b)
      const q1Index = Math.floor(values.length * 0.25)
      const q3Index = Math.floor(values.length * 0.75)
      const medianIndex = Math.floor(values.length * 0.5)

      q1Data.push({ date: dayjs(date).format('MM-DD'), q1: values[q1Index] })
      q3Data.push({ date: dayjs(date).format('MM-DD'), q3: values[q3Index] })
      medianData.push({
        date: dayjs(date).format('MM-DD'),
        median: values[medianIndex]
      })
    }
  }

  return { q1: q1Data, q3: q3Data, median: medianData }
}

async function getClassStats(
  db: D1Database,
  className: string
): Promise<{ avg: number; median: number; max: number; min: number }> {
  const totals = await queryAll<{ total: number }>(
    db,
    `SELECT COALESCE(SUM(pr.points), 0) as total
     FROM students s
     LEFT JOIN points_records pr ON pr.student_id = s.id
     WHERE s.class_name = ?
     GROUP BY s.id`,
    [className]
  )

  if (totals.length === 0) {
    return { avg: 0, median: 0, max: 0, min: 0 }
  }

  const values = totals.map((t) => t.total).sort((a, b) => a - b)
  const sum = values.reduce((acc, val) => acc + val, 0)
  const avg = sum / values.length
  const median = values[Math.floor(values.length / 2)]
  const max = values[values.length - 1]
  const min = values[0]

  return { avg, median, max, min }
}

function calculatePercentile(
  studentTotal: number,
  classAvg: number,
  classMax: number
): number {
  if (classMax === 0) return 50
  const range = classMax - 0
  const position = studentTotal - 0
  return Math.min(100, Math.max(0, (position / range) * 100))
}

async function getCategoryDistribution(
  db: D1Database,
  studentId: number
): Promise<Array<{ category: string; total: number }>> {
  return await queryAll<{ category: string; total: number }>(
    db,
    `SELECT category, SUM(points) as total
     FROM points_records
     WHERE student_id = ?
     GROUP BY category
     ORDER BY total DESC`,
    [studentId]
  )
}
