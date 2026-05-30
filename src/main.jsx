import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.setItem('favoriteItems', JSON.stringify([]));
AsyncStorage.setItem('id_usuario', 0);
AsyncStorage.setItem('id_carrinho', 0);

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
