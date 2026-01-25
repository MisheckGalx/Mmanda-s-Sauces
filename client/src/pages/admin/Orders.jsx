import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error:', err));
  };

  const updateStatus = (id, newStatus) => {
    fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(() => fetchOrders())
      .catch(err => console.error('Error:', err));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'confirmed': return <CheckCircle className="text-blue-500" size={20} />;
      case 'processing': return <Package className="text-purple-500" size={20} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Orders Management</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-2xl">
          <Package size={64} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(order.status)}
                    <h3 className="text-xl font-bold">Order #{order.orderNumber}</h3>
                  </div>
                  <p className="text-gray-300">Customer: {order.customerName}</p>
                  <p className="text-gray-300">Phone: {order.customerPhone}</p>
                  {order.customerEmail && <p className="text-gray-400">Email: {order.customerEmail}</p>}
                  {order.deliveryAddress && <p className="text-gray-400">Address: {order.deliveryAddress}</p>}
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-500">R{parseFloat(order.totalAmount).toFixed(2)}</div>
                </div>
              </div>

              <div className="mb-4 bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gray-300">Order Items:</h4>
                <div className="space-y-1">
                  {JSON.parse(order.items || '[]').map((item, idx) => (
                    <div key={idx} className="flex justify-between text-gray-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
