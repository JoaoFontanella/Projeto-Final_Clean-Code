import axios from 'axios';

const CartBD = async (tipo, id_usuario, post, total) => {
  try {
    if (post != undefined && post != '' && post != null){
      let response = '';
      let obj = {}
  
      if(tipo == 1){
        obj = {
          id_usuario: id_usuario,
          post: post,
          total: total
        }

        response = await axios.post('http://localhost:80/Projeto-Final_Clean-Code/api/Cart.php/insertProducts', obj);
        return response.data;
      } else {
        response = await axios.post('http://localhost:80/Projeto-Final_Clean-Code/api/Cart.php/deleteProduct', post);
        return response.data;
      }
    }
  } catch (error) {
    console.log('Ocorreu um erro no envio do Usuario: '+error);
    return [];
  }
};

export default CartBD;