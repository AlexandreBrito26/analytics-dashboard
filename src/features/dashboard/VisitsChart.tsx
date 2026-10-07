import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DayPoint } from '@/services/analytics'
import { formatCompactNumber } from '@/utils/format'
import { tooltipContentStyle, tooltipItemStyle, tooltipLabelStyle } from './chartTheme'

export function VisitsChart({ data }: { data: DayPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" stroke="var(--muted)" minTickGap={24} />
        <YAxis stroke="var(--muted)" width={48} tickFormatter={formatCompactNumber} />
        <Tooltip
          cursor={{ fill: 'var(--border)', opacity: 0.4 }}
          contentStyle={tooltipContentStyle}
          itemStyle={tooltipItemStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(value) => Number(value).toLocaleString('pt-BR')}
        />
        <Bar dataKey="visitas" name="Visitas" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
