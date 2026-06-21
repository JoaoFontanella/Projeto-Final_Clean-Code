import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import { initializeSessionStorage } from './services/storage/sessionBootstrap';

void initializeSessionStorage();

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
