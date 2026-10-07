import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/services/analytics'
import { QueryState } from '@/components/QueryState'
import { usePageTitle } from '@/hooks/usePageTitle'
import { OrdersTable } from '@/features/orders/OrdersTable'
import styles from './Page.module.scss'

export default function Orders() {
  usePageTitle('Pedidos')
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['orders'], queryFn: getOrders })
  return (
    <>
      <header className={styles.head}><h1>Pedidos</h1></header>
      <section className={styles.panel}>
        <QueryState isLoading={isLoading} isError={isError} onRetry={() => refetch()}>
          {data && <OrdersTable orders={data} />}
        </QueryState>
      </section>
    </>
  )
}
