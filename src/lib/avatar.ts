const AVATAR_COLORS = [
  ['#eff6ff', '#1d4ed8'],
  ['#ecfdf5', '#047857'],
  ['#fff7ed', '#c2410c'],
  ['#fdf4ff', '#a21caf'],
  ['#fef2f2', '#dc2626'],
  ['#f5f3ff', '#6d28d9'],
]

function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function getInitials(name?: string): string {
  const trimmed = name?.trim()
  if (!trimmed) {
    return '?'
  }

  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  const chars = Array.from(trimmed)
  return chars.slice(0, 2).join('').toUpperCase()
}

export function getAvatarUrl(seed: string | number, name?: string): string {
  const seedStr = String(seed)
  const query = name ? `?name=${encodeURIComponent(name)}` : ''
  return `/avatar/${encodeURIComponent(seedStr)}.svg${query}`
}

export function renderAvatarSvg(seed: string | number, name?: string): string {
  const seedStr = String(seed)
  const colorPair = AVATAR_COLORS[hashSeed(seedStr) % AVATAR_COLORS.length]
  const initials = getInitials(name || seedStr)
  const label = name || seedStr

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="avatar">',
    `<rect width="96" height="96" rx="48" fill="${colorPair[0]}"/>`,
    `<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${colorPair[1]}" font-family="Arial, sans-serif" font-size="34" font-weight="700">${escapeXml(initials)}</text>`,
    `<title>${escapeXml(label)}</title>`,
    '</svg>'
  ].join('')
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
