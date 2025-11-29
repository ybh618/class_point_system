import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryAll, queryOne, execute } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'

export function registerCategoryRoutes(app: Hono<Env>) {
  app.get('/categories', async (c) => {
    const categories = await queryAll<{
      id: number
      name: string
      description: string | null
      default_points: number
      is_active: number
      created_at?: string | null
    }>(c.env.DB, 'SELECT * FROM points_categories ORDER BY id DESC')

    return c.html(
      renderTemplate({
        template: 'categories.html',
        flash: readFlash(c),
        context: { categories }
      })
    )
  })

  app.get('/category/add', (c) => {
    return c.html(
      renderTemplate({ template: 'add_category.html', flash: readFlash(c) })
    )
  })

  app.post('/category/add', async (c) => {
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const defaultPoints = parseInt(form.get('default_points')?.toString() ?? '0', 10)

    if (!name) {
      return redirectWithFlash(c, '/category/add', { status: 'error', message: '请输入类别名称' })
    }

    await execute(
      c.env.DB,
      'INSERT INTO points_categories (name, description, default_points, is_active) VALUES (?, ?, ?, 1)',
      [name, description, defaultPoints]
    )

    return redirectWithFlash(c, '/categories', {
      status: 'success',
      message: '类别添加成功'
    })
  })

  app.get('/category/:id/edit', async (c) => {
    const id = Number(c.req.param('id'))
    const category = await queryOne<{
      id: number
      name: string
      description: string | null
      default_points: number
      is_active: number
    }>(c.env.DB, 'SELECT * FROM points_categories WHERE id = ?', [id])

    if (!category) {
      return c.text('类别不存在', 404)
    }

    return c.html(
      renderTemplate({
        template: 'edit_category.html',
        flash: readFlash(c),
        context: { category }
      })
    )
  })

  app.post('/category/:id/edit', async (c) => {
    const id = Number(c.req.param('id'))
    const form = await c.req.formData()
    const name = form.get('name')?.toString().trim()
    const description = form.get('description')?.toString().trim() ?? ''
    const defaultPoints = parseInt(form.get('default_points')?.toString() ?? '0', 10)
    const isActive = form.get('is_active') === 'on' ? 1 : 0

    if (!name) {
      return redirectWithFlash(c, `/category/${id}/edit`, {
        status: 'error',
        message: '请输入类别名称'
      })
    }

    await execute(
      c.env.DB,
      'UPDATE points_categories SET name = ?, description = ?, default_points = ?, is_active = ? WHERE id = ?',
      [name, description, defaultPoints, isActive, id]
    )

    return redirectWithFlash(c, '/categories', {
      status: 'success',
      message: '类别更新成功'
    })
  })

  app.post('/category/:id/delete', async (c) => {
    const id = Number(c.req.param('id'))
    const category = await queryOne<{ name: string }>(
      c.env.DB,
      'SELECT name FROM points_categories WHERE id = ?',
      [id]
    )

    if (!category) {
      return redirectWithFlash(c, '/categories', { status: 'error', message: '类别不存在' })
    }

    const inUse = await queryOne<{ total: number }>(
      c.env.DB,
      'SELECT COUNT(*) as total FROM points_records WHERE category = ?',
      [category.name]
    )

    if ((inUse?.total ?? 0) > 0) {
      return redirectWithFlash(c, '/categories', {
        status: 'error',
        message: `无法删除，该类别仍被 ${inUse?.total ?? 0} 条记录使用`
      })
    }

    await execute(c.env.DB, 'DELETE FROM points_categories WHERE id = ?', [id])

    return redirectWithFlash(c, '/categories', {
      status: 'success',
      message: '类别删除成功'
    })
  })
}
