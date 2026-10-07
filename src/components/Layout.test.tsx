import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Layout } from './Layout'

const setup = () =>
  render(
    <MemoryRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<p>início</p>} />
          <Route path="/pedidos" element={<p>lista de pedidos</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('Layout', () => {
  it('tem link para pular direto ao conteúdo', () => {
    setup()
    expect(screen.getByRole('link', { name: 'Ir para o conteúdo' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo')
  })

  it('abre e fecha o menu pelo botão, refletindo aria-expanded', () => {
    setup()
    const open = screen.getByRole('button', { name: 'Abrir menu' })
    expect(open).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(open)
    const close = screen.getByRole('button', { name: 'Fechar menu' })
    expect(close).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(close)
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu com Esc e devolve o foco ao botão', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    const button = screen.getByRole('button', { name: 'Abrir menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('fecha o menu ao navegar por um link', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    fireEvent.click(screen.getByRole('link', { name: 'Pedidos' }))
    expect(screen.getByText('lista de pedidos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('o botão de tema descreve a ação e alterna', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /^Ativar tema/ }))
    const label = screen.getByRole('button', { name: /^Ativar tema/ }).getAttribute('aria-label')
    expect(['Ativar tema escuro', 'Ativar tema claro']).toContain(label)
  })
})
