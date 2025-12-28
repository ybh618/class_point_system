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
import { getCacheOptionsForPath, setCacheHeaders, generateETag, validateConditionalRequest } from './lib/http-cache'

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

  // 获取响应
  const response = c.res
  if (!response || response.status !== 200) {
    return
  }

  // 获取路径对应的缓存配置
  const path = new URL(c.req.url).pathname
  const cacheOptions = getCacheOptionsForPath(path)

  // 克隆响应以读取内容
  const contentType = response.headers.get('Content-Type') || ''
  if (contentType.includes('text/html')) {
    const body = await response.clone().text()

    // 设置缓存头
    const newHeaders = new Headers(response.headers)

    // 如果是 noStore 模式，跳过 ETag 验证，直接返回新内容
    if (cacheOptions.noStore) {
      setCacheHeaders(newHeaders, cacheOptions)
      newHeaders.set('Pragma', 'no-cache')
      newHeaders.set('Expires', '0')
      c.res = new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      })
      return
    }

    const etag = generateETag(body)

    // 检查条件请求
    const conditionalResponse = validateConditionalRequest(c.req.raw, etag)
    if (conditionalResponse) {
      c.res = conditionalResponse
      return
    }

    setCacheHeaders(newHeaders, cacheOptions, etag)

    c.res = new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  }
})

registerDashboardRoutes(app)
registerStudentRoutes(app)
registerPointsRoutes(app)
registerCategoryRoutes(app)
registerGroupRoutes(app)
registerRankingRoutes(app)
registerTrendRoutes(app)
registerApiRoutes(app)

export default app
