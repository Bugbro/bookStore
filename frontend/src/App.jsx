import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/features/auth/authSlice';
import { fetchUserCart } from './redux/features/cart/cartSlice.js';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Footer from './components/Footer.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recommend from './pages/Recommend.jsx';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    }
  }, [user, dispatch]);


  // Socket.io setup for tracking active users
  useEffect(() => {
    import('./socket/socket.js').then(({ socket }) => {
      // Listen for the connect event instead of logging immediately
      socket.on('connect', () => {
        console.log("Socket connected:", socket.id);
      });
      // Also log if it's already connected (just in case)
      if (socket.connected) {
        console.log("Socket connected immediately:", socket.id);
      }
    });
  }, []);


  return (
    <>
      <ToastContainer position='top-right' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
