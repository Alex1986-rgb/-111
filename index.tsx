
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Точка входа в приложение
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Не удалось найти корневой элемент для монтирования приложения");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
