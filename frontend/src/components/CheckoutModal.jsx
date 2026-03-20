import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "../redux/features/cart/cartSlice";

const CheckoutModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[90%] md:w-[80%] max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition-colors duration-200 text-gray-600 font-bold"
        >
          &times;
        </button>

        {/* Left Side: Order Summary */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col border-r border-gray-200">
          <div className="p-6 md:p-8 flex-1 overflow-y-auto hide-scrollbar">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
              Order Summary
            </h2>
            
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <i className="fa-solid fa-cart-shopping text-4xl mb-3 text-gray-300"></i>
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-1 mb-1">
                        <button
                          onClick={() => dispatch(decreaseQty(item._id))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQty(item._id))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[#17BD8D] font-bold mt-1">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Subtotal Section */}
          <div className="p-6 md:p-8 bg-gray-100 border-t border-gray-200">
            <div className="flex justify-between items-center text-lg font-bold text-gray-800">
              <span>Total to Pay:</span>
              <span className="text-[#17BD8D] text-2xl">Rs. {subTotal}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Shipping Details */}
        <div className="w-full md:w-1/2 bg-white flex flex-col h-full overflow-y-auto">
          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
              Shipping & Payment
            </h2>
            
            <form className="flex flex-col gap-5 flex-1" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Delivery Address</label>
                <textarea
                  placeholder="123 Street Name, Area..."
                  rows="3"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold text-gray-600">City</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold text-gray-600">Pincode</label>
                  <input
                    type="text"
                    placeholder="400001"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#17BD8D] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#15ae83] transform hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-[#17BD8D]/30"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
