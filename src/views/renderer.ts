import nunjucks from 'nunjucks'
import { precompiledTemplates } from '../templates.generated'
import type { FlashState } from '../lib/types'

const runtime: any = (nunjucks as any).runtime
const originalCallWrap = runtime.callWrap.bind(runtime)
runtime.callWrap = function patchedCallWrap(
  obj: unknown,
  name: string,
  context: unknown,
  args: unknown[]
) {
  if (obj === undefined || obj === null) {
    throw new Error(`Unable to call \`${name}\`, which is undefined or null`)
  }
  if (typeof obj !== 'function') {
    if (!args || args.length === 0) {
      return obj
    }
    throw new Error(`Unable to call \`${name}\`, which is not a function`)
  }
  return originalCallWrap(obj, name, context, args)
}

const routePatterns: Record<string, string> = {
  index: '/',
  students: '/students',
  add_student: '/student/add',
  student_detail: '/student/:id',
  student_trend: '/student/:id/trend',
  add_points: '/points/add',
  points_records: '/points',
  rankings: '/rankings',
  categories: '/categories',
  add_category: '/category/add',
  edit_category: '/category/:id/edit',
  delete_category: '/category/:id/delete',
  groups: '/groups',
  add_group: '/group/add',
  edit_group: '/group/:id/edit',
  delete_group: '/group/:id/delete',
  set_student_group: '/student/:id/set_group',
  add_students_to_group: '/group/:id/add_students',
  import_points: '/points/import',
  revert_points_record: '/points/:record_id/revert',
  export_data: '/export'
}

function resolveRoute(name: string, rawParams?: Record<string, unknown>) {
  const pattern = routePatterns[name]
  if (!pattern) {
    return '#'
  }
  const params = { ...(rawParams ?? {}) }
  delete (params as { __keywords?: boolean }).__keywords

  let path = pattern.replace(/:([a-z_]+)/gi, (_, key) => {
    if (!(key in params)) {
      throw new Error(`Missing route param ${key} for ${name}`)
    }
    const value = params[key]
    delete params[key]
    return encodeURIComponent(String(value))
  })

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') {
      continue
    }
    search.set(key, String(value))
  }
  if (search.size > 0) {
    path += `?${search.toString()}`
  }
  return path
}

const loader = new nunjucks.PrecompiledLoader(precompiledTemplates as any)
const env = new nunjucks.Environment(loader, { autoescape: true })

env.addGlobal('url_for', (name: string, kwargs?: Record<string, unknown>) => {
  return resolveRoute(name, kwargs)
})

// 生成随机头像 URL (使用 DiceBear API)
env.addGlobal('avatar_url', (seed: string | number, style?: string) => {
  const avatarStyle = style || 'adventurer'
  const seedStr = String(seed)
  return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(seedStr)}`
})

env.addFilter('format', (pattern: string, value: unknown) => {
  if (typeof pattern !== 'string') {
    return value ?? ''
  }

  const toNumber = Number(value)
  const num = Number.isFinite(toNumber) ? toNumber : 0

  const floatMatch = pattern.match(/%\.?(\d*)f/)
  if (floatMatch) {
    const precision = floatMatch[1] ? parseInt(floatMatch[1], 10) : 0
    const formatted = num.toFixed(Number.isFinite(precision) ? precision : 0)
    return pattern === floatMatch[0] ? formatted : pattern.replace(floatMatch[0], formatted)
  }

  if (pattern.includes('%d')) {
    const formatted = Math.round(num).toString()
    return pattern === '%d' ? formatted : pattern.replace('%d', formatted)
  }

  if (pattern.includes('%s')) {
    const formatted = value == null ? '' : String(value)
    return pattern === '%s' ? formatted : pattern.replace('%s', formatted)
  }

  return value == null ? '' : String(value)
})

env.addFilter('tojson', (value: unknown) => {
  return new nunjucks.runtime.SafeString(JSON.stringify(value))
})

type RenderOptions = {
  template: string
  context?: Record<string, unknown>
  flash?: FlashState
}

export function renderTemplate({ template, context = {}, flash }: RenderOptions) {
  const locals = {
    ...context,
    get_flashed_messages: (_?: Record<string, unknown>) => {
      if (!flash?.message) {
        return []
      }
      const category = flash.status === 'error' ? 'error' : 'success'
      return [[category, flash.message]]
    }
  }
  return env.render(template, locals)
}
