import type { CSSProperties } from 'react'

// Estilos compartilhados dos tooltips: usam as variáveis de tema, então funcionam no claro e no escuro.
export const tooltipContentStyle: CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--text)',
}
export const tooltipItemStyle: CSSProperties = { color: 'var(--text)' }
export const tooltipLabelStyle: CSSProperties = { color: 'var(--muted)' }
