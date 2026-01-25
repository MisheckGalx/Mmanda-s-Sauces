import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  });

  useEffect(() => {
    // Fetch products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(products => {
        const lowStock = products.filter(p => p.stock < 10).length;
        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          lowStock
        }));
      });

    // Fetch orders
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(orders => {
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
        setStats(prev => ({
          ...prev,
          totalOrders: orders.length,
          totalRevenue
        }));
      });
  }, []);

  const statCards = [
    { icon: <Package size={32} />, label: 'Total Products', value: stats.totalProducts, color: 'from-blue-500 to-blue-600' },
    { icon: <ShoppingBag size={32} />, label: 'Total Orders', value: stats.totalOrders, color: 'from-green-500 to-green-600' },
    { icon: <TrendingUp size={32} />, label: 'Revenue', value: `R${stats.totalRevenue.toFixed(2)}`, color: 'from-purple-500 to-purple-600' },
    { icon: <Users size={32} />, label: 'Low Stock Items', value: stats.lowStock, color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <div className="text-right">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/admin/products" className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition text-center">
            <Package className="mx-auto mb-2" size={32} />
            <div className="font-semibold">Manage Products</div>
          </a>
          <a href="/admin/orders" className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition text-center">
            <ShoppingBag className="mx-auto mb-2" size={32} />
            <div className="font-semibold">View Orders</div>
          </a>
          <a href="/" className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition text-center">
            <TrendingUp className="mx-auto mb-2" size={32} />
            <div className="font-semibold">View Website</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
