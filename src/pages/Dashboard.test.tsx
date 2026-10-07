import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'

// Promises que nunca resolvem: o teste foca no filtro/URL, não nos gráficos.
vi.mock('@/services/analytics', () => ({
  getMetrics: () => new Promise(() => {}),
  getSeries: () => new Promise(() => {}),
  getCategories: () => new Promise(() => {}),
}))

const renderAt = (url: string) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={[url]}>
        <Dashboard />
      </MemoryRouter>
    </QueryClientProvider>,
  )

describe('Dashboard — período na URL', () => {
  it('lê o período de ?range=', () => {
    renderAt('/?range=14')
    expect(screen.getByLabelText('Período')).toHaveValue('14')
  })

  it('usa 7 dias quando o valor é inválido ou ausente', () => {
    renderAt('/?range=99')
    expect(screen.getByLabelText('Período')).toHaveValue('7')
  })

  it('atualiza o seletor ao escolher outro período', () => {
    renderAt('/')
    const select = screen.getByLabelText('Período')
    fireEvent.change(select, { target: { value: '30' } })
    expect(select).toHaveValue('30')
  })
})
