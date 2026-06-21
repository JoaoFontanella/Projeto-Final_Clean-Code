import axios from 'axios';
import apiBaseUrl from './apiBaseUrl';

const fetchCategories = async (id) => {
  try {
    let response = '';

    if (id !== '') {
      response = await axios.get(`${apiBaseUrl}/Category.php/getCategory?id=${id}`);
      return response.data;
    }

    response = await axios.get(`${apiBaseUrl}/Category.php/getCategory`);
    return response.data;
  } catch (error) {
    console.error('Erro na procura das categorias:', error);
    return [];
  }
};

export default fetchCategories;