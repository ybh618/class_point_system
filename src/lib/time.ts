import dayjs from 'dayjs'

const STRFTIME_MAP: Record<string, string> = {
  '%Y': 'YYYY',
  '%m': 'MM',
  '%d': 'DD',
  '%H': 'HH',
  '%M': 'mm',
  '%S': 'ss'
}

function convertPattern(pattern: string): string {
  return pattern.replace(/%[YmdHMS]/g, (token) => STRFTIME_MAP[token] ?? token)
}

export type DateHelper = {
  raw: string | null
  strftime: (pattern: string) => string
}

export function makeDateHelper(value: string | null): DateHelper {
  return {
    raw: value,
    strftime: (pattern: string) => {
      if (!value) return ''
      const converted = convertPattern(pattern)
      return dayjs(value).format(converted)
    }
  }
}

export function getWeekStartIso(): string {
  const now = new Date()
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0))
  const day = date.getUTCDay() // 0-6, Sun=0
  const diff = day === 0 ? 6 : day - 1
  date.setUTCDate(date.getUTCDate() - diff)
  return date.toISOString()
}

export function toStartOfDayIso(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0))
  return d.toISOString()
}

export function toEndOfDayIso(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59))
  return d.toISOString()
}
