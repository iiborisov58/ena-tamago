import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Получаем корневой элемент из index.html
const rootElement = document.getElementById('root');

// Создаём корень React для рендеринга приложения
const root = ReactDOM.createRoot(rootElement);

// Рендерим компонент App внутри корня
root.render(<App />);
