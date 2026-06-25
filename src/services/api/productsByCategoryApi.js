import axios from 'axios';
import apiBaseUrl from './apiBaseUrl';

const fetchProductsByCategory = async (id) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/Product.php/getCategoryProdutos?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Erro na procura dos produtos nesta categoria:', error);
    return [];
  }
};

export default fetchProductsByCategory;