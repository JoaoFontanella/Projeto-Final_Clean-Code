import React, { useEffect, useState, useContext, useRef } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchCategories from '../services/api/categoriesApi';
import { CartContext } from '../context/CartContext';
import fetchProducts from '../services/api/productsApi';
import useSearchSuggestions from '../hooks/useSearchSuggestions';

const Header = ({ onSearch }) => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();
  const [categoriaItems, setCategory] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const {
    inputValue,
    setInputValue,
    suggestions,
    handleInputChange,
    handleKeyDown,
    setSuggestions,
  } = useSearchSuggestions(fetchProducts, (query) => onSearch(query));

  useEffect(() => {
    const loadCategory = async () => {
      const categoryData = await fetchCategories('');
      setCategory(categoryData);
    };

    loadCategory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="../src/assets/LOGO.png" alt="Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        {categoriaItems.map((categoria) => (
          <li key={categoria.id_categoria}>
            <Link to={categoria.link}>{categoria.nome}</Link>
          </li>
        ))}
      </ul>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar na lista..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="pink"
          className="bi bi-search search-icon"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`} onClick={() => setSuggestions([])}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="buttons_header">
        <Link to="/Favoritos" id="Fav">
          <button id="fav" className="favorito_button" type="submit">
            <img src="../src/assets/Favoritos.png" alt="Fav" />
          </button>
        </Link>

        <Link to="/Cart" id="Cart">
          <button id="cart" className="cart_button" type="submit">
            <img src="../src/assets/Cart.png" alt="Cart" />
          </button>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        <div className="user-dropdown" ref={dropdownRef}>
          <button
            id="user"
            className="user_button"
            type="button"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <img src="../src/assets/User.png" alt="User" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu-user">
              <Link to="/Login">Login</Link>
              <Link to="/Createaccount">Criar Conta</Link>
              {/* <Link to="/Perfil">Minha Conta</Link> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
