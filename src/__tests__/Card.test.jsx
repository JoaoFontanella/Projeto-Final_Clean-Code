import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '../components/Card'
import { FavoritesContext } from '../context/FavoritesContext'
import { MemoryRouter } from 'react-router-dom'
import storageService from '../services/storage/storageService'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

vi.mock('../services/storage/storageService', () => ({
  default: { getItem: vi.fn() },
}))

const product = { id: 1, title: 'Teste', image: '/img.png', description: 'desc' }

const renderWithContext = (ui, contextValue = {}) => {
  const defaultContext = { favoriteItems: [], addToFavorites: vi.fn(), removeFromFavorites: vi.fn() }
  return render(
    <FavoritesContext.Provider value={{ ...defaultContext, ...contextValue }}>
      <MemoryRouter>{ui}</MemoryRouter>
    </FavoritesContext.Provider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  storageService.getItem.mockResolvedValue([])
})

test('renders card with title and image', () => {
  renderWithContext(<Card id={product.id} image={product.image} title={product.title} description={product.description} addToCart={() => {}} product={product} />)
  expect(screen.getByText('Teste')).toBeInTheDocument()
  expect(screen.getByAltText('Teste')).toBeInTheDocument()
})

test('navega ao clicar no card', async () => {
  const user = userEvent.setup()
  renderWithContext(<Card id={product.id} image={product.image} title={product.title} description={product.description} addToCart={() => {}} product={product} />)

  await user.click(screen.getByText('Teste'))

  expect(navigateMock).toHaveBeenCalledWith('/product/1')
})

test('adiciona aos favoritos quando nao existe no storage', async () => {
  const user = userEvent.setup()
  const addToFavorites = vi.fn()

  renderWithContext(
    <Card id={product.id} image={product.image} title={product.title} description={product.description} addToCart={() => {}} product={product} />,
    { favoriteItems: [], addToFavorites }
  )

  await waitFor(() => expect(screen.getByAltText('Favoritos')).toBeInTheDocument())
  await user.click(screen.getAllByRole('button')[1])

  expect(addToFavorites).toHaveBeenCalledWith(product)
})

test('remove dos favoritos quando o item existe no storage', async () => {
  const user = userEvent.setup()
  const removeFromFavorites = vi.fn()
  storageService.getItem.mockResolvedValueOnce([{ id: 1 }])

  renderWithContext(
    <Card id={product.id} image={product.image} title={product.title} description={product.description} addToCart={() => {}} product={product} />,
    { favoriteItems: [], removeFromFavorites }
  )

  await waitFor(() => {
    expect(screen.getByRole('img', { name: 'Favoritos' })).toHaveAttribute(
      'src',
      expect.stringContaining('FavoritosSelecionado')
    )
  })
  await user.click(screen.getAllByRole('button')[1])

  expect(removeFromFavorites).toHaveBeenCalledWith(1)
})
