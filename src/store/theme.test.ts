import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    vi.resetModules()
  })

  it('usa o tema salvo no localStorage', async () => {
    localStorage.setItem('theme', 'dark')
    const { useTheme } = await import('./theme')
    expect(useTheme.getState().theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('toggle altera o tema e persiste a escolha', async () => {
    const { useTheme } = await import('./theme')
    expect(useTheme.getState().theme).toBe('light')
    useTheme.getState().toggle()
    expect(useTheme.getState().theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('ignora valor inválido salvo', async () => {
    localStorage.setItem('theme', 'azul')
    const { useTheme } = await import('./theme')
    expect(useTheme.getState().theme).toBe('light')
  })
})
