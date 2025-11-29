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

const app = new Hono<Env>()

app.use('*', async (c, next) => {
  await ensureDefaultCategories(c.env.DB)
  return next()
})

registerDashboardRoutes(app)
registerStudentRoutes(app)
registerPointsRoutes(app)
registerCategoryRoutes(app)
registerGroupRoutes(app)
registerRankingRoutes(app)
registerTrendRoutes(app)

export default app
