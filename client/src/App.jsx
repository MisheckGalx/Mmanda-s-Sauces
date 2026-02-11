import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Mail, MapPin, Instagram, Heart, Star, ChevronRight } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Plain Hot',
      price: 35,
      description: 'Pure, unadulticated heat. Our signature sauce with authentic African peppers.',
      image: '🌶️',
      rating: 4.8,
      stock: 25,
      category: 'Classic'
    },
    {
      id: 2,
      name: 'Creamy Hot',
      price: 35,
      description: 'Smooth and creamy with a perfect kick. Perfect for dipping.',
      image: '🔥',
      rating: 4.9,
      stock: 18,
      category: 'Classic'
    }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const orderDetails = cart.map(item => 
      `${item.quantity}x ${item.name} - R${item.price * item.quantity}`
    ).join('\n');
    
    const message = `🌶️ *New Order from Website*\n\n${orderDetails}\n\n*Total: R${getTotal()}*\n\nPlease confirm my order and delivery details.`;
    
    window.open(`https://wa.me/27626456655?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (section) => {
    setMobileMenu(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="text-4xl">🌶️</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Mmanda's
                </h1>
                <p className="text-xs text-gray-400">Premium Hot Sauces</p>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'products', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-300 hover:text-white transition-colors capitalize font-medium"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 rounded-full bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden text-white"
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden pb-4 space-y-2">
              {['home', 'about', 'products', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Mmanda's Sauces
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Crafted with pure flavour. Built for real heat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('products')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all flex items-center justify-center"
            >
              Shop Now <ChevronRight className="inline ml-2" size={20} />
            </button>
            
              href="https://wa.me/27626456655"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all flex items-center justify-center"
            >
              <Phone className="mr-2" size={20} /> WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="text-9xl text-center">🌶️</div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Born from passion and perfected through flavour, Mmanda's Sauces blends 
                <span className="text-red-400 font-semibold"> African heat </span> 
                with modern craft.
              </p>
              <button
                onClick={() => scrollToSection('products')}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Explore Our Range
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-12 text-center">
                  <div className="text-8xl mb-4">{product.image}</div>
                  <div className="inline-block px-3 py-1 bg-black/40 rounded-full text-xs text-orange-400 border border-orange-500/30">
                    {product.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star size={16} className="fill-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-red-500">R{product.price}</div>
                    <div className="text-xs text-gray-500">{product.stock} in stock</div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-lg">
              <Phone size={20} className="text-red-500" />
              <a href="tel:+27626456655" className="hover:text-red-400">+27 62 645 6655</a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-lg">
              <Mail size={20} className="text-red-500" />
              <a href="mailto:info@mmandassauces.co.za" className="hover:text-red-400">info@mmandassauces.co.za</a>
            </div>
          </div>
        </div>
      </section>

      {/* CART SIDEBAR */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCart(false)}></div>
          
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-800 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={64} className="mx-auto text-gray-700 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gray-800 rounded-xl p-4">
                        <div className="flex justify-between mb-3">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-400">R{item.price} each</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2 bg-gray-700 rounded">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2 bg-gray-700 rounded">
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-red-500">R{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span className="text-red-500">R{getTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-green-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Order via WhatsApp</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
