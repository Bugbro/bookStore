import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import CartPop from "./CartPop";
import CheckoutModal from "./CheckoutModal";
import LoginModal from "./LoginModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import { fetchBooks } from "../redux/features/book/bookSlice";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!books?.data) {
      dispatch(fetchBooks(""));
    }
  }, [dispatch, books?.data]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* top line */}
      <div className="px-28 py-3 bg-black text-white flex justify-between items-center w-full text-sm">
        <div className="flex items-center justify-between gap-6 ">
          <p>
            <i className="fa-solid fa-phone-volume"></i> +91 9816496136
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> bookstore@gmail.com
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 ">
          <i className="fa-brands fa-meta"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-codiepie"></i>
        </div>
      </div>

      {/* middle bar */}
      <div className="px-28 py-3 bg-white text-black flex justify-between items-center w-full border-b-[#17BD8D]/40 border-b">
        <div className="w-40">
          <img src={assets.logo} alt="logo" />
        </div>
        <div className="flex flex-1 items-center justify-end gap-6 ">
          {/* search fild */}
          <div className="w-1/2 relative group z-50" ref={searchRef}>
            <div className="bg-gray-100 pl-5 pr-1.5 py-1.5 rounded-full w-full flex items-center justify-between border border-transparent focus-within:border-[#17BD8D]/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-300">
              <input
                className="w-full outline-none font-medium px-2 py-2 bg-transparent text-gray-700 placeholder-gray-400"
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsSearchFocused(false);
                    navigate(searchTerm ? `/products?search=${searchTerm}` : "/products");
                  }
                }}
              />
              <button 
                onClick={() => { setIsSearchFocused(false); navigate(searchTerm ? `/products?search=${searchTerm}` : "/products"); }} 
                className="bg-[#17BD8D] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#15ae83] hover:shadow-md transition-all duration-200 shrink-0 group-hover:scale-105"
              >
                <i className="fas fa-search text-sm"></i>
              </button>
            </div>
            
            {/* Search Dropdown */}
            {isSearchFocused && searchTerm && books?.data && (
              <div className="absolute top-[110%] left-0 w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden max-h-80 overflow-y-auto">
                {books.data.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                    books.data.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5).map(book => (
                      <div key={book._id} onClick={() => { setIsSearchFocused(false); navigate(`/products/${book._id}`); }} className="flex items-center gap-3 p-3 hover:bg-green-50/50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors duration-150">
                        <img src={book.images[0]} alt={book.title} className="w-10 h-14 object-cover rounded-md shadow-sm border border-gray-100" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-gray-800 line-clamp-1">{book.title}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{book.author}</span>
                        </div>
                      </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-gray-500 bg-gray-50/50">
                        No books found for "{searchTerm}"
                    </div>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              className="flex gap-2 items-center  hover:text-[#17BD8D] duration-150"
            >
              <i className="fas fa-location"></i>
              <span className="border-b font-semibold text-sm">
                Find a book store
              </span>
            </a>
            
            {user ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2 text-[#17BD8D]">
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#17BD8D] text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm hidden lg:block">{user.name.split(' ')[0]}</span>
                </div>
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-8 pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-1">
                       <p className="font-bold text-gray-800 break-words">{user.name}</p>
                       <p className="text-xs text-gray-500 break-words">{user.email}</p>
                       {user.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-2 hover:bg-gray-50 hover:text-[#17BD8D] flex items-center gap-3">
                        <i className="fa-solid fa-bag-shopping w-4 text-center"></i> My Orders
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-50 hover:text-[#17BD8D] flex items-center gap-3">
                        <i className="fa-regular fa-heart w-4 text-center"></i> Wishlist
                      </li>
                      <li 
                        onClick={handleLogout}
                        className="px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 border-t border-gray-100 mt-1"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center"></i> Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsLoginModalOpen(true)} className="cursor-pointer hover:text-[#17BD8D] duration-150 relative top-1">
                <i className="fa-regular fa-user"></i>
              </div>
            )}

            <div className="relative top-1 cursor-pointer hover:text-[#17BD8D] duration-150">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="relative" ref={cartRef}>
              <i onClick={() => setShowCart(!showCart)} className="fa-solid fa-bag-shopping cursor-pointer"></i>
              <span onClick={() => setShowCart(!showCart)} className="absolute top-3 cursor-pointer -right-2 bg-[#17BD8D] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
              <CartPop
                isOpen={showCart}
                onCheckoutClick={() => {
                  setShowCart(false);
                  if (user) {
                    setIsCheckoutOpen(true);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* below bar */}
      <div className="px-28 py-3 flex items-center justify-between ">
        <div className="bg-[#17BD8D] text-white px-4 py-1 rounded-full">
          <i className="fa-solid fa-list-ul"></i>
          <select
            name="category"
            id=""
            className="pl-2 pr-20 py-2 hover:white font-semibold bg-[#17BD8D] outline-none"
          >
            <option value="Category">Category</option>
            <option value="History">History </option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
          </select>
        </div>

        {/* links */}
        <div className="flex gap-6 text-sm font-bold text-[#0f8967]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="flex items-center gap-4 ">
          <div className="text-[#17BD8D] bg-[#efefef] flex items-center p-3 rounded-full">
            <i className="fa-solid fa-phone-volume "></i>
          </div>
          <div>
            <p className="text-[#17BD8D] text-sm font-semibold">
              +91 9816496136
            </p>
            <p className="text-xs">24/7 Support Center</p>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
