import React, { useState, useEffect } from 'react';
import { Lock, Package, ShoppingCart, Users, BarChart3, Plus, Edit2, Trash2, Save, X, Eye, EyeOff, LogOut } from 'lucide-react';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Products state
  const [products, setProducts] = useState([
    { id: 1, name: 'Plain Hot', price: 35, stock: 25, emoji: '🌶️', image: '/images/products/plain-hot.jpg', description: 'Classic hot sauce with pure heat' },
    { id: 2, name: 'Creamy Hot', price: 35, stock: 18, emoji: '🔥', image: '/images/products/creamy-hot.jpg', description: 'Smooth and creamy with a kick' }
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Orders state
  const [orders, setOrders] = useState([
    { id: 1, customer: 'Amanda S.', items: 'Plain Hot x2', total: 70, status: 'pending', date: '2026-01-25' },
    { id: 2, customer: 'Misheck G.', items: 'Creamy Hot x1, Plain Hot x3', total: 140, status: 'completed', date: '2026-01-24' },
    { id: 3, customer: 'Ayanda S.', items: 'Plain Hot x1', total: 35, status: 'processing', date: '2026-01-26' }
  ]);

  // Check if already logged in
  useEffect(() => {
    const auth = localStorage.getItem('mmandas_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple auth - in production, use proper backend authentication
    if (loginForm.username === 'admin' && loginForm.password === 'mmandas2026') {
      setIsAuthenticated(true);
      localStorage.setItem('mmandas_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin / mmandas2026');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mmandas_admin_auth');
    setLoginForm({ username: '', password: '' });
  };

  // Product handlers
  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct({ id: Date.now(), name: '', price: 0, stock: 0, emoji: '🌶️', image: '', description: '' });
  };

  const handleSaveProduct = () => {
    if (isAddingProduct) {
      setProducts([...products, editingProduct]);
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    }
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Order handlers
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Stats calculations
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Mmanda's Sauces Dashboard</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {loginError}
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Sign In
              </button>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: mmandas2026
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌶️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mmanda's Admin</h1>
                <p className="text-sm text-gray-500">Dashboard & Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'orders', icon: ShoppingCart, label: 'Orders' },
              { id: 'customers', icon: Users, label: 'Customers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BarChart3 className="text-green-600" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">R{totalRevenue}</div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <ShoppingCart className="text-orange-600" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{pendingOrders}</div>
                  <div className="text-sm text-gray-500">Pending Orders</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalProducts}</div>
                  <div className="text-sm text-gray-500">Total Products</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Package className="text-red-600" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{lowStockProducts}</div>
                  <div className="text-sm text-gray-500">Low Stock Items</div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.items}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">R{order.total}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Products</h2>
                <button
                  onClick={handleAddProduct}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{product.emoji}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="text-lg font-bold text-gray-900">R{product.price}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Stock</div>
                        <div className={`text-lg font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.stock} units
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit/Add Product Modal */}
              {editingProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
                  <div className="bg-white rounded-xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isAddingProduct ? 'Add Product' : 'Edit Product'}
                      </h3>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingProduct(false);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (R)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emoji</label>
                        <input
                          type="text"
                          value={editingProduct.emoji}
                          onChange={(e) => setEditingProduct({ ...editingProduct, emoji: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          rows="3"
                        />
                      </div>

                      <button
                        onClick={handleSaveProduct}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        <Save size={20} />
                        <span>Save Product</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Orders</h2>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">R{order.total}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`text-xs px-3 py-1 rounded-full font-medium border-0 ${
                              order.status === 'completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Customers</h2>
              
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Users className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Management</h3>
                <p className="text-gray-500">Customer database coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
