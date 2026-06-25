import { renderHook, act } from '@testing-library/react'
import React, { useState } from 'react'
import useCartActions from '../hooks/useCartActions'
import Swal from 'sweetalert2'
import submitCart from '../services/api/cartApi'
import storageService from '../services/storage/storageService'

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn() },
}))

vi.mock('../services/api/cartApi', () => ({
  default: vi.fn(),
}))

vi.mock('../services/storage/storageService', () => ({
  default: { getItem: vi.fn() },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

const setup = () =>
  renderHook(() => {
    const [cartItems, setCartItems] = useState([])
    return useCartActions(cartItems, setCartItems)
  })

test('adiciona, incrementa e remove itens do carrinho', async () => {
  const { result } = setup()

  act(() => {
    result.current.addToCart({ id: 1, title: 'Produto', description: 'R$ 10,00', image: '/a.png' })
  })

  expect(result.current.getTotalItems()).toBe(1)

  act(() => {
    result.current.increaseQuantity(1)
  })

  expect(result.current.getTotalItems()).toBe(2)

  act(() => {
    result.current.decreaseQuantity(1)
  })

  expect(result.current.getTotalItems()).toBe(1)
})

test('removeFromCart chama api quando confirmado', async () => {
  const { result } = setup()

  Swal.fire.mockResolvedValueOnce({ isConfirmed: true })
  storageService.getItem
    .mockResolvedValueOnce(1)
    .mockResolvedValueOnce(2)

  act(() => {
    result.current.addToCart({ id: 1, title: 'Produto', description: 'R$ 10,00', image: '/a.png' })
  })

  await act(async () => {
    await result.current.removeFromCart(1)
  })

  expect(submitCart).toHaveBeenCalledWith(2, '', { id_carrinho: 2, productId: 1 }, '')
  expect(result.current.getTotalItems()).toBe(0)
})

test('clearCart limpa tudo quando confirmado', async () => {
  const { result } = setup()

  Swal.fire.mockResolvedValueOnce({ isConfirmed: true })

  act(() => {
    result.current.addToCart({ id: 1, title: 'Produto', description: 'R$ 10,00', image: '/a.png' })
  })

  await act(async () => {
    await result.current.clearCart()
  })

  expect(result.current.getTotalItems()).toBe(0)
})
