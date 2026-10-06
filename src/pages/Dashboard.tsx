import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMetrics, getSeries } from '@/services/analytics'
import { StatCard } from '@/components/StatCard'
import { RevenueChart } from '@/features/dashboard/RevenueChart'
import styles from './Page.module.scss'

export default function Dashboard() {
  const [range, setRange] = useState(7)
  const metrics = useQuery({ queryKey: ['metrics'], queryFn: getMetrics })
  const series = useQuery({ queryKey: ['series', range], queryFn: () => getSeries(range) })

  return (
    <>
      <header className={styles.head}>
        <h1>Visão geral</h1>
        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={7}>Últimos 7 dias</option>
          <option value={14}>Últimos 14 dias</option>
          <option value={30}>Últimos 30 dias</option>
        </select>
      </header>
      <section className={styles.grid}>
        {metrics.isLoading ? <p>Carregando...</p> : metrics.data?.map((m) => <StatCard key={m.label} {...m} />)}
      </section>
      <section className={styles.panel}>
        <h3>Receita</h3>
        {series.isLoading ? <p>Carregando...</p> : series.data && <RevenueChart data={series.data} />}
      </section>
    </>
  )
}
