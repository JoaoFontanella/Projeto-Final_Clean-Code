import { useCallback } from 'react';
import submitCart from '../services/api/cartApi';
import storageService from '../services/storage/storageService';
import Swal from 'sweetalert2';
import { parsePriceFromDescription } from '../utils/priceUtils';

const useCartActions = (cartItems, setCartItems) => {
  const increaseQuantity = useCallback((id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  }, [setCartItems]);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, [setCartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      const price = parsePriceFromDescription(product.description);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      const newItem = { ...product, price, quantity: 1, image: product.image };
      return [...prev, newItem];
    });
  }, [setCartItems]);

  const removeFromCart = useCallback(async (productId) => {
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

    const sessionUser = await storageService.getItem('id_usuario');
    const sessionCarrinho = await storageService.getItem('id_carrinho');

    if (sessionUser > 0 && productId !== 0 && sessionCarrinho !== 0) {
      await submitCart(2, '', { id_carrinho: sessionCarrinho, productId }, '');
    }

    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, [setCartItems]);

  const clearCart = useCallback(async () => {
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
  }, [setCartItems]);

  const getTotalItems = useCallback(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);

  return {
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
  };
};

export default useCartActions;
