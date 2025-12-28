/**
 * 排名路由模块
 * 提供学生和小组的排名功能
 */

import type { D1Database } from '@cloudflare/workers-types'
import type { Hono } from 'hono'
import dayjs from 'dayjs'
import type { Env } from '../lib/env'
import { queryAll } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'
import { toStartOfDayIso, toEndOfDayIso } from '../lib/time'
import { fetchStudentsWithStats, type StudentView } from '../lib/student_queries'
import {
  fetchGroups,
  calculateGroupStats,
  buildGroupView,
  type GroupRow,
} from '../lib/group_queries'
import { createErrorResponse } from '../lib/errors'

/**
 * 注册排名相关路由
 */
export function registerRankingRoutes(app: Hono<Env>) {
  app.get('/rankings', async (c) => {
    const startDateStr = c.req.query('start_date') ?? ''
    const endDateStr = c.req.query('end_date') ?? ''
    // 进步榜参数
    const progressAStartStr = c.req.query('progress_a_start') ?? ''
    const progressAEndStr = c.req.query('progress_a_end') ?? ''
    const progressBStartStr = c.req.query('progress_b_start') ?? ''
    const progressBEndStr = c.req.query('progress_b_end') ?? ''

    const { rangeStart, rangeEnd } = parseDateRange(startDateStr, endDateStr)
    const progressRange = parseProgressRange(
      progressAStartStr,
      progressAEndStr,
      progressBStartStr,
      progressBEndStr
    )

    const students = await fetchStudentsWithStats(c.env.DB, { orderBy: 'total_points DESC' })
    const rangeMap = await fetchRangePoints(c.env.DB, rangeStart, rangeEnd)

    // 计算进步榜数据
    const progressRanking = await calculateProgressRanking(
      c.env.DB,
      students,
      progressRange
    )

    const studentRanking = buildStudentRanking(students, rangeMap)
    const groups = await fetchGroups(c.env.DB)
    const groupRanking = buildGroupRanking(groups, students, rangeMap)

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
          progress_b_end: progressBEndStr,
        },
      })
    )
  })

  /**
   * 进步榜 API 端点
   */
  app.get('/api/progress-ranking', async (c) => {
    const progressAStartStr = c.req.query('progress_a_start') ?? ''
    const progressAEndStr = c.req.query('progress_a_end') ?? ''
    const progressBStartStr = c.req.query('progress_b_start') ?? ''
    const progressBEndStr = c.req.query('progress_b_end') ?? ''

    const progressRange = parseProgressRange(
      progressAStartStr,
      progressAEndStr,
      progressBStartStr,
      progressBEndStr
    )

    if (!progressRange.aStart || !progressRange.aEnd || !progressRange.bStart || !progressRange.bEnd) {
      return c.json(createErrorResponse('请提供有效的日期范围'), 400)
    }

    const students = await fetchStudentsWithStats(c.env.DB, { orderBy: 'total_points DESC' })
    const progressRanking = await calculateProgressRanking(
      c.env.DB,
      students,
      progressRange
    )

    // 计算统计摘要
    const improvedCount = progressRanking.filter((item) => item.rank_change > 0).length
    const declinedCount = progressRanking.filter((item) => item.rank_change < 0).length
    const unchangedCount = progressRanking.filter((item) => item.rank_change === 0).length
    const maxImprovement = progressRanking.length > 0 ? progressRanking[0].rank_change : 0

    return c.json({
      progress_ranking: progressRanking,
      progress_a_start: progressAStartStr,
      progress_a_end: progressAEndStr,
      progress_b_start: progressBStartStr,
      progress_b_end: progressBEndStr,
      stats: {
        improved_count: improvedCount,
        declined_count: declinedCount,
        unchanged_count: unchangedCount,
        max_improvement: maxImprovement,
      },
    })
  })
}


/**
 * 解析日期范围参数
 */
function parseDateRange(
  startDateStr: string,
  endDateStr: string
): { rangeStart: string | null; rangeEnd: string | null } {
  if (!startDateStr || !endDateStr) {
    return { rangeStart: null, rangeEnd: null }
  }

  const start = dayjs(startDateStr, 'YYYY-MM-DD', true)
  const end = dayjs(endDateStr, 'YYYY-MM-DD', true)

  if (start.isValid() && end.isValid() && !start.isAfter(end)) {
    return {
      rangeStart: toStartOfDayIso(start.toDate()),
      rangeEnd: toEndOfDayIso(end.toDate()),
    }
  }

  return { rangeStart: null, rangeEnd: null }
}

