const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brlCompact = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1 })
const numberCompact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })

/** R$ 1.234,50 */
export const formatBRL = (v: number) => brl.format(v)
/** R$ 2,5 mil (para eixos de gráfico) */
export const formatCompactBRL = (v: number) => brlCompact.format(v)
/** 1,2 mil */
export const formatCompactNumber = (v: number) => numberCompact.format(v)
