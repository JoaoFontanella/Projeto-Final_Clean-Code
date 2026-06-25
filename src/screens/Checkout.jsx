import React, { useState, useContext, useEffect } from 'react';
import '../styles/Checkout.css';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import submitCheckout from '../services/api/checkoutApi';
import storageService from '../services/storage/storageService';
import { useRef } from 'react';
import useFormValidation from '../hooks/useFormValidation';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [id_usuario, setUsuario] = useState('');
  const [id_carrinho, setCarrinho] = useState('');
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formRef = useRef(null);
  const { validateForm } = useFormValidation();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

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

    getSessionUser().then(res => {
      if(JSON.parse(res) == 0){
        navigate('/Login');
      } else {
        getSessionCarrinho().then(resCarrinho => {
          if(JSON.parse(resCarrinho) != 0){
            setUsuario(JSON.parse(res));
            setCarrinho(JSON.parse(resCarrinho));
          }
        })
      }
    });
  }, [navigate]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const allFieldsValid = validateForm(formRef);

    if (!allFieldsValid) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos de endereço corretamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      });
      return false;
    }

    return true;
  };

  const handleQuery = async () => {
    const postData = await submitCheckout(id_usuario, id_carrinho);

    if (postData['id_pedido'] != 0) {
      console.log('Pedido enviado:', {
        paymentMethod,
        selectedProducts: cartItems,
        cardDetails: paymentMethod === 'cartao' ? cardDetails : null,
      });

      Swal.fire({
        title: 'Sucesso!',
        text: 'Compra concluída com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      }).then(() => {
          clearCart();
          storageService.setItem('id_carrinho', 0);
          navigate('/');
        });
    } else {
      console.log(postData['error']);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateFields()) return;

    handleQuery();
  };

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <div className="billing-details" ref={formRef}>
          <h2>Detalhes de cobrança</h2>
          <label>Nome completo</label>
          <input name="name" placeholder="Nome Completo" type="text" required />
          <label>CEP</label>
          <input name="cep" placeholder="Digite seu CEP" type="text" required />
          <label>Nome da rua</label>
          <input name="rua" placeholder="Digite o nome da rua" type="text" required />
          <label>Apartamento, andar, etc.</label>
          <input name="local" placeholder="Complementos" type="text" required />
          <label>Ponto de referência</label>
          <input name="ref" placeholder="Ponto de referência" type="text" required />
          <label>Cidade</label>
          <input name="cidade" placeholder="Digite sua cidade" type="text" required />
          <label>Número de telefone</label>
          <input name="phone" placeholder="Digite seu telefone" type="tel" required />
          <label>Endereço de email</label>
          <input name="email" placeholder="nome@email.com.br" type="email" required />
        </div>

        <div className="order-summary">
          <h2>Resumo do Pedido</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="order-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <p>{item.title}</p>
                  <p>R$ {item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="price-details">
            <p>Subtotal: R$ {calculateTotalPrice()}</p>
            <p>Envio: Grátis</p>
            <p>Total: R$ {calculateTotalPrice()}</p>
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="cartao"
                checked={paymentMethod === 'cartao'}
                onChange={handlePaymentMethodChange}
              />
              Cartão
              <img
                className="payment-icons"
                src="../src/assets/Visa_Mastercard.png"
                alt="Cartões Aceitos"
              />
            </label>
            <label>
              <input
                type="radio"
                value="pagamentoEntrega"
                checked={paymentMethod === 'pagamentoEntrega'}
                onChange={handlePaymentMethodChange}
              />
              Pagamento na entrega
            </label>
          </div>

          {paymentMethod === 'cartao' && (
            <div className="card-details">
              <h3>Detalhes do Cartão</h3>
              <label>Número do Cartão</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="Digite o numero do c artão"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
              />
              <label>Nome no Cartão</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="Digite o nome do cartão"
                value={cardDetails.cardHolder}
                onChange={handleCardDetailsChange}
                required
              />
              <label>Data de Expiração</label>
              <input
                type="month"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                required
              />
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="000"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                maxLength="3"
                pattern="\\d{3}"
                required
              />
            </div>
          )}

          <button type="button" className="submit-order" onClick={handleSubmit}>
            Fazer pedido
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
