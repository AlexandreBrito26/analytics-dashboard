import { describe, expect, it } from 'vitest'
import { formatBRL, formatCompactBRL, formatCompactNumber } from './format'

describe('format', () => {
  it('formata BRL no padrão pt-BR', () => {
    expect(formatBRL(1234.5)).toMatch(/^R\$\s1\.234,50$/)
  })

  it('formata BRL compacto para eixos', () => {
    expect(formatCompactBRL(2500)).toMatch(/^R\$\s2,5\smil$/)
  })

  it('formata número compacto', () => {
    expect(formatCompactNumber(1200)).toMatch(/^1,2\smil$/)
    expect(formatCompactNumber(950)).toBe('950')
  })
})
