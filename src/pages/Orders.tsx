import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/services/analytics'
import styles from './Page.module.scss'

export default function Orders() {
  const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: getOrders })
  return (
    <>
      <header className={styles.head}><h1>Pedidos</h1></header>
      <section className={styles.panel}>
        {isLoading ? <p>Carregando...</p> : (
          <table className={styles.table}>
            <thead><tr><th>ID</th><th>Cliente</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {data?.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{o.cliente}</td>
                  <td>{o.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}
