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
    const totalStudents = await queryOne<{ total: number }>(db, 'SELECT COUNT(*) as total FROM students')
    const totalRecords = await queryOne<{ total: number }>(db, 'SELECT COUNT(*) as total FROM points_records')
    const todayRecords = await queryOne<{ total: number }>(
      db,
      "SELECT COUNT(*) as total FROM points_records WHERE date(created_at) = date('now')"
    )

    return c.html(
      renderTemplate({
        template: 'index.html',
        flash: readFlash(c),
        context: {
          total_students: totalStudents?.total ?? 0,
          total_records: totalRecords?.total ?? 0,
          today_records: todayRecords?.total ?? 0
        }
      })
    )
  })
}
