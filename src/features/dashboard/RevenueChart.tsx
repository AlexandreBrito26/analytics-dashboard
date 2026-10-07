import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DayPoint } from '@/services/analytics'
import { formatBRL, formatCompactBRL } from '@/utils/format'
import { tooltipContentStyle, tooltipItemStyle, tooltipLabelStyle } from './chartTheme'

export function RevenueChart({ data }: { data: DayPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} accessibilityLayer>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="day" stroke="var(--muted)" minTickGap={24} />
        <YAxis stroke="var(--muted)" width={80} tickFormatter={formatCompactBRL} />
        <Tooltip
          contentStyle={tooltipContentStyle}
          itemStyle={tooltipItemStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(value) => formatBRL(Number(value))}
        />
        <Area type="monotone" dataKey="receita" name="Receita" stroke="var(--primary)" fill="url(#rev)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
