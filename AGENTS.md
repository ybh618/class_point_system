该项目是基于 Cloudflare Workers 和 D1 数据库构建的班级积分管理系统。
## 1. 项目核心概览
- **技术栈**: Hono, D1 (SQLite 数据库), Nunjucks, TypeScript.
- **双端支持**:
  - Web 端：直接由 Workers 渲染 HTML (通过 `src/views` 和 `templates`)。
  - 移动端：Android 原生应用，通过 `/api/v1/` 接口进行数据交互。
## 2. 核心开发工作流
### 2.1 修改界面 (Templates)
1. **编辑** `templates/` 下的 HTML 文件。
2. **运行生成脚本**: `node scripts/generate_templates.cjs`。
### 2.3 类型检查
- 提交前务必运行 `npm run typecheck`。项目采用严格模式，类型定义存放在 `src/lib/types.ts`。
## 3. 编码规范与约定
- **命名**: 
  - 变量/函数: `camelCase`
  - 类/接口: `PascalCase`
  - 路由文件: 小写并以连字符分隔 (`points-history.ts`)
- **路由分发**: 新功能应在 `src/routes/` 下创建独立模块，并在 `src/index.ts` 中注册。
- **API 设计**: 移动端 API 统一前缀为 `/api/v1/`，遵循 RESTful 风格。
