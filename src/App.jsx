import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import CartView from './components/CartView/CartView';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './components/Checkout/Checkout';
import './app.css'

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={'Listado de productos'} />} />
            <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Listado de productos filtrados: '} />} />
            <Route path='/detail/:productId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<CartView />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>ERROR 404</h1>} />
          </Routes>
          <footer className="footer">Todos los derechos reservados por JBL LOVERS - Precios expresados en dolares americanos - No incluyen IVA</footer>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;



