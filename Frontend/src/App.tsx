import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/client/Register'
import { ToastContainer } from 'react-toastify'
import Login from './pages/client/Login'

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/register'element= {<Register />}/>
        <Route path='/login'element= {<Login />}/>
      </Routes>
     
    </>
  )
}

export default App
