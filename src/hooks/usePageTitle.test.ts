import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usePageTitle } from './usePageTitle'

describe('usePageTitle', () => {
  it('define o título do documento', () => {
    renderHook(() => usePageTitle('Pedidos'))
    expect(document.title).toBe('Pedidos · Analytics Dashboard')
  })
})
