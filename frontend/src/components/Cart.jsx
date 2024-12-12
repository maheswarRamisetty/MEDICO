import React, { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
const Cart = () => {
  const { cartItems, removeFromCart, clearCart, buyNow } = useContext(AppContext);
  const navigate=useNavigate();
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.success("Redirecting you to Products!")
      const timer = setTimeout(() => {
        navigate("/medico");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartItems, navigate]);
  if (cartItems.length === 0) {
   return <p>Your Cart is Empty!</p>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={clearCart}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
        >
          Clear Cart
        </button>
        <button
          onClick={buyNow}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
