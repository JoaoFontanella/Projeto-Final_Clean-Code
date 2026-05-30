import React, { createContext, useState } from 'react';
import CartBD from '../components/CartBD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    const priceString = product.description.replace('R$', '').trim();
    const price = parseFloat(priceString.replace(',', '.'));

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        ...product,
        price: price,
        quantity: 1,
        image: product.image
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = async (productId) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja remover este item do carrinho?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EC747C',
      cancelButtonColor: '#EC747C',
    });

    if (!result.isConfirmed) return;

    const getSessionUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("id_usuario");
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    const getSessionCarrinho = async () => {
      try {
        const savedCarrinho = await AsyncStorage.getItem("id_carrinho");
        return savedCarrinho;
      } catch (error) {
        console.log(error);
      }
    };

    const handleQuery = async (id_carrinho) => {
      let obj = {
        id_carrinho: id_carrinho,
        productId: productId
      };

      const postData = await CartBD(2, '', obj, '');
      if (postData['error'] != null) {
        console.log(postData['error']);
      }
    };

    const sessionUser = await getSessionUser();
    const sessionCarrinho = await getSessionCarrinho();

    if (JSON.parse(sessionUser) > 0 && productId != 0 && JSON.parse(sessionCarrinho) != 0) {
      await handleQuery(sessionCarrinho);
    }

    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);

    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity > 0
    );
    setCartItems(filteredCartItems);
  };

  const clearCart = async () => {
    const result = await Swal.fire({
      title: 'Cuidado',
      text: 'Isso apagara todos os itens do carrinho, tem certeza que quer continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EC747C',
      cancelButtonColor: '#EC747C',
    });

    if (!result.isConfirmed) return;

    setCartItems([]);
    console.log('Carrinho limpo!');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

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
