import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
