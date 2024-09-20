
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";
import Register from "./pages/Register";
import CartPage from './pages/client/CartPage'
import Checkout from './pages/client/Checkout'

import ProductList from './pages/client/ProductsList'
import Home from './pages/client/Home'
import Cart from './pages/client/Cart'
import Login from './pages/Login'



function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Routes >
        <Route path='/' element={<LayoutClient />} >
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
