export type Student = {
  id: number
  student_id: string
  name: string
  class_name: string
  group_id: number | null
  created_at: string
}

export type PointsCategory = {
  id: number
  name: string
  description: string | null
  default_points: number
  is_active: number
}

export type Group = {
  id: number
  name: string
  description: string | null
  class_name: string
  color: string
  created_at: string
}

export type PointsRecord = {
  id: number
  student_id: number
  points: number
  reason: string | null
  category: string
  operator: string | null
  created_at: string
  student_name?: string
  student_number?: string
}

export type Pagination<T> = {
  items: T[]
  page: number
  per_page: number
  total: number
  pages: number
}

export type DashboardInfo = {
  total_students: number
  total_records: number
  today_records: number
  recent_records: PointsRecord[]
}

export type FlashState = {
  status?: 'success' | 'error'
  message?: string
}
