import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './screens/Home';
import Checkout from './screens/Checkout';
import Login from './screens/Login';
import Criar_conta from './screens/Criar_conta';
import Cart from './screens/Cart';
import Favoritos from './screens/Favoritos';
import CartProvider from './context/CartContext';
import FavoritesProvider from './context/FavoritesContext';
import Categoria from './screens/Categoria';
import ProductDetail from './screens/ProductDetail';
import Perfil from './screens/Perfil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Createaccount',
    element: <Criar_conta />,
  },
  {
    path: '/Cart',
    element: <Cart />,
  },
  {
    path: '/Checkout',
    element: <Checkout />,
  },
  {
    path: '/Favoritos',
    element: <Favoritos />,
  },
  {
    path: '/Categoria/:id',
    element: <Categoria />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/Perfil',
    element: <Perfil />,
  },
]);

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
