
import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import "./App.css";

import LayoutClient from "./layout/LayoutClient";
import CartPage from './pages/client/CartPage'
import Checkout from './pages/client/Checkout'
import Home from './pages/client/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/client/ProductDetail';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='/' element={<LayoutClient />} >
          <Route index element={<Home />} />
          <Route path='productdetail/:id/subcate/:idd' element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
