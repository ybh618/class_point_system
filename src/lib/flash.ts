import type { Context } from 'hono'
import type { FlashState } from './types'

export function readFlash(c: Context): FlashState {
  const status = c.req.query('status')
  const message = c.req.query('message')
  if (!status || !message) {
    return {}
  }
  if (status !== 'success' && status !== 'error') {
    return {}
  }
  return { status, message }
}

export function redirectWithFlash(c: Context, location: string, flash: FlashState) {
  const url = new URL(location, 'https://placeholder')
  if (flash.status && flash.message) {
    url.searchParams.set('status', flash.status)
    url.searchParams.set('message', flash.message)
  }
  const redirectUrl = url.pathname + (url.search ? url.search : '')
  // 设置 no-cache 头，确保重定向后浏览器重新获取页面
  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
  })
}
