import React, { useState } from 'react';
import { assets } from '../assets/assets';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/features/auth/authSlice';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login Flow
        const res = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
        toast.success(res.data.message || 'Login successful!');
        dispatch(setCredentials(res.data.user));
        onClose(); // Close modal on success
      } else {
        // Register Flow
        const res = await api.post('/auth/register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        toast.success(res.data.message || 'Registration successful!');
        dispatch(setCredentials(res.data.user));
        onClose(); // Close modal on success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Left Side: Image */}
        <div className="hidden md:flex w-1/2 bg-[#f8f9fa] justify-center items-center p-8">
          <img src={assets.loginBg} alt="Login Background" className="w-full h-auto object-contain max-w-sm" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLogin ? "Please login to your account" : "Sign up to get started"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-[#17BD8D] focus:bg-white focus:outline-none transition-colors"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-[#17BD8D] focus:bg-white focus:outline-none transition-colors"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-[#17BD8D] focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-[#17BD8D] focus:bg-white focus:outline-none transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#17BD8D] focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-[#17BD8D] hover:underline font-medium">Forgot Password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full block bg-[#17BD8D] hover:bg-[#15ae83] text-white font-semibold rounded-lg px-4 py-3 mt-4 transition duration-200 shadow-md"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#17BD8D] font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Register here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
