import { React, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import ProductsCategory from "../components/ProductsCategory";
import "../styles/Categoria.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import { CartContext } from '../context/CartContext'; 
import ChatBot from '../components/ChatBot';

const Categoria = () => {  
  let { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  let nomeCategoria = '';

  if(products[0] != undefined){
    nomeCategoria = products[0].nome_categoria;
  }
  
  useEffect(() => {
    let loadProductsCategory = async () => {
      let productData = await ProductsCategory(id);
      setProducts(productData);
    };

    loadProductsCategory();
  }, [id]);

  const itemsPerPage = 24;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const filteredCategory = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const currentItems = filteredCategory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };


  return (
    <div className="rosto-container">
      <Header onSearch={handleSearch} />
      <h1 className="rosto-title">{nomeCategoria}</h1>
      <main className="rosto-main-content">
      {message && <div className="confirmation-message">{message}</div>}
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            addToCart={() => handleAddToCart(product)}
            product={product}
          />
          ))
        ) : (
          <p className="no-favorites-message">Nenhum produto cadastrado!</p>
        )}
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ChatBot/>
      <Footer />
    </div>
  );
};

export default Categoria;
