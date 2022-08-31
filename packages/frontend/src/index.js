import React from 'react';
import ReactDOM from 'react-dom/client';

import './Index.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>
);
