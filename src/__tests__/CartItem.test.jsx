import { render, screen } from '@testing-library/react'
import CartItem from '../components/CartItem'

const item = { id: 1, title: 'C1', image: '/c1.png', price: 10, quantity: 2 }

test('renders cart item', () => {
  render(<CartItem item={item} onIncrease={() => {}} onDecrease={() => {}} onRemove={() => {}} />)
  expect(screen.getByText('C1')).toBeInTheDocument()
  expect(screen.getByText('R$ 10.00')).toBeInTheDocument()
})
