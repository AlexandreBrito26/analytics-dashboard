import type { Order, OrderStatus } from '@/services/analytics'

export type SortKey = 'id' | 'cliente' | 'data' | 'valor' | 'status'
export type SortDir = 'asc' | 'desc'
export type StatusFilter = OrderStatus | 'todos'

/** Minúsculas e sem acentos, para a busca ignorar "João" vs "joao". */
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function filterOrders(orders: Order[], search: string, status: StatusFilter): Order[] {
  const q = normalize(search)
  return orders.filter(
    (o) =>
      (status === 'todos' || o.status === status) &&
      (q === '' || normalize(o.cliente).includes(q) || normalize(o.id).includes(q)),
  )
}

const compare = (a: Order, b: Order, key: SortKey): number => {
  switch (key) {
    case 'valor': return a.valor - b.valor
    case 'data': return a.data.localeCompare(b.data)
    case 'id': return a.id.localeCompare(b.id, 'pt-BR', { numeric: true })
    default: return a[key].localeCompare(b[key], 'pt-BR')
  }
}

export function sortOrders(orders: Order[], key: SortKey, dir: SortDir): Order[] {
  const sign = dir === 'asc' ? 1 : -1
  return [...orders].sort((a, b) => sign * compare(a, b, key))
}

export interface Page<T> {
  items: T[]
  page: number
  totalPages: number
  total: number
  from: number
  to: number
}

export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    total: items.length,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
  }
}
