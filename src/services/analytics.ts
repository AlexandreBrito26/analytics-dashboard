export interface Metric { label: string; value: number; delta: number; prefix?: string }
export interface DayPoint { day: string; visitas: number; receita: number }
export interface CategorySlice { name: string; value: number }
export type OrderStatus = 'pago' | 'pendente' | 'cancelado'
export interface Order { id: string; cliente: string; valor: number; status: OrderStatus; data: string }

const wait = <T,>(data: T, ms = 500) => new Promise<T>((r) => setTimeout(() => r(data), ms))
const DAY_MS = 24 * 60 * 60 * 1000
const dayFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' })

/** Série diária com exatamente `range` pontos, terminando em `today`. */
export const buildSeries = (range: number, today: Date = new Date()): DayPoint[] =>
  Array.from({ length: range }, (_, i) => {
    const date = new Date(today.getTime() - (range - 1 - i) * DAY_MS)
    const weekday = i % 7
    return {
      day: dayFmt.format(date),
      visitas: Math.round(900 + Math.sin(i * 0.8) * 400 + weekday * 120),
      receita: Math.round(1800 + Math.cos(i * 0.8) * 700 + weekday * 200),
    }
  })

/** Métricas derivadas da mesma série, então sempre acompanham o período escolhido. */
export const buildMetrics = (range: number, today: Date = new Date()): Metric[] => {
  const series = buildSeries(range, today)
  const receita = series.reduce((sum, p) => sum + p.receita, 0)
  const visitas = series.reduce((sum, p) => sum + p.visitas, 0)
  const pedidos = Math.round(receita / 68.7)
  const conversao = visitas > 0 ? Math.round((pedidos / visitas) * 1000) / 10 : 0

  return [
    { label: 'Receita', value: receita, delta: 12.4, prefix: 'R$ ' },
    { label: 'Visitas', value: visitas, delta: 5.1 },
    { label: 'Conversão (%)', value: conversao, delta: -0.6 },
    { label: 'Pedidos', value: pedidos, delta: 8.9 },
  ]
}

const CATEGORY_SHARES: [string, number][] = [
  ['Eletrônicos', 0.34], ['Moda', 0.26], ['Casa', 0.2], ['Beleza', 0.12], ['Outros', 0.08],
]

/** Receita do período dividida por categoria; a última recebe o resto, então a soma bate exatamente. */
export const buildCategories = (range: number, today: Date = new Date()): CategorySlice[] => {
  const total = buildSeries(range, today).reduce((sum, p) => sum + p.receita, 0)
  let accumulated = 0
  return CATEGORY_SHARES.map(([name, share], i) => {
    const value = i === CATEGORY_SHARES.length - 1 ? total - accumulated : Math.round(total * share)
    accumulated += value
    return { name, value }
  })
}

// Troque por fetch() numa API real quando tiver backend.
export const getMetrics = (range = 7) => wait<Metric[]>(buildMetrics(range))

export const getSeries = (range = 7) => wait<DayPoint[]>(buildSeries(range))

export const getCategories = (range = 7) => wait<CategorySlice[]>(buildCategories(range), 400)

const ORDER_ROWS: [string, number, OrderStatus][] = [
  ['Ana Souza', 320, 'pago'], ['Bruno Lima', 149.9, 'pendente'], ['Carla Dias', 89, 'cancelado'],
  ['Diego Alves', 560, 'pago'], ['Elisa Nunes', 215.5, 'pago'], ['Felipe Rocha', 78.9, 'pendente'],
  ['Gabriela Melo', 430, 'pago'], ['Heitor Campos', 199.99, 'pago'], ['Isabela Prado', 645.3, 'pendente'],
  ['João Pereira', 52, 'cancelado'], ['Karina Freitas', 288, 'pago'], ['Lucas Barros', 119.5, 'pago'],
  ['Mariana Teixeira', 940, 'pago'], ['Nicolas Araújo', 64.9, 'pendente'], ['Olívia Cardoso', 372, 'pago'],
  ['Paulo Ribeiro', 180, 'cancelado'], ['Queila Monteiro', 515.75, 'pago'], ['Rafael Gomes', 99, 'pendente'],
  ['Sofia Martins', 260, 'pago'], ['Thiago Cunha', 730, 'pago'], ['Úrsula Vieira', 45.5, 'cancelado'],
  ['Vitor Nogueira', 389.9, 'pago'], ['Yasmin Duarte', 154, 'pendente'],
]

const BASE_DATE = Date.UTC(2026, 9, 5)

const buildOrders = (): Order[] =>
  ORDER_ROWS.map(([cliente, valor, status], i) => ({
    id: `#${1042 - i}`,
    cliente,
    valor,
    status,
    data: new Date(BASE_DATE - Math.floor(i / 2) * DAY_MS).toISOString().slice(0, 10),
  }))

export const getOrders = () => wait<Order[]>(buildOrders())
