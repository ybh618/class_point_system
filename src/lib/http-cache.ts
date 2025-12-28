/**
 * HTTP 缓存中间件模块
 * 提供 ETag 生成、Cache-Control 头设置和条件请求验证
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

/**
 * 页面缓存配置
 */
export const PAGE_CACHE_OPTIONS: Record<string, CacheOptions> = {
  default: {
    maxAge: 0,
    private: true,
  },
  static: {
    maxAge: 86400,  // 1 天
    staleWhileRevalidate: 3600,
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
 * 生成 ETag（基于内容哈希）
 * 使用简单的字符串哈希算法
 * @param content 内容字符串
 * @returns ETag 字符串
 */
export function generateETag(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为 32 位整数
  }
  // 使用绝对值并转换为 16 进制
  const hashStr = Math.abs(hash).toString(16)
  return `"${hashStr}"`
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
 * 验证条件请求（If-None-Match）
 * @param request 请求对象
 * @param etag 当前内容的 ETag
 * @returns 如果 ETag 匹配返回 304 响应，否则返回 null
 */
export function validateConditionalRequest(
  request: Request,
  etag: string
): Response | null {
  const ifNoneMatch = request.headers.get('If-None-Match')
  
  if (!ifNoneMatch) {
    return null
  }

  // 处理多个 ETag 值（逗号分隔）
  const clientETags = ifNoneMatch.split(',').map(e => e.trim())
  
  // 检查是否匹配
  if (clientETags.includes(etag) || clientETags.includes('*')) {
    return new Response(null, {
      status: 304,
      statusText: 'Not Modified',
      headers: {
        'ETag': etag,
      },
    })
  }

  return null
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
