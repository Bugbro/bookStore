import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMeThunk } from './redux/features/authSlice.js'
import { socket } from "./socket/socket.js";

// Views & Layouts
import { AdminLayout } from './components/AdminLayout'
import DashboardContent from './components/DashboardContent'
import { BooksList } from './components/BooksList'
import { Orders } from './components/Orders.jsx'
import { setActiveUsers } from './redux/features/Socket/socketSlice'

const App = () => {
  const dispatch = useDispatch()
  const { user, checked, loading } = useSelector(state => state.auth)


  useEffect(() => {
    socket.on("activeUsers", (count) => {
      console.log("Active users from backend:", count);
      dispatch(setActiveUsers(count));
    });
    return () => {
      socket.off("activeUsers");
    };
  }, []);

  useEffect(() => {
    dispatch(getMeThunk())
  }, [dispatch])

  if (!checked && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Auth Route */}
        <Route path='/auth' element={!user ? <Auth /> : <Navigate to="/dashboard" />} />

        {/* Protected Admin Routes */}
        <Route path='/' element={user ? <AdminLayout /> : <Navigate to="/auth" />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="books" element={<BooksList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<div className="p-4">Users List Content</div>} />
          <Route path="settings" element={<div className="p-4">Settings Page Content</div>} />
          <Route path="categories" element={<div className="p-4">Categories Content</div>} />
          <Route path="analytics" element={<div className="p-4">Analytics Content</div>} />
          <Route path="reviews" element={<div className="p-4">Reviews Content</div>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App;