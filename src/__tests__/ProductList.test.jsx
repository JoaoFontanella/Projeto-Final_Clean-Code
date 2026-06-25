import { render, screen } from '@testing-library/react'
import ProductList from '../components/ProductList'
import { FavoritesContext } from '../context/FavoritesContext'
import { MemoryRouter } from 'react-router-dom'

const products = [
  { id: 1, title: 'P1', image: '/i1.png', description: 'd1' },
  { id: 2, title: 'P2', image: '/i2.png', description: 'd2' },
]

test('renders product list', () => {
  const contextValue = { favoriteItems: [], addToFavorites: vi.fn(), removeFromFavorites: vi.fn() }
  render(
    <FavoritesContext.Provider value={contextValue}>
      <MemoryRouter>
        <ProductList products={products} onAddToCart={() => {}} />
      </MemoryRouter>
    </FavoritesContext.Provider>
  )
  expect(screen.getByText('P1')).toBeInTheDocument()
  expect(screen.getByText('P2')).toBeInTheDocument()
})
