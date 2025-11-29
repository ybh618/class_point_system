# 班级积分管理系统 - Cloudflare Worker 版本

基于 Cloudflare Workers + D1 数据库的班级积分管理系统。

## 功能特性

- 学生积分管理
- 小组管理
- 积分类别管理
- 积分记录查询
- 排行榜展示
- 批量导入积分
- 数据统计与趋势分析

## 技术栈

- **运行时**: Cloudflare Workers
- **数据库**: Cloudflare D1 (SQLite)
- **框架**: Hono
- **模板引擎**: Nunjucks
- **语言**: TypeScript

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化测试数据库

使用 `class_point_d1.sql` 作为测试数据：

```bash
npm run db:test
```

或者使用传统方式（需要先准备 d1_seed.sql）：

```bash
npm run db:init
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://127.0.0.1:8787` 查看应用。

## 可用命令

### 开发相关

- `npm run dev` - 启动本地开发服务器
- `npm run typecheck` - 运行 TypeScript 类型检查

### 数据库相关

- `npm run db:test` - 使用 class_point_d1.sql 初始化测试数据库（推荐）
- `npm run db:init` - 运行迁移并导入种子数据
- `npm run db:migrate` - 仅运行数据库迁移
- `npm run db:seed` - 仅导入种子数据
- `npm run db:reset` - 重置数据库（删除并重新初始化）
- `npm run db:generate` - 生成新的迁移文件

### 部署相关

- `npm run deploy` - 部署到 Cloudflare Workers

## 项目结构

```
.
├── src/
│   ├── index.ts              # Worker 入口
│   ├── lib/                  # 共享工具库
│   │   ├── db.ts            # 数据库工具
│   │   ├── env.ts           # 环境变量类型
│   │   ├── flash.ts         # Flash 消息
│   │   ├── format.ts        # 格式化工具
│   │   ├── pagination.ts    # 分页工具
│   │   ├── student_queries.ts # 学生查询
│   │   ├── time.ts          # 时间工具
│   │   └── types.ts         # 类型定义
│   ├── routes/              # 路由模块
│   ├── static/              # 静态资源
│   ├── views/               # 视图渲染
│   └── templates.generated.ts # 生成的模板
├── templates/               # HTML 模板
├── migrations/              # D1 迁移文件
├── scripts/                 # 工具脚本
│   ├── init_test_db.sh     # 测试数据库初始化脚本
│   ├── generate_templates.cjs # 模板生成脚本
│   └── export_sqlite_to_d1.py # SQLite 导出脚本
├── class_point_d1.sql      # 测试数据库文件（推荐使用）
├── wrangler.toml           # Cloudflare 配置
└── package.json            # 项目配置

```

## 测试数据

项目包含完整的测试数据 (`class_point_d1.sql`)：

- **50 名学生** - 分布在 8 个小组中
- **8 个小组** - 每组 6-7 名学生
- **9 个积分类别** - 作业、考试、纪律、表现等
- **826+ 条积分记录** - 包含各种加分扣分场景

使用 `npm run db:test` 可以快速初始化包含这些测试数据的本地数据库。

## 开发指南

### 修改模板

1. 编辑 `templates/` 目录下的 HTML 文件
2. 运行 `node scripts/generate_templates.cjs` 重新生成模板
3. 重启开发服务器

### 数据库迁移

创建新的迁移：

```bash
npm run db:generate -- <migration_name>
```

应用迁移：

```bash
npm run db:migrate
```

### 部署到生产环境

1. 更新 `wrangler.toml` 中的 `database_id`
2. 运行生产环境迁移：
   ```bash
   wrangler d1 migrations apply class_points_d1
   ```
3. 部署 Worker：
   ```bash
   npm run deploy
   ```

## 环境变量

在 `wrangler.toml` 中配置：

```toml
[[d1_databases]]
binding = "DB"
database_name = "class_points_d1"
database_id = "your-database-id"
```

## 许可证

MIT
