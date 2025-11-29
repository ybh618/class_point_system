import type { Hono } from 'hono'
import { read, utils } from 'xlsx'
import type { Env } from '../lib/env'
import { queryAll, queryOne, execute } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { makeDateHelper } from '../lib/time'
import { createPagination } from '../lib/pagination'
import { fetchStudentsWithStats } from '../lib/student_queries'

const PER_PAGE = 20

export function registerStudentRoutes(app: Hono<Env>) {
  app.get('/students', async (c) => {
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10))
    const search = c.req.query('search')?.trim() ?? ''
    const db = c.env.DB

    const offset = (page - 1) * PER_PAGE

    const rows = await fetchStudentsWithStats(db, {
      search,
      limit: PER_PAGE,
      offset
    })
    const { where, params } = buildSearchFilter(search)
    const countRow = await queryOne<{ total: number }>(db, `SELECT COUNT(*) as total FROM students s ${where}`, params)
    const total = countRow?.total ?? 0

    const pagination = createPagination(rows, total, page, PER_PAGE)

    const categories = await queryAll<{ name: string }>(
      db,
      'SELECT name FROM points_categories WHERE is_active = 1 ORDER BY name'
    )

    return c.html(
      renderTemplate({
        template: 'students.html',
        flash: readFlash(c),
        context: {
          students: pagination,
          search,
          categories
        }
      })
    )
  })

  app.get('/student/add', (c) => {
    return c.html(
      renderTemplate({
        template: 'add_student.html',
        flash: readFlash(c)
      })
    )
  })

  app.post('/student/add', async (c) => {
    const form = await c.req.formData()
    const action = form.get('action')?.toString()
    const db = c.env.DB

    if (action === 'import') {
      const file = form.get('excel_file')
      if (!(file instanceof File) || file.size === 0) {
        return redirectWithFlash(c, '/student/add', {
          status: 'error',
          message: '请选择要导入的Excel文件'
        })
      }

      try {
        const buffer = await file.arrayBuffer()
        const workbook = read(buffer, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rows = utils.sheet_to_json<(string | number)[]>(worksheet, { header: 1 })

        if (!rows.length || rows[0].length < 2) {
          return redirectWithFlash(c, '/student/add', {
            status: 'error',
            message: 'Excel文件至少需要两列数据'
          })
        }

        let importCount = 0
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i]
          const nameCell = row[1]
          if (!nameCell) {
            continue
          }
          const name = String(nameCell).trim()
          if (!name) {
            continue
          }
          const studentId = `import_${i + 1}`
          const exists = await queryOne<{ id: number }>(
            db,
            'SELECT id FROM students WHERE student_id = ?',
            [studentId]
          )
          if (exists) {
            continue
          }
          await execute(
            db,
            'INSERT INTO students (student_id, name, class_name) VALUES (?, ?, ?)',
            [studentId, name, '默认班级']
          )
          importCount += 1
        }

        return redirectWithFlash(c, '/students', {
          status: 'success',
          message: `成功导入 ${importCount} 名学生`
        })
      } catch (error) {
        console.error('Import failed', error)
        return redirectWithFlash(c, '/student/add', {
          status: 'error',
          message: 'Excel文件解析失败，请检查格式'
        })
      }
    }

    const studentId = form.get('student_id')?.toString().trim()
    const name = form.get('name')?.toString().trim()
    const className = form.get('class_name')?.toString().trim()

    if (!studentId || !name || !className) {
      return redirectWithFlash(c, '/student/add', {
        status: 'error',
        message: '请完整填写学生信息'
      })
    }

    const exists = await queryOne<{ id: number }>(
      db,
      'SELECT id FROM students WHERE student_id = ?',
      [studentId]
    )
    if (exists) {
      return redirectWithFlash(c, '/student/add', {
        status: 'error',
        message: '学号已存在'
      })
    }

    await execute(
      db,
      'INSERT INTO students (student_id, name, class_name) VALUES (?, ?, ?)',
      [studentId, name, className]
    )

    return redirectWithFlash(c, '/students', {
      status: 'success',
      message: '学生添加成功'
    })
  })

  app.get('/student/:id', async (c) => {
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

    const total = await queryOne<{ total_points: number }>(
      db,
      'SELECT COALESCE(SUM(points), 0) as total_points FROM points_records WHERE student_id = ?',
      [id]
    )

    const records = await queryAll<{
      id: number
      student_id: number
      points: number
      reason: string | null
      category: string
      operator: string | null
      created_at: string
    }>(
      db,
      'SELECT * FROM points_records WHERE student_id = ? ORDER BY created_at DESC',
      [id]
    )

    const renderedRecords = records.map((record) => ({
      ...record,
      created_at: makeDateHelper(record.created_at)
    }))

    return c.html(
      renderTemplate({
        template: 'student_detail.html',
        flash: readFlash(c),
        context: {
          student: {
            ...student,
            created_at: makeDateHelper(student.created_at),
            total_points: total?.total_points ?? 0
          },
          records: renderedRecords
        }
      })
    )
  })
}

function buildSearchFilter(search: string) {
  if (!search) {
    return { where: '', params: [] as unknown[] }
  }
  const term = `%${search}%`
  return {
    where: 'WHERE (s.name LIKE ? OR s.student_id LIKE ? OR s.class_name LIKE ?)',
    params: [term, term, term]
  }
}
