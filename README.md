# 班级积分系统（Cloudflare Workers + D1）

用于班级积分管理的 Web 应用，基于 Cloudflare Workers（Hono）与 D1 数据库。围绕“记分—统计—展示”的日常流程，覆盖学生、小组、积分与排名的完整闭环，并提供面向安卓应用的 API。

## 业务流程与使用场景
1. **初始化学生与小组**
   - 通过“学生管理”添加学生或使用 Excel 批量导入
   - 通过“小组管理”创建小组并进行分组
2. **日常积分登记**
   - 选择学生、积分分类与原因，快速记录加/扣分
   - 支持批量导入历史积分与导出记录归档
3. **统计与展示**
   - “排名”展示学生/小组排行榜
   - “进步榜”对比两段时间的排名变化
   - “趋势”查看单个学生的积分走势
4. **移动端对接**
   - 安卓应用通过 `/api/v1` 获取学生/小组/分类与提交积分记录

## 功能概览
- 学生管理：列表、搜索、批量导入（Excel）
- 积分管理：新增/导入/导出记录
- 积分类别：增删改查与启停
- 小组管理：分组与统计
- 排名与趋势：学生/小组排名、进步榜、个人趋势
- API：安卓应用专用接口（`/api/v1`）

## 快速上手（本地）
1. 安装依赖
   - `npm install`
2. 初始化本地 D1 数据库（迁移 + 种子数据）
   - `npm run db:init`
3. 启动本地开发服务
   - `npm run dev`
4. 访问本地服务（Wrangler 默认端口）
   - `http://localhost:8787`

## 部署到 Cloudflare
1. 创建 D1 数据库（生产）
   - `wrangler d1 create class_points_d1`
2. 更新 `wrangler.toml` 中的 `database_id`
3. 应用生产迁移
   - `wrangler d1 migrations apply class_points_d1`
4. 部署 Worker
   - `npm run deploy`

## 常用命令
- 本地开发：`npm run dev`
- 类型检查：`npm run typecheck`
- 运行测试：`npm run test`
- 初始化数据库：`npm run db:init`
- 重置数据库：`npm run db:reset`
- 生成迁移：`npm run db:generate`

## 路由与页面（部分）
- 首页仪表盘：`/`
- 学生管理：`/students`
- 积分记录：`/points`
- 积分类别：`/categories`
- 小组管理：`/groups`
- 排名与进步榜：`/rankings`
- 学生趋势：`/student/:id/trend`

## API（安卓）
前缀：`/api/v1`
- `GET /students`：学生列表
- `GET /groups`：小组列表（含学生）
- `GET /categories`：积分分类
- `POST /points/add`：提交积分记录

## 项目结构
- `src/`：Worker 入口与业务代码
- `src/routes/`：路由模块
- `src/lib/`：DB/缓存/工具函数
- `templates/`：Nunjucks 模板
- `migrations/`：D1 SQL 迁移

## 模板开发
编辑 `templates/` 后需要重新生成编译文件：
- `node scripts/generate_templates.cjs`
