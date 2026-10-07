import { describe, expect, it } from 'vitest'
import { buildCategories, buildMetrics, buildSeries } from './analytics'

const today = new Date('2026-10-06T12:00:00')

describe('buildSeries', () => {
  it.each([7, 14, 30])('devolve exatamente %i pontos', (range) => {
    expect(buildSeries(range, today)).toHaveLength(range)
  })

  it('termina no dia atual', () => {
    const series = buildSeries(7, today)
    expect(series[series.length - 1].day).toBe('06/10')
    expect(series[0].day).toBe('30/09')
  })
})

describe('buildMetrics', () => {
  const get = (range: number, label: string) => buildMetrics(range, today).find((m) => m.label === label)!

  it('receita e visitas são a soma da série do período', () => {
    const series = buildSeries(14, today)
    expect(get(14, 'Receita').value).toBe(series.reduce((s, p) => s + p.receita, 0))
    expect(get(14, 'Visitas').value).toBe(series.reduce((s, p) => s + p.visitas, 0))
  })

  it('muda quando o período muda', () => {
    expect(get(30, 'Receita').value).toBeGreaterThan(get(7, 'Receita').value)
    expect(get(30, 'Pedidos').value).toBeGreaterThan(get(7, 'Pedidos').value)
  })

  it('conversão fica em uma faixa plausível', () => {
    const conv = get(7, 'Conversão (%)').value
    expect(conv).toBeGreaterThan(0)
    expect(conv).toBeLessThan(100)
  })
})

describe('buildCategories', () => {
  it.each([7, 14, 30])('a soma das categorias é igual à receita do período (%i dias)', (range) => {
    const total = buildCategories(range, today).reduce((s, c) => s + c.value, 0)
    const receita = buildMetrics(range, today).find((m) => m.label === 'Receita')!.value
    expect(total).toBe(receita)
  })

  it('tem 5 categorias com valores positivos', () => {
    const cats = buildCategories(7, today)
    expect(cats).toHaveLength(5)
    expect(cats.every((c) => c.value > 0)).toBe(true)
  })
})
