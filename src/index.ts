import { Hono } from 'hono'
import type { Env } from './lib/env'
import { ensureDefaultCategories } from './lib/db'
import { registerDashboardRoutes } from './routes/dashboard'
import { registerStudentRoutes } from './routes/students'
import { registerPointsRoutes } from './routes/points'
import { registerCategoryRoutes } from './routes/categories'
import { registerGroupRoutes } from './routes/groups'
import { registerRankingRoutes } from './routes/rankings'
import { registerTrendRoutes } from './routes/trend'
import { registerApiRoutes } from './routes/api'
import { registerAssetRoutes } from './routes/assets'
import { getCacheOptionsForPath, setCacheHeaders } from './lib/http-cache'

const app = new Hono<Env>()

// 数据库初始化中间件
app.use('*', async (c, next) => {
  await ensureDefaultCategories(c.env.DB)
  return next()
})

// HTTP 缓存中间件 - 为 GET 请求添加缓存头
app.use('*', async (c, next) => {
  // 只处理 GET 请求
  if (c.req.method !== 'GET') {
    return next()
  }

  await next()

  const response = c.res
  if (!response || response.status !== 200) {
    return
  }

  const path = new URL(c.req.url).pathname
  const cacheOptions = getCacheOptionsForPath(path)
  const newHeaders = new Headers(response.headers)
  setCacheHeaders(newHeaders, cacheOptions)

  if (cacheOptions.noStore) {
    newHeaders.set('Pragma', 'no-cache')
    newHeaders.set('Expires', '0')
  }

  c.res = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  })
})

registerDashboardRoutes(app)
registerStudentRoutes(app)
registerPointsRoutes(app)
registerCategoryRoutes(app)
registerGroupRoutes(app)
registerRankingRoutes(app)
registerTrendRoutes(app)
registerApiRoutes(app)
registerAssetRoutes(app)

export default app
