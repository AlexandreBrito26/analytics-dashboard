import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getCategories, getMetrics, getSeries } from '@/services/analytics'
import { StatCard } from '@/components/StatCard'
import { QueryState } from '@/components/QueryState'
import { usePageTitle } from '@/hooks/usePageTitle'
import { CategoryChart } from '@/features/dashboard/CategoryChart'
import { RevenueChart } from '@/features/dashboard/RevenueChart'
import { VisitsChart } from '@/features/dashboard/VisitsChart'
import { DEFAULT_RANGE, parseRange, RANGES } from '@/features/dashboard/range'
import styles from './Page.module.scss'

export default function Dashboard() {
  usePageTitle('Visão geral')

  // O período vive na URL (?range=14): o link é compartilhável e sobrevive ao F5.
  const [params, setParams] = useSearchParams()
  const range = parseRange(params.get('range'))
  const onRangeChange = (value: number) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === DEFAULT_RANGE) next.delete('range')
        else next.set('range', String(value))
        return next
      },
      { replace: true },
    )

  // keepPreviousData evita a tela "piscar" ao trocar o período.
  const keep = { placeholderData: keepPreviousData }
  const metrics = useQuery({ queryKey: ['metrics', range], queryFn: () => getMetrics(range), ...keep })
  const series = useQuery({ queryKey: ['series', range], queryFn: () => getSeries(range), ...keep })
  const categories = useQuery({ queryKey: ['categories', range], queryFn: () => getCategories(range), ...keep })

  return (
    <>
      <header className={styles.head}>
        <h1>Visão geral</h1>
        <label htmlFor="range" className="sr-only">
          Período
        </label>
        <select id="range" value={range} onChange={(e) => onRangeChange(Number(e.target.value))}>
          {RANGES.map((r) => (
            <option key={r} value={r}>
              Últimos {r} dias
            </option>
          ))}
        </select>
      </header>
      <section className={styles.grid}>
        <QueryState isLoading={metrics.isLoading} isError={metrics.isError} onRetry={() => metrics.refetch()}>
          {metrics.data?.map((m) => <StatCard key={m.label} {...m} />)}
        </QueryState>
      </section>
      <section className={styles.panel}>
        <h3>Receita</h3>
        <QueryState isLoading={series.isLoading} isError={series.isError} onRetry={() => series.refetch()}>
          {series.data && <RevenueChart data={series.data} />}
        </QueryState>
      </section>
      <div className={styles.row}>
        <section className={styles.panel}>
          <h3>Visitas</h3>
          <QueryState isLoading={series.isLoading} isError={series.isError} onRetry={() => series.refetch()}>
            {series.data && <VisitsChart data={series.data} />}
          </QueryState>
        </section>
        <section className={styles.panel}>
          <h3>Vendas por categoria</h3>
          <QueryState
            isLoading={categories.isLoading}
            isError={categories.isError}
            onRetry={() => categories.refetch()}
          >
            {categories.data && <CategoryChart data={categories.data} />}
          </QueryState>
        </section>
      </div>
    </>
  )
}
