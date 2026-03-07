/**
 * 学生路由模块
 * 提供学生的增删改查和导入功能
 */

import type { Hono } from 'hono'
import { read, utils } from 'xlsx'
import type { Env } from '../lib/env'
import { queryAll, queryOne, execute, executeBatch } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { createPagination } from '../lib/pagination'
import { fetchStudentsForList } from '../lib/student_queries'
import { PAGE_SIZE } from '../lib/constants'
import { respondWithError } from '../lib/errors'
import { invalidateStudentsCache } from '../lib/cache'

/**
 * 注册学生相关路由
 */
export function registerStudentRoutes(app: Hono<Env>) {
  /**
   * 学生列表页面
   */
  app.get('/students', async (c) => {
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10))
    const search = c.req.query('search')?.trim() ?? ''
    const db = c.env.DB

    const offset = (page - 1) * PAGE_SIZE

    const countQuery = buildSearchFilter(search)
    const [rows, categories] = await Promise.all([
      fetchStudentsForList(db, {
        search,
        limit: PAGE_SIZE,
        offset,
      }),
      queryAll<{ name: string }>(
        db,
        'SELECT name FROM points_categories WHERE is_active = 1 ORDER BY name'
      )
    ])

    let total = offset + rows.length
    if (rows.length === PAGE_SIZE || (page > 1 && rows.length === 0)) {
      const countRow = await queryOne<{ total: number }>(
        db,
        `SELECT COUNT(*) as total FROM students s ${countQuery.where}`,
        countQuery.params
      )
      total = countRow?.total ?? 0
    }

    const pagination = createPagination(rows, total, page, PAGE_SIZE)

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

        const importStudentIds = rows.map((_, index) => `import_${index + 1}`)
        const placeholders = importStudentIds.map(() => '?').join(',')
        const existingIds = importStudentIds.length > 0
          ? await queryAll<{ student_id: string }>(
            db,
            `SELECT student_id FROM students WHERE student_id IN (${placeholders})`,
            importStudentIds
          )
          : []
        const existingIdSet = new Set(existingIds.map((item) => item.student_id))

        const insertStatements: Array<{ sql: string; params: unknown[] }> = []
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
          if (existingIdSet.has(studentId)) {
            continue
          }
          insertStatements.push({
            sql: 'INSERT INTO students (student_id, name, class_name) VALUES (?, ?, ?)',
            params: [studentId, name, '默认班级']
          })
          existingIdSet.add(studentId)
        }

        await executeBatch(db, insertStatements)
        const importCount = insertStatements.length

        invalidateStudentsCache()

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

    const name = form.get('name')?.toString().trim()
    const className = form.get('class_name')?.toString().trim()
    const studentId = form.get('student_id')?.toString().trim() || `sid_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    if (!name || !className) {
      return respondWithError(c, '请完整填写学生信息', '/student/add')
    }

    const exists = await queryOne<{ id: number }>(
      db,
      'SELECT id FROM students WHERE student_id = ?',
      [studentId]
    )
    if (exists) {
      return respondWithError(c, '学号已存在', '/student/add')
    }

    await execute(
      db,
      'INSERT INTO students (student_id, name, class_name) VALUES (?, ?, ?)',
      [studentId, name, className]
    )

    invalidateStudentsCache()

    return redirectWithFlash(c, '/students', {
      status: 'success',
      message: '学生添加成功'
    })
  })

}

/**
 * 构建学生搜索过滤条件
 */
function buildSearchFilter(search: string) {
  if (!search) {
    return { where: '', params: [] as unknown[] }
  }
  const term = `%${search}%`
  return {
    where: 'WHERE (s.name LIKE ? OR s.student_id LIKE ? OR s.class_name LIKE ?)',
    params: [term, term, term],
  }
}
