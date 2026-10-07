import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QueryState } from './QueryState'

describe('QueryState', () => {
  it('mostra carregando', () => {
    render(<QueryState isLoading isError={false} onRetry={() => {}}>conteúdo</QueryState>)
    expect(screen.getByRole('status')).toHaveTextContent('Carregando...')
    expect(screen.queryByText('conteúdo')).not.toBeInTheDocument()
  })

  it('mostra erro e permite tentar de novo', () => {
    const onRetry = vi.fn()
    render(<QueryState isLoading={false} isError onRetry={onRetry}>conteúdo</QueryState>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renderiza os filhos quando está tudo certo', () => {
    render(<QueryState isLoading={false} isError={false} onRetry={() => {}}>conteúdo</QueryState>)
    expect(screen.getByText('conteúdo')).toBeInTheDocument()
  })
})
