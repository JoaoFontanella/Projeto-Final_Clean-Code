import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkout from '../screens/Checkout'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const navigateMock = vi.fn()
const validateFormMock = vi.fn()
const submitCheckoutMock = vi.fn()
const swalFireMock = vi.fn()

vi.mock('../services/storage/storageService', () => ({
  default: {
    getItem: vi.fn(async (key) => {
      if (key === 'id_usuario') return 1
      if (key === 'id_carrinho') return 1
      return 0
    }),
    setItem: vi.fn(async () => null),
  },
}))

vi.mock('../services/api/checkoutApi', () => ({
  default: (...args) => submitCheckoutMock(...args),
}))

vi.mock('../services/api/categoriesApi', () => ({
  default: vi.fn(async () => []),
}))

vi.mock('../hooks/useFormValidation', () => ({
  default: () => ({ validateForm: validateFormMock }),
}))

vi.mock('sweetalert2', () => ({
  default: { fire: (...args) => swalFireMock(...args) },
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

beforeEach(() => {
  vi.clearAllMocks()
  validateFormMock.mockReturnValue(true)
  submitCheckoutMock.mockResolvedValue({ id_pedido: 1 })
  swalFireMock.mockResolvedValue({ isConfirmed: true })
  window.scrollTo = vi.fn()
})

const renderCheckout = () =>
  render(
    <MemoryRouter>
      <CartContext.Provider value={{ cartItems: [], clearCart: vi.fn(), getTotalItems: vi.fn(() => 0) }}>
        <Checkout />
      </CartContext.Provider>
    </MemoryRouter>
  )

test('renders checkout and button', () => {
  renderCheckout()

  expect(screen.getByText(/Fazer pedido/i)).toBeInTheDocument()
})

test('mostra erro quando validacao falha', async () => {
  const user = userEvent.setup()
  validateFormMock.mockReturnValue(false)

  renderCheckout()

  await user.click(screen.getByText(/Fazer pedido/i))

  expect(validateFormMock).toHaveBeenCalled()
  expect(swalFireMock).toHaveBeenCalledWith(expect.objectContaining({ title: 'Erro!' }))
  expect(submitCheckoutMock).not.toHaveBeenCalled()
})

test('faz pedido com sucesso e navega', async () => {
  const user = userEvent.setup()

  renderCheckout()

  await user.click(screen.getByText(/Fazer pedido/i))

  expect(submitCheckoutMock).toHaveBeenCalledWith(1, 1)
  expect(swalFireMock).toHaveBeenCalledWith(expect.objectContaining({ title: 'Sucesso!' }))
  expect(navigateMock).toHaveBeenCalledWith('/')
})

test('nao navega quando api retorna erro', async () => {
  const user = userEvent.setup()
  submitCheckoutMock.mockResolvedValueOnce({ error: 'falha', id_pedido: 0 })

  renderCheckout()

  await user.click(screen.getByText(/Fazer pedido/i))

  expect(navigateMock).not.toHaveBeenCalled()
})
