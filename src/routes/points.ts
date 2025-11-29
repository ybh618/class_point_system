import type { Context, Hono } from 'hono'
import { read, utils, write } from 'xlsx'
import type { Env } from '../lib/env'
import { execute, queryAll, queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'
import { createPagination } from '../lib/pagination'
import { fetchStudentsWithStats } from '../lib/student_queries'

export function registerPointsRoutes(app: Hono<Env>) {
  app.get('/points/add', async (c) => {
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

    const groupsWithStudents = groups.map((group) => {
      const groupStudents = students.filter((student) => student.group_id === group.id)
      const totalPoints = groupStudents.reduce((sum, student) => sum + student.total_points, 0)
      const weekPoints = groupStudents.reduce((sum, student) => sum + student.week_points, 0)
      const average = groupStudents.length ? totalPoints / groupStudents.length : 0
      const weekAverage = groupStudents.length ? weekPoints / groupStudents.length : 0
      return {
        group: {
          ...group,
          created_at: makeDateHelper(group.created_at),
          total_points: totalPoints,
          average_points: average,
          week_points: weekPoints,
          week_average_points: weekAverage
        },
        students: groupStudents
      }
    })

    const ungroupedStudents = students.filter((student) => !student.group_id)

    const categories = await queryAll<{ name: string; default_points: number }>(
      db,
      'SELECT name, default_points FROM points_categories WHERE is_active = 1 ORDER BY name'
    )

    return c.html(
      renderTemplate({
        template: 'add_points.html',
        flash: readFlash(c),
        context: {
          groups_with_students: groupsWithStudents,
          ungrouped_students: ungroupedStudents,
          categories
        }
      })
    )
  })

  app.post('/points/add', async (c) => {
    const form = await c.req.formData()
    const studentId = parseInt(form.get('student_id')?.toString() ?? '0', 10)
    const points = parseInt(form.get('points')?.toString() ?? '0', 10)
    const category = form.get('category')?.toString() ?? '其他'
    const operator = form.get('operator')?.toString() ?? ''
    let reason = form.get('reason')?.toString().trim() ?? ''

    if (!studentId || !points || !category) {
      return respondPointsError(c, '请完整填写积分信息')
    }

    if (!reason) {
      reason = `${category}积分记录`
    }

    await execute(
      c.env.DB,
      'INSERT INTO points_records (student_id, points, reason, category, operator) VALUES (?, ?, ?, ?, ?)',
      [studentId, points, reason, category, operator]
    )

    const total = await queryOne<{ total: number }>(
      c.env.DB,
      'SELECT COALESCE(SUM(points), 0) as total FROM points_records WHERE student_id = ?',
      [studentId]
    )

    const isAjax = c.req.header('X-Requested-With') === 'XMLHttpRequest'
    if (isAjax) {
      return c.json({ success: true, new_total_points: total?.total ?? 0 })
    }

    return redirectWithFlash(c, '/points', {
      status: 'success',
      message: '积分记录添加成功'
    })
  })

  app.get('/points', async (c) => {
    const db = c.env.DB
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10))
    const search = c.req.query('search')?.trim() ?? ''
    const perPage = 20
    const offset = (page - 1) * perPage

    const filters = buildRecordFilter(search)
    const records = await queryAll<{
      id: number
      student_id: number
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
      student_name: string
      student_number: string
      class_name: string
    }>(
      db,
      `SELECT pr.*, s.name as student_name, s.student_id as student_number, s.class_name
         FROM points_records pr
         JOIN students s ON s.id = pr.student_id
         ${filters.where}
         ORDER BY pr.created_at DESC
         LIMIT ? OFFSET ?`,
      [...filters.params, perPage, offset]
    )

    const totalRow = await queryOne<{ total: number }>(
      db,
      `SELECT COUNT(*) as total FROM points_records pr JOIN students s ON s.id = pr.student_id ${filters.where}`,
      filters.params
    )
    const total = totalRow?.total ?? 0

    const formatted = records.map((record) => ({
      ...record,
      created_at: makeDateHelper(record.created_at),
      student: {
        id: record.student_id,
        name: record.student_name,
        student_id: record.student_number,
        class_name: record.class_name
      }
    }))

    const pagination = createPagination(formatted, total, page, perPage)

    return c.html(
      renderTemplate({
        template: 'points_records.html',
        flash: readFlash(c),
        context: {
          records: pagination,
          search
        }
      })
    )
  })

  app.post('/points/:recordId/revert', async (c) => {
    const recordId = Number(c.req.param('recordId'))
    const db = c.env.DB
    const record = await queryOne<{
      id: number
      student_id: number
      points: number
      category: string
      student_name: string | null
    }>(
      db,
      'SELECT pr.*, s.name as student_name FROM points_records pr LEFT JOIN students s ON s.id = pr.student_id WHERE pr.id = ?',
      [recordId]
    )

    if (!record) {
      return redirectWithFlash(c, '/points', { status: 'error', message: '记录不存在' })
    }

    await execute(db, 'DELETE FROM points_records WHERE id = ?', [recordId])

    const message = record.points > 0 ? `已撤回${record.student_name ?? '该学生'}的加分记录` : `已撤回${record.student_name ?? '该学生'}的扣分记录`

    const page = c.req.query('page')
    const search = c.req.query('search')
    const url = new URL('/points', 'https://placeholder')
    if (page) url.searchParams.set('page', page)
    if (search) url.searchParams.set('search', search)
    return redirectWithFlash(c, url.pathname + (url.search ? url.search : ''), {
      status: 'success',
      message
    })
  })

  app.get('/points/import', async (c) => {
    const categories = await queryAll<{ name: string }>(
      c.env.DB,
      'SELECT name FROM points_categories WHERE is_active = 1 ORDER BY name'
    )
    return c.html(
      renderTemplate({
        template: 'import_points.html',
        flash: readFlash(c),
        context: { categories }
      })
    )
  })

  app.post('/points/import', async (c) => {
    const form = await c.req.formData()
    const file = form.get('file')
    if (!(file instanceof File) || file.size === 0) {
      return c.json({ success: false, message: '请选择文件' })
    }

    const category = form.get('category')?.toString() || '批量导入'
    const reason = form.get('reason')?.toString() || '批量导入'
    const operator = form.get('operator')?.toString() || ''
    const skipNotFound = form.get('skip_not_found') === 'on'

    try {
      const buffer = await file.arrayBuffer()
      const workbook = read(buffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const rows = utils.sheet_to_json<(string | number)[]>(worksheet, { header: 1 })

      if (!rows.length || rows[0].length < 2) {
        return c.json({ success: false, message: '文件格式错误：至少需要2列' })
      }

      let successCount = 0
      let failedCount = 0
      let totalRecords = 0
      const failedRecords: Array<{ name: string; points: unknown; error: string }> = []

      for (const row of rows.slice(1)) {
        const nameCell = row[0]
        const pointsCell = row[1]
        if (!nameCell || pointsCell === undefined || pointsCell === null) {
          continue
        }
        totalRecords += 1
        const name = String(nameCell).trim()
        const points = Number(pointsCell)
        if (!name) {
          failedCount += 1
          failedRecords.push({ name: '', points: pointsCell, error: '姓名为空' })
          continue
        }
        if (!Number.isInteger(points)) {
          failedCount += 1
          failedRecords.push({ name, points: pointsCell, error: '分数格式错误' })
          continue
        }
        const student = await queryOne<{ id: number }>(
          c.env.DB,
          'SELECT id FROM students WHERE name = ?',
          [name]
        )
        if (!student) {
          failedCount += 1
          failedRecords.push({ name, points, error: '学生不存在' })
          if (!skipNotFound) {
            continue
          }
          continue
        }
        try {
          await execute(
            c.env.DB,
            'INSERT INTO points_records (student_id, points, reason, category, operator) VALUES (?, ?, ?, ?, ?)',
            [student.id, points, reason, category, operator]
          )
          successCount += 1
        } catch (error) {
          console.error('Import record error', error)
          failedCount += 1
          failedRecords.push({ name, points, error: '数据库错误' })
        }
      }

      return c.json({
        success: true,
        total_records: totalRecords,
        success_count: successCount,
        failed_count: failedCount,
        failed_records: failedRecords
      })
    } catch (error) {
      console.error('Import points failed', error)
      return c.json({ success: false, message: '文件处理错误' })
    }
  })

  app.get('/export', async (c) => {
    const format = c.req.query('format') || 'excel'
    if (format !== 'excel') {
      return redirectWithFlash(c, '/points', {
        status: 'error',
        message: '仅支持Excel导出'
      })
    }

    const rows = await queryAll<{
      student_id: string
      name: string
      class_name: string
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
    }>(
      c.env.DB,
      `SELECT s.student_id, s.name, s.class_name, pr.points, pr.reason, pr.category, pr.operator, pr.created_at
         FROM points_records pr
         JOIN students s ON s.id = pr.student_id
         ORDER BY pr.created_at`
    )

    const dataset = rows.map((row) => ({
      学号: row.student_id,
      姓名: row.name,
      班级: row.class_name,
      积分: row.points,
      事由: row.reason ?? '',
      类别: row.category,
      操作人: row.operator ?? '',
      时间: row.created_at
    }))

    const workbook = utils.book_new()
    const sheet = utils.json_to_sheet(dataset)
    utils.book_append_sheet(workbook, sheet, '积分记录')

    const buffer = write(workbook, { type: 'array', bookType: 'xlsx' })
    return new Response(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="class_points_records.xlsx"'
      }
    })
  })

  app.get('/api/record/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const record = await queryOne<{
      id: number
      student_id: string
      name: string
      class_name: string
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
    }>(
      c.env.DB,
      `SELECT pr.id, pr.points, pr.reason, pr.category, pr.operator, pr.created_at,
              s.name, s.student_id, s.class_name
         FROM points_records pr
         JOIN students s ON s.id = pr.student_id
        WHERE pr.id = ?`,
      [id]
    )

    if (!record) {
      return c.json({ success: false, message: '记录不存在' }, 404)
    }

    return c.json({
      id: record.id,
      student_name: record.name,
      student_id: record.student_id,
      class_name: record.class_name,
      points: record.points,
      reason: record.reason ?? '',
      category: record.category,
      operator: record.operator ?? '',
      created_at: record.created_at
    })
  })
}

function buildRecordFilter(search: string) {
  if (!search) {
    return { where: '', params: [] as unknown[] }
  }
  const term = `%${search}%`
  return {
    where: 'WHERE (s.name LIKE ? OR s.student_id LIKE ? OR pr.reason LIKE ?)',
    params: [term, term, term]
  }
}

function respondPointsError(c: Context<Env>, message: string) {
  const isAjax = c.req.header('X-Requested-With') === 'XMLHttpRequest'
  if (isAjax) {
    return c.json({ success: false, message })
  }
  return redirectWithFlash(c, '/points', { status: 'error', message })
}
