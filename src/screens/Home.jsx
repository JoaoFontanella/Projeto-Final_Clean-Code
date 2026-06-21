import { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import '../styles/Home.css';
import { CartContext } from '../context/CartContext';
import fetchProducts from '../services/api/productsApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  const itemsPerPage = 24;

  useEffect(() => {
    const getSessionUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("id_usuario");
        return savedUser;
      } catch (error) {
        console.log(error);
      }
    };

    getSessionUser().then(res => {
      if (JSON.parse(res) > 0) {
        setMessage("Bem-vindo!");
        setTimeout(() => setMessage(''), 1000);
      }
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const productData = await fetchProducts('', searchQuery);
      setProducts(productData);
      setCurrentPage(1);
    };

    loadProducts();
  }, [searchQuery]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div id="root">
      <Header onSearch={handleSearch} />
      <br /><br />

      {!searchQuery && (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="../src/assets/Banner_1.png" className="d-block w-100" alt="Promoção 1" />
            </div>
            <div className="carousel-item">
              <img src="../src/assets/Banner_2.png" className="d-block w-100" alt="Promoção 2" />
            </div>
            <div className="carousel-item">
              <img src="../src/assets/Banner_3.png" className="d-block w-100" alt="Promoção 3" />
              <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="1000"></div>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
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
          <p className="no-favorites-message">Nenhum produto encontrado.</p>
        )}
      </main>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Home;