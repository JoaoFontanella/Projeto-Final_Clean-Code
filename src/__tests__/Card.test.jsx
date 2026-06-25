import { render, screen } from '@testing-library/react'
import Card from '../components/Card'
import { FavoritesContext } from '../context/FavoritesContext'
import { MemoryRouter } from 'react-router-dom'

const product = { id: 1, title: 'Teste', image: '/img.png', description: 'desc' }

const renderWithContext = (ui) => {
  const contextValue = { favoriteItems: [], addToFavorites: vi.fn(), removeFromFavorites: vi.fn() }
  return render(
    <FavoritesContext.Provider value={contextValue}>
      <MemoryRouter>{ui}</MemoryRouter>
    </FavoritesContext.Provider>
  )
}

test('renders card with title and image', () => {
  renderWithContext(<Card id={product.id} image={product.image} title={product.title} description={product.description} addToCart={() => {}} product={product} />)
  expect(screen.getByText('Teste')).toBeInTheDocument()
  expect(screen.getByAltText('Teste')).toBeInTheDocument()
})
