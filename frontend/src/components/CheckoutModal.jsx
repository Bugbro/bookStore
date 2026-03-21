import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "../redux/features/cart/cartSlice";

const CheckoutModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    // Integrate API call here in the future
    console.log("Order placed:", {
      items: cartItems,
      deliveryAddress: formData,
      paymentMethod,
      totalAmount: subTotal,
    });
    // Simulating order logic completion:
    alert("Order placed successfully via " + paymentMethod + "!");
    onClose();
  };

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

        {step === 1 && (
          <>
            {/* Left Side: Order Summary */}
            <div className="w-full md:w-[35%] bg-gray-50 flex flex-col border-r border-gray-200">
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
            <div className="w-full md:w-[65%] bg-white flex flex-col h-full overflow-y-auto">
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                  Shipping Details
                </h2>
                
                <form className="flex flex-col gap-5 flex-1" onSubmit={handleContinueToPayment}>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Street Address</label>
                    <textarea
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
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
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <label className="text-sm font-semibold text-gray-600">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17BD8D]/50 focus:border-[#17BD8D] transition-all"
                      required
                    />
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
          </>
        )}

        {step === 2 && (
          <>
            {/* Left Side: Bill Summary */}
            <div className="w-full md:w-[35%] bg-gray-50 flex flex-col border-r border-gray-200">
              <div className="p-6 md:p-8 flex-1 overflow-y-auto hide-scrollbar">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                  Bill Summary
                </h2>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Items Total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-gray-800">Rs. {subTotal}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Taxes</span>
                    <span className="font-semibold text-gray-800">Rs. 0</span>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center text-lg font-bold text-gray-800">
                    <span>Amount to Pay:</span>
                    <span className="text-[#17BD8D] text-2xl">Rs. {subTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Payment Methods */}
            <div className="w-full md:w-[65%] bg-white flex flex-col h-full overflow-y-auto">
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                  Payment Method
                </h2>
                
                <form className="flex flex-col gap-5 flex-1" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
                  <div className="flex flex-col gap-4">
                    {/* COD Option */}
                    <label 
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'COD' ? 'border-[#17BD8D] bg-[#17BD8D]/5' : 'border-gray-200 hover:border-[#17BD8D]/50'}`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="COD" 
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#17BD8D] focus:ring-[#17BD8D] mr-4"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-lg">Cash on Delivery</span>
                        <span className="text-gray-500 text-sm">Pay when your order arrives</span>
                      </div>
                    </label>

                    {/* Online Option */}
                    <label 
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'Online' ? 'border-[#17BD8D] bg-[#17BD8D]/5' : 'border-gray-200 hover:border-[#17BD8D]/50'}`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="Online" 
                        checked={paymentMethod === 'Online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#17BD8D] focus:ring-[#17BD8D] mr-4"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-lg">Pay Online</span>
                        <span className="text-gray-500 text-sm">Credit/Debit Card, UPI, Net Banking</span>
                      </div>
                    </label>
                  </div>

                  <div className="mt-auto pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      Back a Step
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#17BD8D] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#15ae83] transform hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-[#17BD8D]/30"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
