/**
 * 内存缓存服务模块
 * 提供应用级别的内存缓存，支持 TTL 过期和模式匹配失效
 */

/**
 * 缓存条目接口
 */
export interface CacheEntry<T> {
  data: T
  createdAt: number
  expiresAt: number
}

/**
 * 内存缓存服务类
 * 实现基于 Map 的内存缓存，支持 TTL 过期检查
 */
export class MemoryCacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map()

  /**
   * 获取缓存数据
   * @param key 缓存键
   * @returns 缓存数据，如果不存在或已过期则返回 null
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }

    const now = Date.now()
    if (now > entry.expiresAt) {
      // 缓存已过期，删除并返回 null
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * 设置缓存数据
   * @param key 缓存键
   * @param data 要缓存的数据
   * @param ttl 缓存生存时间（毫秒）
   */
  set<T>(key: string, data: T, ttl: number): void {
    const now = Date.now()
    const entry: CacheEntry<T> = {
      data,
      createdAt: now,
      expiresAt: now + ttl,
    }
    this.cache.set(key, entry)
  }

  /**
   * 使指定键的缓存失效
   * @param key 缓存键
   */
  invalidate(key: string): void {
    this.cache.delete(key)
  }

  /**
   * 批量使匹配模式的缓存失效
   * @param pattern 缓存键前缀模式
   */
  invalidatePattern(pattern: string): void {
    const keysToDelete: string[] = []
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        keysToDelete.push(key)
      }
    }
    for (const key of keysToDelete) {
      this.cache.delete(key)
    }
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size
  }

  /**
   * 检查缓存是否存在且有效
   * @param key 缓存键
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }
}

// 全局缓存实例
let globalCache: MemoryCacheService | null = null

/**
 * 获取全局缓存实例（单例模式）
 */
export function getGlobalCache(): MemoryCacheService {
  if (!globalCache) {
    globalCache = new MemoryCacheService()
  }
  return globalCache
}

/**
 * 重置全局缓存（主要用于测试）
 */
export function resetGlobalCache(): void {
  if (globalCache) {
    globalCache.clear()
  }
  globalCache = null
}

// 缓存键常量
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  STUDENTS_STATS: 'students_stats',
} as const

// 默认 TTL 配置（毫秒）
export const CACHE_TTL = {
  CATEGORIES: 5 * 60 * 1000,  // 5 分钟
  STUDENTS_STATS: 2 * 60 * 1000,  // 2 分钟
} as const


/**
 * 使类别相关缓存失效
 */
export function invalidateCategoryCache(): void {
  const cache = getGlobalCache()
  cache.invalidate(CACHE_KEYS.CATEGORIES)
}

/**
 * 使学生统计相关缓存失效
 */
export function invalidateStudentsCache(): void {
  const cache = getGlobalCache()
  cache.invalidate(CACHE_KEYS.STUDENTS_STATS)
}
