import { useMemo, useState } from 'react'
import type { Order } from '@/services/analytics'
import { formatBRL } from '@/utils/format'
import { filterOrders, paginate, sortOrders, type SortDir, type SortKey, type StatusFilter } from './ordersQuery'
import { StatusBadge } from './StatusBadge'
import styles from './OrdersTable.module.scss'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'data', label: 'Data' },
  { key: 'valor', label: 'Valor' },
  { key: 'status', label: 'Status' },
]

const formatDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('pt-BR')

export function OrdersTable({ orders, pageSize = 8 }: { orders: Order[]; pageSize?: number }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('todos')
  const [sortKey, setSortKey] = useState<SortKey>('data')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)

  const view = useMemo(
    () => paginate(sortOrders(filterOrders(orders, search, status), sortKey, sortDir), page, pageSize),
    [orders, search, status, sortKey, sortDir, page, pageSize],
  )

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'valor' || key === 'data' ? 'desc' : 'asc')
    }
    setPage(1)
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Buscar por cliente ou ID"
          aria-label="Buscar pedidos"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
        <select
          aria-label="Filtrar por status"
          value={status}
          onChange={(e) => { setStatus(e.target.value as StatusFilter); setPage(1) }}
        >
          <option value="todos">Todos os status</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th
                key={c.key}
                scope="col"
                aria-sort={c.key === sortKey ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <button type="button" onClick={() => onSort(c.key)}>
                  {c.label}
                  <span aria-hidden="true" className={styles.arrow}>
                    {c.key === sortKey ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {view.items.length === 0 ? (
            <tr><td colSpan={COLUMNS.length} className={styles.empty}>Nenhum pedido encontrado.</td></tr>
          ) : (
            view.items.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.cliente}</td>
                <td>{formatDate(o.data)}</td>
                <td>{formatBRL(o.valor)}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <footer className={styles.footer}>
        <span>{view.from}–{view.to} de {view.total}</span>
        <div className={styles.pager}>
          <button type="button" disabled={view.page <= 1} onClick={() => setPage(view.page - 1)}>Anterior</button>
          <span>Página {view.page} de {view.totalPages}</span>
          <button type="button" disabled={view.page >= view.totalPages} onClick={() => setPage(view.page + 1)}>Próxima</button>
        </div>
      </footer>
    </div>
  )
}
