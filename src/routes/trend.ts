/**
 * 趋势路由模块
 * 提供学生积分趋势分析功能
 */

import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'
import {
  fetchClassDates,
  fetchStudentTrend,
  fetchClassTrendBatch,
  fetchClassStats,
  fetchClassRank,
  fetchCategoryDistribution,
  calculatePercentile,
} from '../lib/trend_queries'

/**
 * 注册趋势相关路由
 */
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

    const classRank = await fetchClassRank(db, student.class_name, totalPoints?.total ?? 0)
    const allDates = await fetchClassDates(db, student.class_name)
    const trendData = await fetchStudentTrend(db, id, allDates)
    const classTrendData = await fetchClassTrendBatch(db, student.class_name, allDates)

    const classAvgData = classTrendData.map((d) => ({ date: d.date, avg: d.avg }))
    const classQuartiles = {
      q1: classTrendData.map((d) => ({ date: d.date, q1: d.q1 })),
      q3: classTrendData.map((d) => ({ date: d.date, q3: d.q3 })),
      median: classTrendData.map((d) => ({ date: d.date, median: d.median })),
    }

    const classStats = await fetchClassStats(db, student.class_name)
    const percentile = calculatePercentile(
      totalPoints?.total ?? 0,
      classStats.avg,
      classStats.max
    )

    const categoryDistribution = await fetchCategoryDistribution(db, id)

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
            total_points: totalPoints?.total ?? 0,
          },
          stats: {
            rank: classRank,
            records_count: recordsCount?.count ?? 0,
            avg_points: avgPoints,
            percentile,
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
            created_at: makeDateHelper(r.created_at),
          })),
        },
      })
    )
  })
}
