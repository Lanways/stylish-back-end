export const getOffset = (limit: number, page: number) => {
  return (page - 1) * limit
}

export interface Pagination {
  pages: number[];
  totalPage: number;
  currentPage: number;
  prev: number;
  next: number;
}

export const getPagination = (limit: number = 10, page: number = 1, total: number = 50): Pagination => {
  const totalPage = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1)
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1
  return {
    pages,
    totalPage,
    currentPage,
    prev,
    next
  }
}