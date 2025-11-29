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
    // 进步榜参数
    const progressAStartStr = c.req.query('progress_a_start') ?? ''
    const progressAEndStr = c.req.query('progress_a_end') ?? ''
    const progressBStartStr = c.req.query('progress_b_start') ?? ''
    const progressBEndStr = c.req.query('progress_b_end') ?? ''

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

    // 解析进步榜时间区间
    let progressARangeStart: string | null = null
    let progressARangeEnd: string | null = null
    let progressBRangeStart: string | null = null
    let progressBRangeEnd: string | null = null

    if (progressAStartStr && progressAEndStr && progressBStartStr && progressBEndStr) {
      const aStart = dayjs(progressAStartStr, 'YYYY-MM-DD', true)
      const aEnd = dayjs(progressAEndStr, 'YYYY-MM-DD', true)
      const bStart = dayjs(progressBStartStr, 'YYYY-MM-DD', true)
      const bEnd = dayjs(progressBEndStr, 'YYYY-MM-DD', true)
      if (aStart.isValid() && aEnd.isValid() && bStart.isValid() && bEnd.isValid() &&
          !aStart.isAfter(aEnd) && !bStart.isAfter(bEnd)) {
        progressARangeStart = toStartOfDayIso(aStart.toDate())
        progressARangeEnd = toEndOfDayIso(aEnd.toDate())
        progressBRangeStart = toStartOfDayIso(bStart.toDate())
        progressBRangeEnd = toEndOfDayIso(bEnd.toDate())
      }
    }

    const students = await fetchStudentsWithStats(c.env.DB, { orderBy: 'total_points DESC' })
    const rangeMap = await fetchRangePoints(c.env.DB, rangeStart, rangeEnd)

    // 计算进步榜数据
    const progressRanking = await calculateProgressRanking(
      c.env.DB,
      students,
      progressARangeStart,
      progressARangeEnd,
      progressBRangeStart,
      progressBRangeEnd
    )

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
          end_date: endDateStr,
          progress_ranking: progressRanking,
          progress_a_start: progressAStartStr,
          progress_a_end: progressAEndStr,
          progress_b_start: progressBStartStr,
          progress_b_end: progressBEndStr
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

type ProgressItem = {
  student: {
    id: number
    name: string
    student_id: string
    class_name: string
    group?: {
      id: number
      name: string
      color: string
    }
  }
  rank_a: number
  rank_b: number
  rank_change: number // 正数表示进步（排名上升）
  points_a: number
  points_b: number
}

async function calculateProgressRanking(
  db: D1Database,
  students: Awaited<ReturnType<typeof fetchStudentsWithStats>>,
  aStart: string | null,
  aEnd: string | null,
  bStart: string | null,
  bEnd: string | null
): Promise<ProgressItem[]> {
  if (!aStart || !aEnd || !bStart || !bEnd) {
    return []
  }

  // 获取A区间和B区间的积分
  const aMap = await fetchRangePoints(db, aStart, aEnd)
  const bMap = await fetchRangePoints(db, bStart, bEnd)

  // 计算A区间排名
  const aRanking = students
    .map((s) => ({ id: s.id, points: aMap.get(s.id) ?? 0 }))
    .sort((a, b) => b.points - a.points)
  const aRankMap = new Map<number, number>()
  aRanking.forEach((item, index) => {
    aRankMap.set(item.id, index + 1)
  })

  // 计算B区间排名
  const bRanking = students
    .map((s) => ({ id: s.id, points: bMap.get(s.id) ?? 0 }))
    .sort((a, b) => b.points - a.points)
  const bRankMap = new Map<number, number>()
  bRanking.forEach((item, index) => {
    bRankMap.set(item.id, index + 1)
  })

  // 计算进步榜
  const progressList: ProgressItem[] = students.map((student) => {
    const rankA = aRankMap.get(student.id) ?? students.length
    const rankB = bRankMap.get(student.id) ?? students.length
    const rankChange = rankA - rankB // A排名 - B排名，正数表示进步

    return {
      student: {
        id: student.id,
        name: student.name,
        student_id: student.student_id,
        class_name: student.class_name,
        group: student.group
      },
      rank_a: rankA,
      rank_b: rankB,
      rank_change: rankChange,
      points_a: aMap.get(student.id) ?? 0,
      points_b: bMap.get(student.id) ?? 0
    }
  })

  // 按进步幅度排序（进步最多的排前面）
  return progressList.sort((a, b) => b.rank_change - a.rank_change)
}
