
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Login from './pages/client/Login'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";
import Register from "./pages/Register";
import CartPage from './pages/client/CartPage'


function App() {
  return (
    <>

      <ToastContainer />
      <Routes>
        <Route path='/register'element= {<Register />}/>
        <Route path='/login'element= {<Login />}/>
      </Routes>
     

      <Routes>
        <Route path="/" element={<LayoutClient />} />
        <Route path="/cart" element={<CartPage />} />
        
      </Routes>
    </>
  );
}

export default App;
