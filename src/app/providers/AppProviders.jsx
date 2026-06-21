import CartProvider from '../../context/CartContext';
import FavoritesProvider from '../../context/FavoritesContext';

const AppProviders = ({ children }) => {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
};

export default AppProviders;