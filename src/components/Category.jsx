import axios from 'axios';

const getCategory = async (id) => {
  try {
    let response = '';

    if(id != ''){
      response = await axios.get('http://localhost:80/d-oliva-e-commerce/api/Category.php/getCategory?id='+id);
      return response.data;
    } else {
      response = await axios.get('http://localhost:80/d-oliva-e-commerce/api/Category.php/getCategory');
      return response.data;
    }
  } catch (error) {
    console.error('Erro na procura das categorias:', error);
    return [];
  }
};

export default getCategory;