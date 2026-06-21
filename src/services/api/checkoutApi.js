import axios from 'axios';
import apiBaseUrl from './apiBaseUrl';

const submitCheckout = async (userId, cartId) => {
  try {
    if (userId !== undefined && userId !== '' && userId !== null) {
      const body = {
        id_usuario: userId,
        id_carrinho: cartId,
      };

      const response = await axios.post(`${apiBaseUrl}/Checkout.php/insertPedido`, body);
      return response.data;
    }
  } catch (error) {
    console.log('Ocorreu um erro no envio do Usuario: ' + error);
    return [];
  }
};

export default submitCheckout;