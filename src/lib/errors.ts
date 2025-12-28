/**
 * 统一错误处理模块
 * 提供一致的错误响应格式和处理函数
 */

import type { Context } from 'hono'
import type { Env } from './env'
import { redirectWithFlash } from './flash'

/**
 * 统一的错误响应类型
 */
export type ErrorResponse = {
  success: false
  message: string
}

/**
 * 创建统一格式的错误响应对象
 * @param message 错误消息
 * @returns 包含 success: false 和 message 的错误响应对象
 */
export function createErrorResponse(message: string): ErrorResponse {
  return { success: false, message }
}

/**
 * 处理 AJAX 或普通请求的错误响应
 * 根据请求类型返回 JSON 或重定向响应
 * @param c Hono 上下文
 * @param message 错误消息
 * @param redirectUrl 非 AJAX 请求时的重定向 URL
 */
export function respondWithError(
  c: Context<Env>,
  message: string,
  redirectUrl: string
) {
  const isAjax = c.req.header('X-Requested-With') === 'XMLHttpRequest'
  if (isAjax) {
    return c.json(createErrorResponse(message))
  }
  return redirectWithFlash(c, redirectUrl, { status: 'error', message })
}

/**
 * 统一的 404 资源不存在响应
 * @param c Hono 上下文
 * @param resourceName 资源名称（如"学生"、"小组"等）
 */
export function notFound(c: Context<Env>, resourceName: string) {
  return c.text(`${resourceName}不存在`, 404)
}
