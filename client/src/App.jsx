import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star } from 'lucide-react';

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
    { id: 1, name: 'Plain Hot', price: 35, image: '/images/products/plain-hot.jpg', stock: 25 },
    { id: 2, name: 'Creamy Hot', price: 35, image: '/images/products/creamy-hot.jpg', stock: 18 },
    { id: 3, name: 'Garlic Infusion', price: 40, image: '/images/products/garlic-infusion.jpg', stock: 15 },
    { id: 4, name: 'Sweet & Spicy', price: 38, image: '/images/products/sweet-spicy.jpg', stock: 20 }
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
  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const scrollTo = (id) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="/images/logo.png" alt="Mmanda's Logo" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-2xl font-bold">Mmanda's</h1>
              <p className="text-xs text-gray-400">Premium Hot Sauces</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded transition"
              >
                {section}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button onClick={() => setShowCart(true)} className="relative p-3 bg-red-600 rounded-full hover:bg-red-700 transition">
              <ShoppingCart size={22} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-3 hover:bg-gray-800 rounded-full transition">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden py-4 space-y-2 bg-black">
            {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
              <button key={section} onClick={() => scrollTo(section)} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white rounded">
                {section}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-6xl font-bold mb-4">Flavor That Fires</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Premium hot sauces crafted with pure ingredients. Bold and authentic.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo('products')} className="px-8 py-4 bg-red-600 rounded-full font-bold hover:bg-red-700 transition">
            Shop Now
          </button>
          <button onClick={() => window.open('https://wa.me/27626456655', '_blank')} className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">
            WhatsApp Order
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Collection</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map(p => (
            <div key={p.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover mb-4 rounded" />
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-gray-400 mb-2">R{p.price}</p>
              <p className="text-gray-500 text-sm mb-4">{p.stock} in stock</p>
              <button onClick={() => addToCart(p)} className="w-full py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700 text-center text-gray-400">
        <p>© 2026 Mmanda's Sauces. All rights reserved.</p>
      </footer>

      {/* Cart Overlay */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto p-6">
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-800 rounded-full">
                <X size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-800 rounded">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-400">R{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 bg-gray-700 rounded"><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 bg-gray-700 rounded"><Plus size={16} /></button>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-white">
                  <span>Total:</span>
                  <span>R{getTotal()}</span>
                </div>
                <button onClick={() => window.open(`https://wa.me/27626456655?text=Order Total: R${getTotal()}`, '_blank')} className="w-full py-2 bg-red-600 rounded text-white font-bold hover:bg-red-700 transition">
                  Complete Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
