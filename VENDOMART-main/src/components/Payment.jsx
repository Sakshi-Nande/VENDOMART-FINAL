import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const UPI_APPS = [
  { name: 'Google Pay', value: 'gpay' },
  { name: 'PhonePe', value: 'phonepe' },
  { name: 'Paytm', value: 'paytm' },
];

const Payment = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState('');
  const [upiApp, setUpiApp] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleOrderSuccess = () => {
    // Store order in localStorage order history
    const order = {
      id: Date.now(),
      items: cart,
      total: getTotal(),
      method: method === 'upi' ? `UPI (${upiApp})` : method,
      date: new Date().toLocaleString(),
      status: 'Placed',
    };
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([order, ...history]));
    clearCart();
    setPaid(true);
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  const handlePay = () => {
    setProcessing(true);
    // Placeholder for real payment integration
    setTimeout(() => {
      setProcessing(false);
      handleOrderSuccess();
    }, 1500);
  };

  if (paid) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h2>
        <p className="mb-4 text-white">Thank you for your purchase.</p>
        <p className="text-white">Redirecting to shop...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-900">Total Amount:</span>
          <span className="text-xl font-bold text-gray-900">₹{getTotal()}</span>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-gray-900">Select Payment Method:</label>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded border ${method === 'upi' ? 'bg-white text-gray-900 border-blue-600 font-bold' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              onClick={() => setMethod('upi')}
            >
              UPI
            </button>
            <button
              className={`px-4 py-2 rounded border ${method === 'card' ? 'bg-white text-gray-900 border-blue-600 font-bold' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              onClick={() => setMethod('card')}
            >
              Credit/Debit Card
            </button>
            <button
              className={`px-4 py-2 rounded border ${method === 'cod' ? 'bg-white text-gray-900 border-blue-600 font-bold' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              onClick={() => setMethod('cod')}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
        {method === 'upi' && (
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-900">Select UPI App:</label>
            <div className="flex gap-4">
              {UPI_APPS.map(app => (
                <button
                  key={app.value}
                  className={`px-4 py-2 rounded border ${upiApp === app.value ? 'bg-white text-gray-900 border-blue-600 font-bold' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                  onClick={() => setUpiApp(app.value)}
                >
                  {app.name}
                </button>
              ))}
            </div>
            {upiApp && (
              <button
                className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay with ' + UPI_APPS.find(a => a.value === upiApp).name}
              </button>
            )}
          </div>
        )}
        {method === 'card' && (
          <div className="mb-4">
            {/* Placeholder for Razorpay/Stripe card integration */}
            <button
              className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition"
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Pay with Card'}
            </button>
          </div>
        )}
        {method === 'cod' && (
          <div className="mb-4">
            <button
              className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition"
              onClick={handleOrderSuccess}
            >
              Confirm Order (Cash on Delivery)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment; 