import axios from 'axios';
import apiBaseUrl from './apiBaseUrl';

const fetchProducts = async (id = '', searchQuery = '') => {
  try {
    let url = `${apiBaseUrl}/Product.php/getProdutos`;

    if (id !== '') {
      url += `?id=${id}`;
    } else if (searchQuery !== '') {
      url += `?search=${searchQuery}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro na procura dos produtos:', error);
    return [];
  }
};

export default fetchProducts;