# Repository Guidelines
使用中文输出spec
请你需要时使用v0 MCP来构建更美观的前端页面
## Project Structure & Module Organization
- `src/` holds the Worker entry point (`index.ts`), route modules (`routes/`), shared helpers (`lib/`), and the Nunjucks renderer that mirrors the Flask templates.
- `migrations/` stores the D1 migration files run by `wrangler d1 migrations`; keep SQL in sync with the SQLite schema when altering models.
- `scripts/` contains tooling such as `generate_templates.cjs` and `export_sqlite_to_d1.py` so the Worker can reuse UI templates and migrate historical data.
- UI templates live at `templates/` and are mirrored into `src/templates.generated.ts` via the generator script; update both the HTML source and regenerate when needed.
- Assets (e.g., `wrangler.toml`, `tsconfig.json`) define the Cloudflare build and TypeScript config, while `d1_seed.sql` provides a sample seeding path.

## Build, Test, and Development Commands
- `npm install`: populate `node_modules` inside the Cloudflare worker directory before any scripts.
- `npm run dev`: launches `wrangler dev` with a local D1 emulator; verify routes at `http://127.0.0.1:8787`.
- `npm run typecheck`: runs `tsc` against `src/**/*`; use it to catch typing issues before commits.
- `npm run db:migrate`: applies `migrations/` to the Miniflare-backed D1 when you need a fresh local schema.
- `npm run deploy`: builds and publishes the Worker after you update `wrangler.toml` (update `[[d1_databases]]` `id` first).
- `node scripts/generate_templates.cjs`: syncs the Flask HTML templates into the Worker bundle; re-run whenever template markup changes.
- `python scripts/export_sqlite_to_d1.py instance/class_points.db -o cloudflare/d1_seed.sql`: exports existing SQLite data for the D1 seed pipeline.

## Coding Style & Naming Conventions
- TypeScript files follow the existing 2-space indentation and `import` ordering seen in `src/index.ts`; prefer descriptive module names (e.g., `routes/students`).
- Keep shared utilities in `lib/`, route registries in `routes/`, and views/renderer logic in `views/`; match filenames to their exported feature (e.g., `registerPointsRoutes` in `routes/points.ts`).
- Use camelCase for functions/variables, PascalCase for exported classes, and lowercase hyphenated route filenames to stay consistent with `wrangler` expectations.
- Rely on `npm run typecheck` as the current lint gate; add ESLint or formatter only if a team decision requires it.

## Testing Guidelines
- There are no automated suites yet; rely on `npm run dev` to manually exercise workflows (import/export, batches, rankings) in the browser and verify D1 state via `wrangler d1 execute`.
- For future tests, prefer placing them under a new `tests/` directory (e.g., `tests/test-points.ts`) and keep file names prefixed with `test-`.
- Always run `npm run typecheck` before pushing to ensure strict mode in `tsconfig.json` still passes.

## Commit & Pull Request Guidelines
- Commit messages should be brief and imperative (`Add daily summary endpoint`, `Fix D1 ranking query`), and include context when database/migration files change.
- Pull requests need: purpose statement, key implementation notes, manual verification steps (commands/URLs), linked issues if applicable, and screenshots/GIFs when the UI or charts change.
- Mention any migrations or D1 configuration updates so reviewers know to rerun `npm run db:migrate` or refresh `wrangler.toml`.

## Security & Configuration Tips
- Never commit `instance/class_points.db`; rely on D1 migrations and `d1_seed.sql` for database state.
- Keep sensitive values (API tokens, D1 IDs) out of the repo; configure them via Wrangler secrets or environment variables before deployment.
