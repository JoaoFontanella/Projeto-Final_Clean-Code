import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../screens/Home';
import Checkout from '../../screens/Checkout';
import Login from '../../screens/Login';
import Criar_conta from '../../screens/Criar_conta';
import Cart from '../../screens/Cart';
import Favoritos from '../../screens/Favoritos';
import Categoria from '../../screens/Categoria';
import ProductDetail from '../../screens/ProductDetail';
import Perfil from '../../screens/Perfil';

const appRouter = createBrowserRouter([
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

const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRouter;