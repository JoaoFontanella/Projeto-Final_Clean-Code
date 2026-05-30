import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  
  const addToFavorites = (product) => {
    const isAlreadyFavorite = favoriteItems.some((item) => item.id === product.id);

    if (!isAlreadyFavorite) {
      setFavoriteItems([...favoriteItems, product]);

      const getSessionFavorite = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("favoriteItems");
          return savedUser;
        } catch (error) {
          console.log(error);
        }
      };

      getSessionFavorite().then(res => {
        AsyncStorage.setItem('favoriteItems', JSON.stringify([...favoriteItems, product]));
      });
    }
  };

  
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== productId);
    setFavoriteItems(updatedFavorites);
    AsyncStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
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
