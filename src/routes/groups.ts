/**
 * 小组路由模块
 * 提供小组的增删改查功能
 */

import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { execute, queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { fetchStudentsWithStats } from '../lib/student_queries'
import { DEFAULT_COLOR } from '../lib/constants'
import { notFound, respondWithError } from '../lib/errors'
import { fetchGroups, buildGroupView, calculateGroupStats } from '../lib/group_queries'

/**
 * 注册小组相关路由
 */
export function registerGroupRoutes(app: Hono<Env>) {
  /**
   * 小组列表页面
   */
  app.get('/groups', async (c) => {
    const db = c.env.DB
    const students = await fetchStudentsWithStats(db, { orderBy: 's.name ASC' })
    const groups = await fetchGroups(db)

    const enriched = groups.map((group) => buildGroupView(group, students))

    return c.html(
      renderTemplate({
        template: 'groups.html',
        flash: readFlash(c),
        context: { groups: enriched },
      })
    )
  })

  /**
   * 添加小组页面
   */
  app.get('/group/add', (c) => {
    return c.html(renderTemplate({ template: 'add_group.html', flash: readFlash(c) }))
  })

  /**
   * 添加小组处理
   */
  app.post('/group/add', async (c) => {
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const className = form.get('class_name')?.toString().trim()
    const color = form.get('color')?.toString() || DEFAULT_COLOR

    if (!name || !className) {
      return respondWithError(c, '请填写小组名称和班级', '/group/add')
    }

    await execute(
      c.env.DB,
      'INSERT INTO groups (name, description, class_name, color) VALUES (?, ?, ?, ?)',
      [name, description, className, color]
    )

    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组创建成功',
    })
  })


  /**
   * 编辑小组页面
   */
  app.get('/group/:id/edit', async (c) => {
    const id = Number(c.req.param('id'))
    const group = await queryOne<{
      id: number
      name: string
      description: string | null
      class_name: string
      color: string
      created_at: string
    }>(c.env.DB, 'SELECT * FROM groups WHERE id = ?', [id])

    if (!group) {
      return notFound(c, '小组')
    }

    const memberIds = await queryAll<{ id: number }>(
      c.env.DB,
      'SELECT id FROM students WHERE group_id = ?',
      [id]
    )
    const classStudentIds = await queryAll<{ id: number }>(
      c.env.DB,
      'SELECT id FROM students WHERE class_name = ?',
      [group.class_name]
    )

    const members = await fetchStudentsWithStats(c.env.DB, {
      ids: memberIds.map((item) => item.id),
    })
    const available = await fetchStudentsWithStats(c.env.DB, {
      ids: classStudentIds.map((item) => item.id),
    })

    const stats = calculateGroupStats(members)

    return c.html(
      renderTemplate({
        template: 'edit_group.html',
        flash: readFlash(c),
        context: {
          group: buildGroupView(group, members),
          available_students: available,
        },
      })
    )
  })

  /**
   * 编辑小组处理
   */
  app.post('/group/:id/edit', async (c) => {
    const id = Number(c.req.param('id'))
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const className = form.get('class_name')?.toString().trim()
    const color = form.get('color')?.toString() || DEFAULT_COLOR

    if (!name || !className) {
      return respondWithError(c, '请填写必要信息', `/group/${id}/edit`)
    }

    await execute(
      c.env.DB,
      'UPDATE groups SET name = ?, description = ?, class_name = ?, color = ? WHERE id = ?',
      [name, description, className, color, id]
    )

    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组更新成功',
    })
  })

  /**
   * 删除小组
   */
  app.post('/group/:id/delete', async (c) => {
    const id = Number(c.req.param('id'))
    await execute(c.env.DB, 'UPDATE students SET group_id = NULL WHERE group_id = ?', [id])
    await execute(c.env.DB, 'DELETE FROM groups WHERE id = ?', [id])
    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组删除成功',
    })
  })

  /**
   * 设置学生小组
   */
  app.post('/student/:id/set_group', async (c) => {
    const studentId = Number(c.req.param('id'))
    const form = await c.req.formData()
    const groupIdValue = form.get('group_id')?.toString()

    if (!groupIdValue) {
      await execute(c.env.DB, 'UPDATE students SET group_id = NULL WHERE id = ?', [studentId])
    } else {
      await execute(c.env.DB, 'UPDATE students SET group_id = ? WHERE id = ?', [
        Number(groupIdValue),
        studentId,
      ])
    }

    if (c.req.header('X-Requested-With') === 'XMLHttpRequest') {
      return c.json({ success: true })
    }

    return redirectWithFlash(c, '/students', { status: 'success', message: '小组设置成功' })
  })

  /**
   * 批量添加学生到小组
   */
  app.post('/group/:id/add_students', async (c) => {
    const groupId = Number(c.req.param('id'))
    const form = await c.req.formData()
    const ids = form.getAll('student_ids')

    if (!ids.length) {
      return respondWithError(c, '请选择学生', `/group/${groupId}/edit`)
    }

    const group = await queryOne<{ class_name: string }>(
      c.env.DB,
      'SELECT class_name FROM groups WHERE id = ?',
      [groupId]
    )

    if (!group) {
      return respondWithError(c, '小组不存在', '/groups')
    }

    let added = 0
    for (const studentId of ids) {
      const idValue = Number(studentId)
      const student = await queryOne<{ id: number }>(
        c.env.DB,
        'SELECT id FROM students WHERE id = ? AND class_name = ?',
        [idValue, group.class_name]
      )
      if (student) {
        await execute(c.env.DB, 'UPDATE students SET group_id = ? WHERE id = ?', [groupId, idValue])
        added += 1
      }
    }

    return redirectWithFlash(c, `/group/${groupId}/edit`, {
      status: 'success',
      message: `成功添加 ${added} 名学生`,
    })
  })
}
