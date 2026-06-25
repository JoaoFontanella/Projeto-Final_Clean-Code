import React, { useEffect, useContext } from 'react';
import '../styles/Cart.css';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import submitCart from '../services/api/cartApi';
import storageService from '../services/storage/storageService';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const getSessionUser = async () => {
      try {
        const savedUser = await storageService.getItem('id_usuario');
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    const getSessionCarrinho = async () => {
      try {
        const savedUser = await storageService.getItem('id_carrinho');
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    const handleQuery = async (id_usuario) => {
      const postData = await submitCart(1, id_usuario, cartItems, totalPrice);
      console.log(postData);

      if (postData['error'] == null) {
        storageService.setItem('id_carrinho', postData['id_carrinho']);
      } else {
        console.log(postData['error']);
      }
    }

    getSessionUser().then(res => {
      getSessionCarrinho().then(resCarrinho => {
        if (JSON.parse(res) > 0 && cartItems.length != 0 && JSON.parse(resCarrinho) == 0) {
          console.log(res);
          setTimeout(() => handleQuery(res), 1000);
        }
      })
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="cart">
        {cartItems.length === 0 ? (
          <p className="no-cart-message">Carrinho vazio.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
            <p id="total">Total: R${totalPrice.toFixed(2)}</p>
            <div className="cart-buttons">
              <Link to="/">
                <button id="home">Voltar à loja</button>
              </Link>
              <Link>
                <button id="clean" onClick={clearCart}>
                  Limpar Carrinho
                </button>
              </Link>
              <Link to="/Checkout">
                <button id="chk" type="submit">
                  Finalizar Compra
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