type ProgressRange = {
  aStart: string | null
  aEnd: string | null
  bStart: string | null
  bEnd: string | null
}

/**
 * 解析进步榜时间区间参数
 */
function parseProgressRange(
  aStartStr: string,
  aEndStr: string,
  bStartStr: string,
  bEndStr: string
): ProgressRange {
  if (!aStartStr || !aEndStr || !bStartStr || !bEndStr) {
    return { aStart: null, aEnd: null, bStart: null, bEnd: null }
  }

  const aStart = dayjs(aStartStr, 'YYYY-MM-DD', true)
  const aEnd = dayjs(aEndStr, 'YYYY-MM-DD', true)
  const bStart = dayjs(bStartStr, 'YYYY-MM-DD', true)
  const bEnd = dayjs(bEndStr, 'YYYY-MM-DD', true)

  if (
    aStart.isValid() &&
    aEnd.isValid() &&
    bStart.isValid() &&
    bEnd.isValid() &&
    !aStart.isAfter(aEnd) &&
    !bStart.isAfter(bEnd)
  ) {
    return {
      aStart: toStartOfDayIso(aStart.toDate()),
      aEnd: toEndOfDayIso(aEnd.toDate()),
      bStart: toStartOfDayIso(bStart.toDate()),
      bEnd: toEndOfDayIso(bEnd.toDate()),
    }
  }

  return { aStart: null, aEnd: null, bStart: null, bEnd: null }
}

/**
 * 获取指定时间范围内的积分
 */
async function fetchRangePoints(
  db: D1Database,
  start: string | null,
  end: string | null
): Promise<Map<number, number>> {
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

/**
 * 构建学生排名列表
 */
function buildStudentRanking(
  students: StudentView[],
  rangeMap: Map<number, number>
) {
  return students
    .map((student) => ({
      student,
      total_points: student.total_points,
      week_points: student.week_points,
      range_points: rangeMap.get(student.id) ?? 0,
    }))
    .sort((a, b) => b.total_points - a.total_points)
}

/**
 * 构建小组排名列表（使用 group_queries 模块）
 */
function buildGroupRanking(
  groups: GroupRow[],
  students: StudentView[],
  rangeMap: Map<number, number>
) {
  return groups
    .map((group) => {
      const members = students.filter((s) => s.group_id === group.id)
      if (members.length === 0) {
        return null
      }

      const groupView = buildGroupView(group, students, rangeMap)
      const stats = calculateGroupStats(members, rangeMap)

      return {
        group: groupView,
        average_points: stats.average_points,
        week_average_points: stats.week_average_points,
        avg_range_points: stats.range_average ?? 0,
        total_range_points: stats.range_points ?? 0,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => b.average_points - a.average_points)
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
  rank_change: number
  points_a: number
  points_b: number
}

/**
 * 计算进步榜排名
 */
async function calculateProgressRanking(
  db: D1Database,
  students: StudentView[],
  range: ProgressRange
): Promise<ProgressItem[]> {
  const { aStart, aEnd, bStart, bEnd } = range
  if (!aStart || !aEnd || !bStart || !bEnd) {
    return []
  }

  const aMap = await fetchRangePoints(db, aStart, aEnd)
  const bMap = await fetchRangePoints(db, bStart, bEnd)

  // 计算 A 区间排名
  const aRankMap = buildRankMap(students, aMap)
  // 计算 B 区间排名
  const bRankMap = buildRankMap(students, bMap)

  // 计算进步榜
  const progressList: ProgressItem[] = students.map((student) => {
    const rankA = aRankMap.get(student.id) ?? students.length
    const rankB = bRankMap.get(student.id) ?? students.length
    const rankChange = rankA - rankB // 正数表示进步

    return {
      student: {
        id: student.id,
        name: student.name,
        student_id: student.student_id,
        class_name: student.class_name,
        group: student.group,
      },
      rank_a: rankA,
      rank_b: rankB,
      rank_change: rankChange,
      points_a: aMap.get(student.id) ?? 0,
      points_b: bMap.get(student.id) ?? 0,
    }
  })

  return progressList.sort((a, b) => b.rank_change - a.rank_change)
}

/**
 * 根据积分映射构建排名映射
 */
function buildRankMap(
  students: StudentView[],
  pointsMap: Map<number, number>
): Map<number, number> {
  const ranking = students
    .map((s) => ({ id: s.id, points: pointsMap.get(s.id) ?? 0 }))
    .sort((a, b) => b.points - a.points)

  const rankMap = new Map<number, number>()
  ranking.forEach((item, index) => {
    rankMap.set(item.id, index + 1)
  })

  return rankMap
}
