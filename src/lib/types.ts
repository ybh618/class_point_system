/**
 * 共享类型定义模块
 * 定义系统中使用的基础类型和数据模型
 */

/**
 * 分页结果类型
 */
export type Pagination<T> = {
  items: T[]
  page: number
  per_page: number
  total: number
  pages: number
}

/**
 * Flash 消息状态类型
 */
export type FlashState = {
  status?: 'success' | 'error'
  message?: string
}
