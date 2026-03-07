/**
 * 安卓应用专用 API 路由
 */

import { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryAll, execute } from '../lib/db'
import { fetchStudentsWithStats } from '../lib/student_queries'
import { fetchGroups, buildGroupViewFromMembers } from '../lib/group_queries'
import { invalidateStudentsCache } from '../lib/cache'
import { applyCacheHeadersToResponse, PAGE_CACHE_OPTIONS } from '../lib/http-cache'

export function registerApiRoutes(app: Hono<Env>) {
    const api = new Hono<Env>()

    /**
     * 获取学生列表
     */
    api.get('/students', async (c) => {
        const students = await fetchStudentsWithStats(c.env.DB, { orderBy: 's.name ASC' })
        return applyCacheHeadersToResponse(c.json({
            success: true,
            data: students
        }), PAGE_CACHE_OPTIONS.rankings)
    })

    /**
     * 获取小组列表
     */
    api.get('/groups', async (c) => {
        const students = await fetchStudentsWithStats(c.env.DB)
        const groups = await fetchGroups(c.env.DB)
        const studentsByGroupId = new Map<number, typeof students>()
        for (const student of students) {
            if (!student.group_id) {
                continue
            }
            const existing = studentsByGroupId.get(student.group_id)
            if (existing) {
                existing.push(student)
            } else {
                studentsByGroupId.set(student.group_id, [student])
            }
        }
        const groupsWithStudents = groups.map((group) => {
            const groupStudents = studentsByGroupId.get(group.id) ?? []
            return buildGroupViewFromMembers(group, groupStudents)
        })
        return applyCacheHeadersToResponse(c.json({
            success: true,
            data: groupsWithStudents
        }), PAGE_CACHE_OPTIONS.rankings)
    })

    /**
     * 获取积分分类
     */
    api.get('/categories', async (c) => {
        const categories = await queryAll<{ name: string; default_points: number }>(
            c.env.DB,
            'SELECT name, default_points FROM points_categories WHERE is_active = 1 ORDER BY name'
        )
        return applyCacheHeadersToResponse(c.json({
            success: true,
            data: categories
        }), PAGE_CACHE_OPTIONS.dashboard)
    })

    /**
     * 提交积分记录
     */
    api.post('/points/add', async (c) => {
        const body = await c.req.json()
        const { student_id, points, category, reason, operator } = body

        if (!student_id || points === undefined || !category) {
            return c.json({ success: false, message: '参数不完整' }, 400)
        }

        const finalReason = reason || `${category}积分记录`

        try {
            await execute(
                c.env.DB,
                'INSERT INTO points_records (student_id, points, reason, category, operator) VALUES (?, ?, ?, ?, ?)',
                [student_id, points, finalReason, category, operator || 'Android App']
            )

            invalidateStudentsCache()

            return c.json({
                success: true,
                message: '积分记录添加成功'
            })
        } catch (error) {
            return c.json({ success: false, message: '数据库错误' }, 500)
        }
    })

    // 挂载到 /api/v1
    app.route('/api/v1', api)
}
