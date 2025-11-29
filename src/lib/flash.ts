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
  return c.redirect(url.pathname + (url.search ? url.search : ''))
}
