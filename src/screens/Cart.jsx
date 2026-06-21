import React, { useEffect, useContext } from 'react';
import '../styles/Cart.css';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import submitCart from '../services/api/cartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const savedUser = await AsyncStorage.getItem("id_usuario");
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    const getSessionCarrinho = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("id_carrinho");
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    const handleQuery = async (id_usuario) => {
      const postData = await submitCart(1, id_usuario, cartItems, totalPrice);
      console.log(postData);

      if (postData['error'] == null) {
        AsyncStorage.setItem('id_carrinho', postData['id_carrinho']);
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
                <li key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-details">
                    <p className="product-title">{item.title}</p>
                  </div>
                  <p className="product-price">R$ {item.price.toFixed(2)}</p>
                  <div className="quantity-actions">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className="product-quantity">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </li>
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
