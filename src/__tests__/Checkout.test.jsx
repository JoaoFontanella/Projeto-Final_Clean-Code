import { render, screen } from '@testing-library/react'
import Checkout from '../screens/Checkout'
import { MemoryRouter } from 'react-router-dom'
import CartProvider from '../context/CartContext'

vi.mock('../services/storage/storageService', () => ({
  default: { getItem: vi.fn(async () => 0), setItem: vi.fn(async () => null) },
}))

vi.mock('../services/api/checkoutApi', () => ({
  default: vi.fn(async () => ({ id_pedido: 1 })),
}))

test('renders checkout and button', () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Checkout />
      </CartProvider>
    </MemoryRouter>
  )

  expect(screen.getByText(/Fazer pedido/i)).toBeInTheDocument()
})
