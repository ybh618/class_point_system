/**
 * HTTP 缓存中间件模块
 * 提供 Cache-Control 头设置和路径级缓存策略
 */

/**
 * 缓存选项接口
 */
export interface CacheOptions {
  maxAge: number                    // 缓存最大存活时间（秒）
  staleWhileRevalidate?: number     // 后台刷新时间（秒）
  private?: boolean                 // 是否为私有缓存
  noStore?: boolean                 // 是否禁止存储
  mustRevalidate?: boolean          // 是否必须重新验证
}

export function applyCacheHeadersToResponse(
  response: Response,
  options: CacheOptions
): Response {
  const headers = new Headers(response.headers)
  setCacheHeaders(headers, options)

  if (options.noStore) {
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/**
 * 页面缓存配置
 */
export const PAGE_CACHE_OPTIONS: Record<string, CacheOptions> = {
  default: {
    maxAge: 0,
    private: true,
  },
  static: {
    maxAge: 604800,  // 7 天
    staleWhileRevalidate: 86400,
  },
  rankings: {
    maxAge: 60,     // 1 分钟
    staleWhileRevalidate: 30,
    private: true,
  },
  dashboard: {
    maxAge: 30,     // 30 秒
    staleWhileRevalidate: 15,
    private: true,
  },
  noCache: {
    maxAge: 0,
    noStore: true,
    mustRevalidate: true,
  },
}

/**
 * 构建 Cache-Control 头值
 * @param options 缓存选项
 * @returns Cache-Control 头值字符串
 */
export function buildCacheControlHeader(options: CacheOptions): string {
  const directives: string[] = []

  if (options.noStore) {
    return 'no-store, no-cache, must-revalidate'
  }

  if (options.private) {
    directives.push('private')
  } else {
    directives.push('public')
  }

  directives.push(`max-age=${options.maxAge}`)

  if (options.staleWhileRevalidate !== undefined) {
    directives.push(`stale-while-revalidate=${options.staleWhileRevalidate}`)
  }

  return directives.join(', ')
}

/**
 * 设置缓存相关的响应头
 * @param headers 响应头对象
 * @param options 缓存选项
 * @param etag 可选的 ETag 值
 */
export function setCacheHeaders(
  headers: Headers,
  options: CacheOptions,
  etag?: string
): void {
  headers.set('Cache-Control', buildCacheControlHeader(options))
  
  if (etag) {
    headers.set('ETag', etag)
  }
}

/**
 * 判断请求路径是否为静态资源
 * @param path 请求路径
 * @returns 是否为静态资源
 */
export function isStaticResource(path: string): boolean {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2']
  return staticExtensions.some(ext => path.endsWith(ext))
}

/**
 * 根据路径获取缓存选项
 * @param path 请求路径
 * @returns 缓存选项
 */
export function getCacheOptionsForPath(path: string): CacheOptions {
  if (isStaticResource(path)) {
    return PAGE_CACHE_OPTIONS.static
  }
  
  if (path === '/rankings') {
    return PAGE_CACHE_OPTIONS.rankings
  }
  
  if (path === '/') {
    return PAGE_CACHE_OPTIONS.dashboard
  }
  
  // 编辑类页面禁用缓存，确保数据更新后立即可见
  if (path.includes('/edit') || path === '/groups' || path === '/students' || path === '/categories') {
    return PAGE_CACHE_OPTIONS.noCache
  }
  
  return PAGE_CACHE_OPTIONS.default
}
