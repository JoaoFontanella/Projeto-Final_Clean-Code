import { React, useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetchProducts from '../services/api/productsApi';
import '../styles/ProductDetail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';
import ChatBot from '../components/ChatBot';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      const productData = await fetchProducts(id);
      setProduct(productData[0]);
    };

    loadProducts();
  }, []);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="product-not-found">
          <h2>Produto não encontrado</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail">
            <strong>Categoria:</strong><br />
            {product.descricao_produto}
          </p>
          <p className="product-detail">
            <strong>Ingredientes:</strong><br />
            {product.ingredientes}
          </p>

          <p className="product-detail">
            <strong>Peso:</strong><br />
            {product.gramas}g
          </p>
          <p className="product-detail">
            <strong>Categoria:</strong><br />
            {product.categoria}
          </p>

          <p className="product-detail-price">{product.description}</p>
          <Link to="/Cart">
            <button className="buy" onClick={handleAddToCart}>
              Comprar
            </button>
          </Link>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
          {message && <div className="confirmation-message">{message}</div>}
        </div>
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default ProductDetail;
