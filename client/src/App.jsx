import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star, Mail, Instagram, Flame, Sparkles, Award, Heart, ArrowRight } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: 'Plain Hot', price: 35, image: '/images/products/plain-hot.jpg', emoji: '🌶️', stock: 25, rating: 4.8, reviews: 124, description: 'Pure, unadulterated heat with authentic African peppers.', color: 'bg-red-600', badge: 'Bestseller' },
    { id: 2, name: 'Creamy Hot', price: 35, image: '/images/products/creamy-hot.jpg', emoji: '🔥', stock: 18, rating: 4.9, reviews: 156, description: 'Smooth and creamy with a perfect kick.', color: 'bg-orange-500', badge: 'Fan Favorite' },
    { id: 3, name: 'Garlic Infusion', price: 40, image: '/images/products/garlic-infusion.jpg', emoji: '🧄', stock: 15, rating: 4.7, reviews: 89, description: 'Bold garlic meets fiery heat.', color: 'bg-gray-700', badge: 'Premium' },
    { id: 4, name: 'Sweet & Spicy', price: 38, image: '/images/products/sweet-spicy.jpg', emoji: '🍯', stock: 20, rating: 4.6, reviews: 98, description: 'Honey-sweetened with a spicy finish.', color: 'bg-yellow-500', badge: 'New' }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => scrollTo('home')}>
              <img src="/images/logo.png" alt="Mmanda's Logo" className="w-16 h-16 object-contain"/>
              <div>
                <h1 className="text-3xl font-black text-red-600">Mmanda's</h1>
                <p className="text-xs text-gray-400 tracking-widest">PREMIUM HOT SAUCES</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
                <button key={section} onClick={() => scrollTo(section)} className="px-6 py-2 text-gray-300 hover:text-white font-medium capitalize transition rounded-full hover:bg-gray-800">
                  {section}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => setShowCart(true)} className="relative p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
                <ShoppingCart size={22} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-3 hover:bg-gray-800 rounded-full transition">
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {mobileMenu && (
            <div className="md:hidden py-4 space-y-2">
              {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
                <button key={section} onClick={() => scrollTo(section)} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-xl capitalize transition">
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none text-white">
            Flavor That Fires
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Premium hot sauces crafted with pure ingredients. No preservatives. Just bold, authentic heat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo('products')} className="px-10 py-5 bg-red-600 rounded-full font-bold text-lg hover:bg-red-700 transition">
              Shop Now
            </button>
            <button onClick={() => window.open('https://wa.me/27626456655', '_blank')} className="px-10 py-5 bg-gray-800 rounded-full font-bold text-lg hover:bg-gray-700 transition">
              WhatsApp Order
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-32 px-4 relative overflow-hidden bg-gray-900">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
              Premium Sauces
            </h2>
            <p className="text-xl text-gray-400">Crafted in small batches. Packed with flavor.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="group relative bg-gray-800 rounded-3xl border border-gray-700 overflow-hidden">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${p.color}`}>
                  {p.badge}
                </div>
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-t-3xl"/>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-white mb-2">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{p.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-white">R{p.price}</div>
                    <div className="text-sm text-gray-400">{p.stock} in stock</div>
                  </div>
                  <button onClick={() => addToCart(p)} className={`w-full py-3 ${p.color} rounded-full font-bold text-white hover:opacity-90 transition`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 Mmanda's Sauces. Handcrafted • Authentic • Bold</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
