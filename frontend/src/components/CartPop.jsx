import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty } from "../redux/features/cart/cartSlice";

const CartPop = ({ isOpen, onCheckoutClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  console.log(cartItems);

  if (!isOpen) return null;
  return (
    <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <h2 className="text-lg font-semibold mb-3">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div>
          <div className="h-102 overflow-y-auto hide-scrollbar">
            {cartItems.map((item) => (
              <div className="flex items-start gap-2 border-b border-gray-200 py-3" key={item._id}>
                <img src={item.image} className=" w-12" />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="text-[#17BD8D] font-medium text-base">
                    Rs. {item.price}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      onClick={() => dispatch(decreaseQty(item._id))}
                      className="border bg-gray-200 border-gray-200 px-2 py-0 text-2xl  cursor-pointer"
                    >
                      -
                    </p>
                    <p className="px-2">{item.quantity}</p>
                    <p
                      onClick={() => dispatch(increaseQty(item._id))}
                      className="border bg-gray-200 border-gray-200 px-2 py-0 text-2xl  cursor-pointer"
                    >
                      +
                    </p>
                  </div>
                  <p className="text-xs my-2">
                    Total: ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 font-semibold text-lg border-t-2 border-gray-200">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </div>
          <button
            onClick={onCheckoutClick}
            className="w-full bg-[#17BD8D] text-white py-3 mt-4 rounded-xl font-bold hover:bg-[#15ae83] transition-colors duration-200"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPop;
