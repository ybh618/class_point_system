/**
 * 仪表盘路由模块
 * 提供系统首页和统计概览功能
 */

import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { queryOne } from '../lib/db'
import { renderTemplate } from '../views/renderer'
import { readFlash } from '../lib/flash'

/**
 * 注册仪表盘相关路由
 */
export function registerDashboardRoutes(app: Hono<Env>) {
  app.get('/', async (c) => {
    const db = c.env.DB
    const summary = await queryOne<{
      total_students: number
      total_records: number
      today_records: number
    }>(
      db,
      `SELECT
         (SELECT COUNT(*) FROM students) as total_students,
         (SELECT COUNT(*) FROM points_records) as total_records,
         (SELECT COUNT(*) FROM points_records WHERE date(created_at) = date('now')) as today_records`
    )

    return c.html(
      renderTemplate({
        template: 'index.html',
        flash: readFlash(c),
        context: {
          total_students: summary?.total_students ?? 0,
          total_records: summary?.total_records ?? 0,
          today_records: summary?.today_records ?? 0
        }
      })
    )
  })
}
