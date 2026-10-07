import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategorySlice } from '@/services/analytics'
import { formatBRL } from '@/utils/format'
import { tooltipContentStyle, tooltipItemStyle, tooltipLabelStyle } from './chartTheme'

const PALETTE_SIZE = 5

export function CategoryChart({ data }: { data: CategorySlice[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart accessibilityLayer>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2} stroke="var(--surface)">
          {data.map((slice, i) => (
            <Cell key={slice.name} fill={`var(--chart-${(i % PALETTE_SIZE) + 1})`} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipContentStyle}
          itemStyle={tooltipItemStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(value) => formatBRL(Number(value))}
        />
        <Legend formatter={(name) => <span style={{ color: 'var(--text)' }}>{name}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}
