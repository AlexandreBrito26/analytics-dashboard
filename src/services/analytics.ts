export interface Metric { label: string; value: number; delta: number; prefix?: string }
export interface DayPoint { day: string; visitas: number; receita: number }
export interface Order { id: string; cliente: string; valor: number; status: 'pago' | 'pendente' | 'cancelado' }

const wait = <T,>(data: T, ms = 500) => new Promise<T>((r) => setTimeout(() => r(data), ms))
const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

// Troque por fetch() numa API real quando tiver backend.
export const getMetrics = () => wait<Metric[]>([
  { label: 'Receita', value: 48250, delta: 12.4, prefix: 'R$ ' },
  { label: 'Visitas', value: 18420, delta: 5.1 },
  { label: 'Conversão (%)', value: 3.8, delta: -0.6 },
  { label: 'Pedidos', value: 702, delta: 8.9 },
])

export const getSeries = (range: number) =>
  wait<DayPoint[]>(days.map((day, i) => ({
    day,
    visitas: Math.round((900 + Math.sin(i + range) * 400 + i * 120) * (range / 7)),
    receita: Math.round((1800 + Math.cos(i + range) * 700 + i * 200) * (range / 7)),
  })))

export const getOrders = () => wait<Order[]>([
  { id: '#1042', cliente: 'Ana Souza', valor: 320, status: 'pago' },
  { id: '#1041', cliente: 'Bruno Lima', valor: 149.9, status: 'pendente' },
  { id: '#1040', cliente: 'Carla Dias', valor: 89, status: 'cancelado' },
  { id: '#1039', cliente: 'Diego Alves', valor: 560, status: 'pago' },
  { id: '#1038', cliente: 'Elisa Nunes', valor: 215.5, status: 'pago' },
])
