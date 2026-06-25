import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../components/CartItem'

const item = { id: 1, title: 'C1', image: '/c1.png', price: 10, quantity: 2 }

test('renders cart item', () => {
  render(<CartItem item={item} onIncrease={() => {}} onDecrease={() => {}} onRemove={() => {}} />)
  expect(screen.getByText('C1')).toBeInTheDocument()
  expect(screen.getByText('R$ 10.00')).toBeInTheDocument()
})

test('chama os callbacks dos botoes', async () => {
  const user = userEvent.setup()
  const onIncrease = vi.fn()
  const onDecrease = vi.fn()
  const onRemove = vi.fn()

  render(<CartItem item={item} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />)

  const buttons = screen.getAllByRole('button')

  await user.click(buttons[0])
  await user.click(buttons[1])
  await user.click(buttons[2])

  expect(onDecrease).toHaveBeenCalledWith(1)
  expect(onIncrease).toHaveBeenCalledWith(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})
