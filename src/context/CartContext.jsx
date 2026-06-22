import React, { createContext, useState } from 'react';
import useCartActions from '../hooks/useCartActions';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const {
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
  } = useCartActions(cartItems, setCartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
