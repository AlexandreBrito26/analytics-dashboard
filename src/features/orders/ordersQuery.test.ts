import { describe, expect, it } from 'vitest'
import type { Order } from '@/services/analytics'
import { filterOrders, paginate, sortOrders } from './ordersQuery'

const orders: Order[] = [
  { id: '#1002', cliente: 'João Pereira', valor: 50, status: 'pago', data: '2026-10-02' },
  { id: '#1010', cliente: 'Ana Souza', valor: 300, status: 'pendente', data: '2026-10-04' },
  { id: '#999', cliente: 'Bruno Lima', valor: 120, status: 'cancelado', data: '2026-10-01' },
]

describe('filterOrders', () => {
  it('busca ignorando acentos e maiúsculas', () => {
    expect(filterOrders(orders, 'joao', 'todos').map((o) => o.id)).toEqual(['#1002'])
    expect(filterOrders(orders, 'ANA', 'todos').map((o) => o.id)).toEqual(['#1010'])
  })
  it('busca pelo ID', () => {
    expect(filterOrders(orders, '1010', 'todos')).toHaveLength(1)
  })
  it('filtra por status e combina com a busca', () => {
    expect(filterOrders(orders, '', 'cancelado').map((o) => o.id)).toEqual(['#999'])
    expect(filterOrders(orders, 'ana', 'cancelado')).toHaveLength(0)
  })
})

describe('sortOrders', () => {
  it('ordena ID numericamente, não como texto', () => {
    expect(sortOrders(orders, 'id', 'asc').map((o) => o.id)).toEqual(['#999', '#1002', '#1010'])
  })
  it('ordena por valor desc e não altera o array original', () => {
    const sorted = sortOrders(orders, 'valor', 'desc')
    expect(sorted.map((o) => o.valor)).toEqual([300, 120, 50])
    expect(orders[0].id).toBe('#1002')
  })
  it('ordena por cliente e por data', () => {
    expect(sortOrders(orders, 'cliente', 'asc')[0].cliente).toBe('Ana Souza')
    expect(sortOrders(orders, 'data', 'desc')[0].data).toBe('2026-10-04')
  })
})

describe('paginate', () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1)
  it('divide em páginas', () => {
    const p = paginate(items, 2, 4)
    expect(p.items).toEqual([5, 6, 7, 8])
    expect(p).toMatchObject({ page: 2, totalPages: 3, from: 5, to: 8, total: 10 })
  })
  it('última página pode ser parcial', () => {
    expect(paginate(items, 3, 4)).toMatchObject({ items: [9, 10], from: 9, to: 10 })
  })
  it('limita páginas fora do intervalo', () => {
    expect(paginate(items, 99, 4).page).toBe(3)
    expect(paginate(items, -5, 4).page).toBe(1)
  })
  it('lista vazia tem 1 página e 0–0', () => {
    expect(paginate([], 1, 4)).toMatchObject({ items: [], totalPages: 1, from: 0, to: 0 })
  })
})
