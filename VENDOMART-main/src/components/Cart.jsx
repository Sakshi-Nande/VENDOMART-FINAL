import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate('/vendor')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-3">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">Price: ₹{item.price}</div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">Total: ₹{item.price * item.quantity}</div>
            </div>
            <button className="text-red-500 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-lg">Total:</span>
        <span className="font-bold text-lg">₹{getTotal()}</span>
      </div>
      <button
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition"
        onClick={() => navigate('/payment')}
      >
        Confirm & Proceed to Payment
      </button>
    </div>
  );
};

export default Cart; 