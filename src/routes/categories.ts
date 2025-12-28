/**
 * 积分类别路由模块
 * 提供积分类别的增删改查功能
 */

import type { D1Database } from '@cloudflare/workers-types'
import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryAll, queryOne, execute } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash, redirectWithFlash } from '../lib/flash'
import { notFound, respondWithError } from '../lib/errors'
import { getGlobalCache, CACHE_KEYS, CACHE_TTL, invalidateCategoryCache } from '../lib/cache'

/**
 * 类别数据类型
 */
type Category = {
  id: number
  name: string
  description: string | null
  default_points: number
  is_active: number
  created_at?: string | null
}

/**
 * 获取所有类别（带缓存）
 */
async function getCategoriesWithCache(db: D1Database): Promise<Category[]> {
  const cache = getGlobalCache()
  const cached = cache.get<Category[]>(CACHE_KEYS.CATEGORIES)
  
  if (cached !== null) {
    return cached
  }
  
  const categories = await queryAll<Category>(
    db,
    'SELECT * FROM points_categories ORDER BY id DESC'
  )
  
  cache.set(CACHE_KEYS.CATEGORIES, categories, CACHE_TTL.CATEGORIES)
  return categories
}

// 使用 cache.ts 中的 invalidateCategoryCache 函数

/**
 * 注册积分类别相关路由
 */
export function registerCategoryRoutes(app: Hono<Env>) {
  app.get('/categories', async (c) => {
    const categories = await getCategoriesWithCache(c.env.DB)

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
      return respondWithError(c, '请输入类别名称', '/category/add')
    }

    await execute(
      c.env.DB,
      'INSERT INTO points_categories (name, description, default_points, is_active) VALUES (?, ?, ?, 1)',
      [name, description, defaultPoints]
    )

    // 使缓存失效
    invalidateCategoryCache()

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
      return notFound(c, '类别')
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
      return respondWithError(c, '请输入类别名称', `/category/${id}/edit`)
    }

    await execute(
      c.env.DB,
      'UPDATE points_categories SET name = ?, description = ?, default_points = ?, is_active = ? WHERE id = ?',
      [name, description, defaultPoints, isActive, id]
    )

    // 使缓存失效
    invalidateCategoryCache()

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
      return respondWithError(c, '类别不存在', '/categories')
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

    // 使缓存失效
    invalidateCategoryCache()

    return redirectWithFlash(c, '/categories', {
      status: 'success',
      message: '类别删除成功'
    })
  })
}
