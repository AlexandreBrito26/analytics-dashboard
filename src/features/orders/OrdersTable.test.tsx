import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Order, OrderStatus } from '@/services/analytics'
import { OrdersTable } from './OrdersTable'

const make = (n: number, cliente: string, valor: number, status: OrderStatus): Order => ({
  id: `#${1000 + n}`, cliente, valor, status, data: `2026-10-0${n}`,
})

const orders: Order[] = [
  make(1, 'Ana Souza', 100, 'pago'),
  make(2, 'Bruno Lima', 500, 'pendente'),
  make(3, 'Carla Dias', 300, 'cancelado'),
]

const bodyRows = () => screen.getAllByRole('row').slice(1)

describe('OrdersTable', () => {
  it('mostra os pedidos, mais recentes primeiro, com badge de status', () => {
    render(<OrdersTable orders={orders} />)
    expect(bodyRows()[0]).toHaveTextContent('Carla Dias')
    expect(within(screen.getByRole('table')).getByText('Pendente')).toBeInTheDocument()
  })

  it('filtra pela busca e mostra estado vazio', () => {
    render(<OrdersTable orders={orders} />)
    const input = screen.getByLabelText('Buscar pedidos')
    fireEvent.change(input, { target: { value: 'bruno' } })
    expect(bodyRows()).toHaveLength(1)
    fireEvent.change(input, { target: { value: 'zzz' } })
    expect(screen.getByText('Nenhum pedido encontrado.')).toBeInTheDocument()
  })

  it('filtra por status', () => {
    render(<OrdersTable orders={orders} />)
    fireEvent.change(screen.getByLabelText('Filtrar por status'), { target: { value: 'pago' } })
    expect(bodyRows()).toHaveLength(1)
    expect(bodyRows()[0]).toHaveTextContent('Ana Souza')
  })

  it('ordena ao clicar no cabeçalho e inverte no segundo clique', () => {
    render(<OrdersTable orders={orders} />)
    const valor = screen.getByRole('button', { name: 'Valor' })
    fireEvent.click(valor)
    expect(bodyRows()[0]).toHaveTextContent('Bruno Lima')
    expect(valor.closest('th')).toHaveAttribute('aria-sort', 'descending')
    fireEvent.click(valor)
    expect(bodyRows()[0]).toHaveTextContent('Ana Souza')
    expect(valor.closest('th')).toHaveAttribute('aria-sort', 'ascending')
  })

  it('pagina e desabilita os botões nas pontas', () => {
    render(<OrdersTable orders={orders} pageSize={2} />)
    expect(screen.getByText('Página 1 de 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }))
    expect(screen.getByText('Página 2 de 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled()
    expect(bodyRows()).toHaveLength(1)
  })

  it('volta para a página 1 ao buscar', () => {
    render(<OrdersTable orders={orders} pageSize={2} />)
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }))
    fireEvent.change(screen.getByLabelText('Buscar pedidos'), { target: { value: 'a' } })
    expect(screen.getByText(/Página 1 de/)).toBeInTheDocument()
  })
})
