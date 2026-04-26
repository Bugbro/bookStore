import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartPop from "./CartPop";
import CheckoutModal from "./CheckoutModal";
import LoginModal from "./LoginModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import { fetchBooks } from "../redux/features/book/bookSlice";
import { getUserOrders } from "../redux/features/order/orderSlice";
import { toggleWishlist } from "../redux/features/wishlist/wishlistSlice";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showWishlistPop, setShowWishlistPop] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main'); // 'main', 'orders', 'wishlist', 'track_order'
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const { recentOrders, loading: orderLoading } = useSelector((state) => state.order);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "all";
  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const wishlistRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlistPop(false);
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

  const handleMyOrdersClick = (e) => {
    e.stopPropagation();
    setActiveMenu('orders');
    if (!recentOrders || recentOrders.length === 0) {
      dispatch(getUserOrders());
    }
    console.log(recentOrders);

  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishlistContent = (
    <div className="overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-2">
      {wishlistItems.length > 0 ? (
        wishlistItems.map((id) => {
          const item = books?.data?.find(b => b._id === id);
          if (!item) return null;
          return (
            <div key={id} className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-2 group cursor-pointer" onClick={() => { setShowWishlistPop(false); navigate(`/products/${id}`); }}>
              <img src={item.images?.[0] || assets.dummyImg} alt={item.title} className="w-12 h-16 object-cover rounded-md shadow-sm" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[#17BD8D] transition-colors">{item.title}</h3>
                <p className="text-sm font-bold text-[#17BD8D] mt-1">${item.sellingPrice}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(id)); }}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">Your wishlist is empty.</p>
      )}
    </div>
  );

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
              <div
                className="relative group cursor-pointer"
                onMouseLeave={() => setActiveMenu('main')}
              >
                <div className="flex items-center gap-2 text-[#17BD8D]">
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#17BD8D] text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm hidden lg:block">{user.name.split(' ')[0]}</span>
                </div>
                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-8 pt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                  <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                    {activeMenu === 'orders' ? (
                      <div className="p-4 flex flex-col h-full max-h-96">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-2">
                          <button onClick={(e) => { e.stopPropagation(); setActiveMenu('main'); }} className="text-gray-500 hover:text-black transition-colors">
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <h2 className="text-lg font-semibold">Your Order</h2>
                        </div>

                        <div className="overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-2">
                          {orderLoading ? (
                            <p className="text-sm text-gray-500 text-center py-4">Loading orders...</p>
                          ) : recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                              <div
                                key={order._id}
                                className="flex flex-col gap-2 border border-gray-200 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition"
                              >
                                {/*  Top Row */}
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex-1">
                                    <p className="text-xs text-gray-500 font-semibold mb-0.5">
                                      Order #{order._id.slice(-6)}
                                    </p>
                                    <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight" title={order.items?.[0]?.bookId?.title || "Book Item"}>
                                      {order.items?.[0]?.bookId?.title || "Book Item"}
                                    </p>
                                  </div>

                                  <div className="flex flex-col gap-1.5 items-end shrink-0">

                                    {/*  Payment */}
                                    <div className="flex items-center gap-2 text-xs font-medium w-[90px]">
                                      <i className="fa-solid fa-wallet text-indigo-500 w-4 text-center"></i>
                                      <span className="text-indigo-500 capitalize truncate flex-1" title={order.paymentMethod}>
                                        {order.paymentMethod}
                                      </span>
                                    </div>


                                    {/*  Status */}
                                    <div className="flex items-center gap-2 text-xs font-medium w-[90px]">
                                      {order.status === "delivered" ? (
                                        <>
                                          <i className="fa-solid fa-circle-check text-green-600 w-4 text-center"></i>
                                          <span className="text-green-600 capitalize truncate flex-1" title={order.status}>
                                            {order.status}
                                          </span>
                                        </>
                                      ) : order.status === "pending" ? (
                                        <>
                                          <i className="fa-solid fa-clock text-orange-500 w-4 text-center"></i>
                                          <span className="text-orange-500 capitalize truncate flex-1" title={order.status}>
                                            {order.status}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <i className="fa-solid fa-truck text-blue-500 w-4 text-center"></i>
                                          <span className="text-blue-500 capitalize truncate flex-1" title={order.status}>
                                            {order.status}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>


                                </div>



                                {/*  Price + Date */}
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Rs. {order.totalAmount}</span>
                                  <span>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </span>
                                </div>

                                {/*  Items */}
                                {order.items?.length > 0 && (
                                  <div className="text-xs text-gray-600">
                                    {order.items.length}{" "}
                                    {order.items.length === 1 ? "item" : "items"}
                                  </div>
                                )}

                                {/* Track Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTrackingOrder(order);
                                    setActiveMenu('track_order');
                                  }}
                                  className="mt-2 w-full bg-black text-white text-xs py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                  <i className="fa-solid fa-location-dot mr-1"></i>
                                  Track Order
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No orders found.</p>
                          )}
                        </div>
                      </div>
                    ) : activeMenu === 'track_order' && selectedTrackingOrder ? (
                      <div className="p-4 flex flex-col h-full max-h-96">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
                          <button onClick={(e) => { e.stopPropagation(); setActiveMenu('orders'); }} className="text-gray-500 hover:text-black transition-colors">
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <h2 className="text-lg font-semibold">Track Order</h2>
                        </div>

                        <div className="overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 font-semibold mb-1">Order #{selectedTrackingOrder._id.slice(-6)}</p>
                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{selectedTrackingOrder.items?.[0]?.bookId?.title || "Book Item"}</p>
                          </div>

                          {/* Stepper */}
                          <div className="px-2">
                            {["pending", "processing", "shipped", "delivered"].map((stage, index) => {
                              const currentStageIndex = ["pending", "processing", "shipped", "delivered"].indexOf(selectedTrackingOrder.status);
                              const isCompleted = index <= currentStageIndex;
                              const isLast = index === 3;
                              return (
                                <div key={stage} className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${isCompleted ? 'bg-[#17BD8D] text-white' : 'bg-gray-200 text-gray-400'}`}>
                                      {isCompleted ? <i className="fa-solid fa-check"></i> : index + 1}
                                    </div>
                                    {!isLast && <div className={`w-0.5 h-8 ${index < currentStageIndex ? 'bg-[#17BD8D]' : 'bg-gray-200'}`}></div>}
                                  </div>
                                  <div className="pb-8 pt-0.5">
                                    <p className={`text-sm font-semibold capitalize ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>{stage}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Address */}
                          {selectedTrackingOrder.deliveryAddress && (
                            <div className="border-t border-gray-100 pt-4 mt-2 mb-2">
                              <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Delivery Details</h3>
                              <div className="bg-white border border-gray-100 rounded-lg p-3 text-sm text-gray-700">
                                <p className="font-bold text-gray-800 mb-1">{selectedTrackingOrder.deliveryAddress.name}</p>
                                <p className="text-xs mb-0.5">{selectedTrackingOrder.deliveryAddress.street}</p>
                                <p className="text-xs mb-0.5">{selectedTrackingOrder.deliveryAddress.city}, {selectedTrackingOrder.deliveryAddress.state} {selectedTrackingOrder.deliveryAddress.pincode}</p>
                                <p className="text-xs mt-1 text-gray-500"><i className="fa-solid fa-phone mr-1"></i> {selectedTrackingOrder.deliveryAddress.phone}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : activeMenu === 'wishlist' ? (
                      <div className="p-4 flex flex-col h-full max-h-96">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-2">
                          <button onClick={(e) => { e.stopPropagation(); setActiveMenu('main'); }} className="text-gray-500 hover:text-black transition-colors">
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <h2 className="text-lg font-semibold">Your Wishlist</h2>
                        </div>
                        {wishlistContent}
                      </div>
                    ) : (
                      <>
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-1">
                          <p className="font-bold text-gray-800 break-words">{user.name}</p>
                          <p className="text-xs text-gray-500 break-words">{user.email}</p>
                          {user.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
                        </div>
                        <ul className="py-2 text-sm text-gray-700">
                          <li onClick={handleMyOrdersClick} className="px-4 py-2 hover:bg-gray-50 hover:text-[#17BD8D] flex items-center gap-3 cursor-pointer">
                            <i className="fa-solid fa-bag-shopping w-4 text-center"></i> My Orders
                          </li>

                          <li
                            onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                            className="px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 border-t border-gray-100 mt-1 cursor-pointer"
                          >
                            <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center"></i> Logout
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsLoginModalOpen(true)} className="cursor-pointer hover:text-[#17BD8D] duration-150 relative top-1">
                <i className="fa-regular fa-user"></i>
              </div>
            )}

            <div className="relative" ref={wishlistRef}>
              <div
                onClick={() => {
                  if (user) {
                    setShowWishlistPop(!showWishlistPop);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="cursor-pointer hover:text-[#17BD8D] duration-150 relative top-1"
              >
                <i className="fa-regular fa-heart"></i>
              </div>

              {/* Wishlist Pop */}
              {showWishlistPop && (
                <div className="absolute right-0 top-10 w-80 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 flex flex-col h-full max-h-96">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-2">
                      <button onClick={(e) => { e.stopPropagation(); setShowWishlistPop(false); }} className="text-gray-500 hover:text-black transition-colors">
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <h2 className="text-lg font-semibold">Your Wishlist</h2>
                    </div>
                    {wishlistContent}
                  </div>
                </div>
              )}
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
            value={currentCategory}
            className="pl-2 pr-20 py-2 hover:white font-semibold bg-[#17BD8D] outline-none"
            onChange={(e) => {
              const category = e.target.value;
              if (category === "all") {
                navigate("/products");
              } else {
                navigate(`/products?category=${category}`);
              }
            }}
          >
            <option value="all">All </option>
            <option value="history">History </option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non Fiction</option>
            <option value="science">Science</option>
            <option value="biography">Biography</option>
            <option value="romantic">Romantic</option>
            <option value="horror">Horror</option>
            <option value="money">Money & Finance</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {/* links */}
        <div className="flex gap-6 text-sm font-bold text-[#0f8967]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/recommend">Recommend</Link>
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
