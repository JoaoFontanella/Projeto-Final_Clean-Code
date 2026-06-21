import axios from 'axios';
import apiBaseUrl from './apiBaseUrl';

const submitCart = async (type, userId, payload, total) => {
  try {
    if (payload !== undefined && payload !== '' && payload !== null) {
      let response = '';
      let body = {};

      if (type === 1) {
        body = {
          id_usuario: userId,
          post: payload,
          total,
        };

        response = await axios.post(`${apiBaseUrl}/Cart.php/insertProducts`, body);
        return response.data;
      }

      response = await axios.post(`${apiBaseUrl}/Cart.php/deleteProduct`, payload);
      return response.data;
    }
  } catch (error) {
    console.log('Ocorreu um erro no envio do Usuario: ' + error);
    return [];
  }
};

export default submitCart;