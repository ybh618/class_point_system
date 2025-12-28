/**
 * 小组查询模块
 * 提供小组相关的数据库查询和统计计算函数
 */

import type { D1Database } from '@cloudflare/workers-types'
import { queryAll } from './db'
import { makeDateHelper } from './time'
import type { StudentView } from './student_queries'

/**
 * 小组数据库行类型
 */
export type GroupRow = {
  id: number
  name: string
  description: string | null
  class_name: string
  color: string
  created_at: string
}

/**
 * 小组统计数据类型
 */
export type GroupStats = {
  total_points: number
  week_points: number
  average_points: number
  week_average_points: number
  range_points?: number
  range_average?: number
}

/**
 * 小组视图类型（包含统计信息和成员列表）
 */
export type GroupView = Omit<GroupRow, 'created_at'> &
  GroupStats & {
    created_at: ReturnType<typeof makeDateHelper>
    students: StudentView[]
  }

/**
 * 获取所有小组
 * @param db D1 数据库实例
 * @returns 按班级和名称排序的小组列表
 */
export async function fetchGroups(db: D1Database): Promise<GroupRow[]> {
  return queryAll<GroupRow>(db, 'SELECT * FROM groups ORDER BY class_name, name')
}

/**
 * 计算小组统计数据
 * @param members 小组成员列表
 * @param rangeMap 可选的日期范围积分映射（用于自定义时间范围统计）
 * @returns 小组统计数据
 */
export function calculateGroupStats(
  members: StudentView[],
  rangeMap?: Map<number, number>
): GroupStats {
  if (members.length === 0) {
    return {
      total_points: 0,
      week_points: 0,
      average_points: 0,
      week_average_points: 0,
      range_points: 0,
      range_average: 0,
    }
  }

  const totalPoints = members.reduce((sum, s) => sum + s.total_points, 0)
  const weekPoints = members.reduce((sum, s) => sum + s.week_points, 0)
  const rangeTotal = rangeMap
    ? members.reduce((sum, s) => sum + (rangeMap.get(s.id) ?? 0), 0)
    : 0

  return {
    total_points: totalPoints,
    week_points: weekPoints,
    average_points: totalPoints / members.length,
    week_average_points: weekPoints / members.length,
    range_points: rangeTotal,
    range_average: rangeTotal / members.length,
  }
}

/**
 * 构建带统计信息的小组视图
 * @param group 小组基础数据
 * @param students 所有学生列表（将自动筛选该小组成员）
 * @param rangeMap 可选的日期范围积分映射
 * @returns 包含统计信息和成员列表的小组视图
 */
export function buildGroupView(
  group: GroupRow,
  students: StudentView[],
  rangeMap?: Map<number, number>
): GroupView {
  const members = students.filter((s) => s.group_id === group.id)
  const stats = calculateGroupStats(members, rangeMap)

  return {
    ...group,
    ...stats,
    created_at: makeDateHelper(group.created_at),
    students: members,
  }
}
