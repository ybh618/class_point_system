/**
 * 趋势查询模块
 * 提供学生积分趋势和班级统计相关的数据库查询函数
 */

import type { D1Database } from '@cloudflare/workers-types'
import dayjs from 'dayjs'
import { queryAll, queryOne } from './db'

/**
 * 趋势数据点类型
 */
export type TrendPoint = {
  date: string
  cumulative: number
}

/**
 * 班级趋势数据类型
 */
export type ClassTrendData = {
  date: string
  avg: number
  q1: number
  median: number
  q3: number
}

/**
 * 班级统计数据类型
 */
export type ClassStats = {
  avg: number
  median: number
  max: number
  min: number
}

/**
 * 获取班级所有有积分记录的日期
 * @param db D1 数据库实例
 * @param className 班级名称
 * @returns 按日期升序排列的日期字符串数组
 */
export async function fetchClassDates(
  db: D1Database,
  className: string
): Promise<string[]> {
  const rows = await queryAll<{ date: string }>(
    db,
    `SELECT DISTINCT DATE(pr.created_at) as date
     FROM points_records pr
     JOIN students s ON s.id = pr.student_id
     WHERE s.class_name = ?
     ORDER BY date ASC`,
    [className]
  )
  return rows.map((r) => r.date)
}


/**
 * 获取学生的趋势数据
 * @param db D1 数据库实例
 * @param studentId 学生 ID
 * @param allDates 所有日期列表
 * @returns 学生的累积积分趋势数据
 */
export async function fetchStudentTrend(
  db: D1Database,
  studentId: number,
  allDates: string[]
): Promise<TrendPoint[]> {
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
    dailyMap.set(record.date, (dailyMap.get(record.date) ?? 0) + record.points)
  }

  const result: TrendPoint[] = []
  let cumulative = 0
  for (const date of allDates) {
    cumulative += dailyMap.get(date) ?? 0
    result.push({ date: dayjs(date).format('MM-DD'), cumulative })
  }
  return result
}

/**
 * 批量获取班级趋势数据（优化：单次查询替代循环）
 * @param db D1 数据库实例
 * @param className 班级名称
 * @param allDates 所有日期列表
 * @returns 班级趋势统计数据（平均值、四分位数）
 */
export async function fetchClassTrendBatch(
  db: D1Database,
  className: string,
  allDates: string[]
): Promise<ClassTrendData[]> {
  if (allDates.length === 0) return []

  // 获取所有学生在所有日期的累积积分
  const studentTotals = await queryAll<{
    student_id: number
    date: string
    cumulative: number
  }>(
    db,
    `WITH student_daily AS (
      SELECT 
        s.id as student_id,
        DATE(pr.created_at) as date,
        SUM(pr.points) as daily_points
      FROM students s
      LEFT JOIN points_records pr ON pr.student_id = s.id
      WHERE s.class_name = ?
      GROUP BY s.id, DATE(pr.created_at)
    ),
    date_series AS (
      SELECT DISTINCT DATE(pr.created_at) as date
      FROM points_records pr
      JOIN students s ON s.id = pr.student_id
      WHERE s.class_name = ?
      ORDER BY date
    )
    SELECT 
      sd.student_id,
      ds.date,
      COALESCE(SUM(sd2.daily_points), 0) as cumulative
    FROM (SELECT DISTINCT student_id FROM student_daily) sd
    CROSS JOIN date_series ds
    LEFT JOIN student_daily sd2 ON sd2.student_id = sd.student_id AND sd2.date <= ds.date
    GROUP BY sd.student_id, ds.date
    ORDER BY ds.date, sd.student_id`,
    [className, className]
  )

  // 按日期分组计算统计数据
  const dateMap = new Map<string, number[]>()
  for (const row of studentTotals) {
    if (!dateMap.has(row.date)) {
      dateMap.set(row.date, [])
    }
    dateMap.get(row.date)!.push(row.cumulative)
  }

  return allDates.map((date) => {
    const values = (dateMap.get(date) ?? []).sort((a, b) => a - b)
    if (values.length === 0) {
      return { date: dayjs(date).format('MM-DD'), avg: 0, q1: 0, median: 0, q3: 0 }
    }

    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const q1 = values[Math.floor(values.length * 0.25)]
    const median = values[Math.floor(values.length * 0.5)]
    const q3 = values[Math.floor(values.length * 0.75)]

    return { date: dayjs(date).format('MM-DD'), avg, q1, median, q3 }
  })
}

/**
 * 获取班级统计数据
 * @param db D1 数据库实例
 * @param className 班级名称
 * @returns 班级统计数据（平均值、中位数、最大值、最小值）
 */
export async function fetchClassStats(
  db: D1Database,
  className: string
): Promise<ClassStats> {
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
  return {
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    median: values[Math.floor(values.length / 2)],
    max: values[values.length - 1],
    min: values[0],
  }
}

/**
 * 获取学生在班级中的排名
 * @param db D1 数据库实例
 * @param className 班级名称
 * @param studentTotal 学生总积分
 * @returns 学生排名（从 1 开始）
 */
export async function fetchClassRank(
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

/**
 * 获取学生的类别分布
 * @param db D1 数据库实例
 * @param studentId 学生 ID
 * @returns 按类别分组的积分统计
 */
export async function fetchCategoryDistribution(
  db: D1Database,
  studentId: number
): Promise<Array<{ category: string; total: number }>> {
  return queryAll<{ category: string; total: number }>(
    db,
    `SELECT category, SUM(points) as total
     FROM points_records
     WHERE student_id = ?
     GROUP BY category
     ORDER BY total DESC`,
    [studentId]
  )
}

/**
 * 计算学生在班级中的百分位
 * @param studentTotal 学生总积分
 * @param classAvg 班级平均分
 * @param classMax 班级最高分
 * @returns 百分位（0-100）
 */
export function calculatePercentile(
  studentTotal: number,
  classAvg: number,
  classMax: number
): number {
  if (classMax === 0) return 50
  const range = classMax - 0
  const position = studentTotal - 0
  return Math.min(100, Math.max(0, (position / range) * 100))
}
