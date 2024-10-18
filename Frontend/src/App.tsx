
import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutClient from "./layout/LayoutClient";
import Checkout from './pages/client/Checkout'
import Home from './pages/client/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/client/ProductDetail';
import Register from './pages/Register';
import Cart from './pages/client/Cart';
import Login from './pages/Login';
import PaymentMomo from './pages/client/PaymentMomo';
import Contact from './pages/client/Contact';
import AllProducts from './pages/client/AllProducts';
import Order from './pages/client/Order';


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
          <Route path="payment" element={<PaymentMomo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
