import AsyncStorage from '@react-native-async-storage/async-storage';

const initialSessionValues = {
  favoriteItems: [],
  id_usuario: 0,
  id_carrinho: 0,
};

export const initializeSessionStorage = async () => {
  await Promise.all(
    Object.entries(initialSessionValues).map(([key, value]) =>
      AsyncStorage.setItem(key, JSON.stringify(value))
    )
  );
};