import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Footer from './components/Footer.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductDetails/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
