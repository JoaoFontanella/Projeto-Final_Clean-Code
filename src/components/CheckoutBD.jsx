import axios from 'axios';

const CheckoutBD = async (id_usuario, id_carrinho) => {
  try {
    if (id_usuario != undefined && id_usuario != '' && id_usuario != null){
      let response = '';
      let obj = {
          id_usuario: id_usuario,
          id_carrinho: id_carrinho
        }

      response = await axios.post('http://localhost:80/Projeto-Final_Clean-Code/api/Checkout.php/insertPedido', obj);
      return response.data;
    }
  } catch (error) {
    console.log('Ocorreu um erro no envio do Usuario: '+error);
    return [];
  }
};

export default CheckoutBD;