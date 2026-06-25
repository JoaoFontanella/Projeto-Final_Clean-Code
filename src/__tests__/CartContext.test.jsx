import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import CartProvider, { CartContext } from '../context/CartContext'

const TestComponent = () => {
  const { addToCart, getTotalItems } = useContext(CartContext)
  return (
    <div>
      <button onClick={() => addToCart({ id: 10, title: 'T', description: 'R$10' })}>add</button>
      <span data-testid="total">{getTotalItems()}</span>
    </div>
  )
}

test('CartContext addToCart increases total items', async () => {
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  )

  const btn = screen.getByText('add')
  btn.click()

  const total = await screen.findByTestId('total')
  expect(total.textContent).toBe('1')
})
