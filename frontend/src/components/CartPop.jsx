import React from 'react'
import { useSelector } from 'react-redux';

const CartPop = ({isOpen}) => {

    const cartItems = useSelector((state)=> state.cart.cartItems);
    console.log(cartItems);
    

    if(!isOpen) return null;
  return (
    <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg p-4 z-50">

      <h2 className="text-lg font-semibold mb-3">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          // <div key={item._id} className="flex items-center gap-3 mb-3">

          //   <img
          //     src={item.image}
          //     alt={item.title}
          //     className="w-12 h-12 object-cover rounded"
          //   />

          //   <div>
          //     <p className="text-sm font-semibold">{item.title}</p>
          //     <p className="text-sm text-gray-500">
          //       {item.quantity} × ₹{item.price}
          //     </p>
          //   </div>

          // </div>
          <div>
            <img src={item.image} />
            <div>
              <h3>{item.author}</h3>
              <p>{item.title}</p>
              <p>{item.price}</p>
              <div className='flex items-center '>
                <p>-</p>
                <p>{item.quantity}</p>
                <p>+</p>
              </div>
            </div>
          </div>
        ))
      )}

    </div>
  )
}

export default CartPop