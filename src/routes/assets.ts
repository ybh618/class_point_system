import type { Hono } from 'hono'
import type { Env } from '../lib/env'
import { renderAvatarSvg } from '../lib/avatar'
import { staticAssets } from '../static-assets.generated'

export function registerAssetRoutes(app: Hono<Env>) {
  app.get('/assets/*', (c) => {
    const path = new URL(c.req.url).pathname
    const asset = staticAssets[path]

    if (!asset) {
      return c.notFound()
    }

    const body = asset.encoding === 'base64'
      ? Uint8Array.from(atob(asset.body), (char) => char.charCodeAt(0))
      : asset.body

    return new Response(body, {
      headers: {
        'Content-Type': asset.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  })

  app.get('/avatar/:seed.svg', (c) => {
    const seed = c.req.param('seed') ?? 'default'
    const name = c.req.query('name') ?? seed

    return new Response(renderAvatarSvg(seed, name), {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    })
  })
}
