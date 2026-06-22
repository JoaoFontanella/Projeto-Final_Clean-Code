import React, { createContext, useState } from 'react';
import storageService from '../services/storage/storageService';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  
  const addToFavorites = (product) => {
    const isAlreadyFavorite = favoriteItems.some((item) => item.id === product.id);

    if (!isAlreadyFavorite) {
      const newFavorites = [...favoriteItems, product];
      setFavoriteItems(newFavorites);
      storageService.setItem('favoriteItems', newFavorites);
    }
  };

  
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== productId);
    setFavoriteItems(updatedFavorites);
    storageService.setItem('favoriteItems', updatedFavorites);
  };


  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
