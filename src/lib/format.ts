import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/zh-cn.js'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return ''
  return dayjs(value).format('YYYY-MM-DD HH:mm')
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  return dayjs(value).format('YYYY-MM-DD')
}

export function fromNow(value: string | null | undefined): string {
  if (!value) return ''
  return dayjs(value).fromNow()
}
