import axios from 'axios';

const getProducts = async (id = '', searchQuery = '') => {
  try {
    let url = 'http://localhost:80/d-oliva-e-commerce/api/Product.php/getProdutos';

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

export default getProducts;
