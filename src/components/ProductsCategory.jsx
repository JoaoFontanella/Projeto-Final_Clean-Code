import axios from 'axios';

const ProductsCategory = async (id) => {
  try {
    const response = await axios.get('http://localhost:80/Projeto-Final_Clean-Code/api/Product.php/getCategoryProdutos?id='+id);
    return response.data;
  } catch (error) {
    console.error('Erro na procura dos produtos nesta categoria:', error);
    return [];
  }
};

export default ProductsCategory;