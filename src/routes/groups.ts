import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { execute, queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'
import { fetchStudentsWithStats } from '../lib/student_queries'

export function registerGroupRoutes(app: Hono<Env>) {
  app.get('/groups', async (c) => {
    const db = c.env.DB
    const students = await fetchStudentsWithStats(db, { orderBy: 's.name ASC' })
    const groups = await queryAll<{
      id: number
      name: string
      description: string | null
      class_name: string
      color: string
      created_at: string
    }>(db, 'SELECT * FROM groups ORDER BY class_name, name')

    const enriched = groups.map((group) => {
      const groupStudents = students.filter((student) => student.group_id === group.id)
      const totalPoints = groupStudents.reduce((sum, student) => sum + student.total_points, 0)
      const weekPoints = groupStudents.reduce((sum, student) => sum + student.week_points, 0)
      const average = groupStudents.length ? totalPoints / groupStudents.length : 0
      return {
        ...group,
        created_at: makeDateHelper(group.created_at),
        students: groupStudents,
        total_points: totalPoints,
        week_points: weekPoints,
        average_points: average
      }
    })

    return c.html(
      renderTemplate({
        template: 'groups.html',
        flash: readFlash(c),
        context: { groups: enriched }
      })
    )
  })

  app.get('/group/add', (c) => {
    return c.html(renderTemplate({ template: 'add_group.html', flash: readFlash(c) }))
  })

  app.post('/group/add', async (c) => {
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const className = form.get('class_name')?.toString().trim()
    const color = form.get('color')?.toString() || '#007bff'

    if (!name || !className) {
      return redirectWithFlash(c, '/group/add', {
        status: 'error',
        message: '请填写小组名称和班级'
      })
    }

    await execute(
      c.env.DB,
      'INSERT INTO groups (name, description, class_name, color) VALUES (?, ?, ?, ?)',
      [name, description, className, color]
    )

    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组创建成功'
    })
  })

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
      return c.text('小组不存在', 404)
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
      ids: memberIds.map((item) => item.id)
    })
    const available = await fetchStudentsWithStats(c.env.DB, {
      ids: classStudentIds.map((item) => item.id)
    })

    const totalPoints = members.reduce((sum, student) => sum + student.total_points, 0)
    const weekPoints = members.reduce((sum, student) => sum + student.week_points, 0)
    const avgPoints = members.length ? totalPoints / members.length : 0
    const weekAvg = members.length ? weekPoints / members.length : 0

    return c.html(
      renderTemplate({
        template: 'edit_group.html',
        flash: readFlash(c),
        context: {
          group: {
            ...group,
            created_at: makeDateHelper(group.created_at),
            students: members,
            total_points: totalPoints,
            week_points: weekPoints,
            average_points: avgPoints,
            week_average_points: weekAvg
          },
          available_students: available
        }
      })
    )
  })

  app.post('/group/:id/edit', async (c) => {
    const id = Number(c.req.param('id'))
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const className = form.get('class_name')?.toString().trim()
    const color = form.get('color')?.toString() || '#007bff'

    if (!name || !className) {
      return redirectWithFlash(c, `/group/${id}/edit`, {
        status: 'error',
        message: '请填写必要信息'
      })
    }

    await execute(
      c.env.DB,
      'UPDATE groups SET name = ?, description = ?, class_name = ?, color = ? WHERE id = ?',
      [name, description, className, color, id]
    )

    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组更新成功'
    })
  })

  app.post('/group/:id/delete', async (c) => {
    const id = Number(c.req.param('id'))
    await execute(c.env.DB, 'UPDATE students SET group_id = NULL WHERE group_id = ?', [id])
    await execute(c.env.DB, 'DELETE FROM groups WHERE id = ?', [id])
    return redirectWithFlash(c, '/groups', {
      status: 'success',
      message: '小组删除成功'
    })
  })

  app.post('/student/:id/set_group', async (c) => {
    const studentId = Number(c.req.param('id'))
    const form = await c.req.formData()
    const groupIdValue = form.get('group_id')?.toString()

    if (!groupIdValue) {
      await execute(c.env.DB, 'UPDATE students SET group_id = NULL WHERE id = ?', [studentId])
    } else {
      await execute(c.env.DB, 'UPDATE students SET group_id = ? WHERE id = ?', [Number(groupIdValue), studentId])
    }

    if (c.req.header('X-Requested-With') === 'XMLHttpRequest') {
      return c.json({ success: true })
    }

    return redirectWithFlash(c, '/students', { status: 'success', message: '小组设置成功' })
  })

  app.post('/group/:id/add_students', async (c) => {
    const groupId = Number(c.req.param('id'))
    const form = await c.req.formData()
    const ids = form.getAll('student_ids')

    if (!ids.length) {
      return redirectWithFlash(c, `/group/${groupId}/edit`, { status: 'error', message: '请选择学生' })
    }

    const group = await queryOne<{ class_name: string }>(
      c.env.DB,
      'SELECT class_name FROM groups WHERE id = ?',
      [groupId]
    )

    if (!group) {
      return redirectWithFlash(c, '/groups', { status: 'error', message: '小组不存在' })
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
      message: `成功添加 ${added} 名学生`
    })
  })
}
