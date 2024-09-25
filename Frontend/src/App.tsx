
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
import Cart from './pages/client/Cart';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<LayoutClient />} >
          <Route index element={<Home />} />
          <Route path='productdetail/:id/subcate/:idd' element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
