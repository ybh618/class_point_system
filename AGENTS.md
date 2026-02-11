# Repository Guidelines
永远用中文回答用户
## Project Structure
- `src/`: Cloudflare Worker (Hono). Entry: `src/index.ts`.
- `src/routes/`: Route modules registered from `src/index.ts`.
- `src/lib/`: Shared helpers (DB, types, caching, pagination).
- `templates/`: Nunjucks HTML templates compiled into `src/templates.generated.ts`.
- `migrations/`: Cloudflare D1 SQL migrations.
- `scripts/`: Dev utilities (DB init, template generation).
## Common Commands
- `npm run dev`: Run locally (`wrangler dev`).
- `npm run deploy`: Deploy to Cloudflare.
- `npm run typecheck` (or `npm run lint`): Type check (`tsc --noEmit`).
- `npm run test`: Run Vitest (looks for `tests/**/*.test.ts`).
- `npm run db:init`: Local D1 migrate + seed. Use `npm run db:reset` to wipe and re-init.
- `node scripts/generate_templates.cjs`: Rebuild `src/templates.generated.ts` after editing `templates/`.
## Coding Style
- TypeScript + ESM (`"type": "module"`).
- Match existing style: 2-space indentation, single quotes, no semicolons.
- Prefer clear, descriptive file names (e.g. `src/routes/students.ts`, `src/lib/student_queries.ts`).
## Testing
- Framework: Vitest (`vitest.config.ts`).
- Name tests `*.test.ts` under `tests/`.
- If tests need DB data, run `npm run db:test` first (local D1 setup).
## Commits & PRs
- Prefer Conventional Commits: `feat:`, `fix:`, `chore:`.
- PRs: short description; screenshots for template/UI changes; mention any migration/seed impact.
## Security & Config
- Worker config: `wrangler.toml` (D1 binding is `DB`).
- Don’t commit secrets; use Wrangler/Cloudflare secrets for sensitive values.
