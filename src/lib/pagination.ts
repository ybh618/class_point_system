export type PaginationMeta<T> = {
  items: T[]
  page: number
  per_page: number
  total: number
  pages: number
  has_prev: boolean
  has_next: boolean
  prev_num: number | null
  next_num: number | null
  iter_pages: () => Array<number | null>
}

export function createPagination<T>(items: T[], total: number, page: number, perPage: number): PaginationMeta<T> {
  const pages = Math.max(1, Math.ceil(total / perPage))
  const hasPrev = page > 1
  const hasNext = page < pages

  function iterPages() {
    const result: Array<number | null> = []
    const leftEdge = 2
    const leftCurrent = 2
    const rightCurrent = 2
    const rightEdge = 2
    let last = 0
    for (let num = 1; num <= pages; num++) {
      if (
        num <= leftEdge ||
        (num >= page - leftCurrent && num <= page + rightCurrent) ||
        num > pages - rightEdge
      ) {
        if (last + 1 !== num) {
          result.push(null)
        }
        result.push(num)
        last = num
      }
    }
    return result
  }

  return {
    items,
    page,
    per_page: perPage,
    total,
    pages,
    has_prev: hasPrev,
    has_next: hasNext,
    prev_num: hasPrev ? page - 1 : null,
    next_num: hasNext ? page + 1 : null,
    iter_pages: iterPages
  }
}
