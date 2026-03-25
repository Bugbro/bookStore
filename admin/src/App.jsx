import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMeThunk } from './redux/features/authSlice'

const App = () => {
  const dispatch = useDispatch()
  const { user, checked, loading } = useSelector(state => state.auth)

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
        <Route path='/' element={user ? <Navigate to="/dashboard" /> : <Auth />} />
        <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App