import clsx from 'clsx'
import type { OrderStatus } from '@/services/analytics'
import styles from './StatusBadge.module.scss'

const LABELS: Record<OrderStatus, string> = { pago: 'Pago', pendente: 'Pendente', cancelado: 'Cancelado' }

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={clsx(styles.badge, styles[status])}>{LABELS[status]}</span>
}
