import axios from 'axios';

const User = async (tipo, email, password) => {
  try {
    if (email != undefined && email != '' && email != null){
      let response = '';
      const obj = {
        email: email,
        password: password
      }
  
      if(tipo == 1){
        response = await axios.post('http://localhost:80/d-oliva-e-commerce/api/User.php/insertAccount', obj);
        return response.data;
      } else {
        response = await axios.post('http://localhost:80/d-oliva-e-commerce/api/User.php/loginAccount', obj);
        return response.data;
      }
    }
  } catch (error) {
    console.log('Ocorreu um erro no envio do Usuario: '+error);
    return [];
  }
};

export default User;