import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // ✅ Import CookiesProvider
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider> {/* ✅ Wrap App with CookiesProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);
