import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(history);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">No Orders Yet</h2>
        <p className="text-gray-700">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Order History</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg text-gray-900">Order #{order.id}</span>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>
            <div className="mb-2 text-gray-700">Payment: <span className="font-semibold">{order.method}</span></div>
            <div className="mb-2 text-gray-700">Status: <span className="font-semibold text-blue-600">{order.status}</span></div>
            <div className="mb-2 text-gray-700">Total: <span className="font-bold">₹{order.total}</span></div>
            <div className="mb-2">
              <span className="font-semibold text-gray-900">Items:</span>
              <ul className="list-disc ml-6 mt-1">
                {order.items.map(item => (
                  <li key={item.id} className="text-gray-700">
                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 