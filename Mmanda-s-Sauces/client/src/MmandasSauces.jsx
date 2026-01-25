import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Mail, MapPin, Instagram, Heart, Star, ChevronRight } from 'lucide-react';

const MmandasSauces = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Product Data
  const products = [
    {
      id: 1,
      name: 'Plain Hot',
      price: 35,
      description: 'Pure, unadulterated heat. Our signature sauce with authentic African peppers.',
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
    },
    {
      id: 3,
      name: 'Garlic Infusion',
      price: 40,
      description: 'Bold garlic meets fiery heat. A flavor explosion in every drop.',
      image: '🧄',
      rating: 4.7,
      stock: 15,
      category: 'Premium'
    },
    {
      id: 4,
      name: 'Sweet & Spicy',
      price: 38,
      description: 'Honey-sweetened with a spicy finish. The perfect balance.',
      image: '🍯',
      rating: 4.6,
      stock: 20,
      category: 'Premium'
    }
  ];

  // Cart Functions
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
    
    // Show success message
    const btn = document.getElementById(`add-btn-${product.id}`);
    if (btn) {
      btn.innerHTML = '✓ Added!';
      setTimeout(() => {
        btn.innerHTML = 'Add to Cart';
      }, 1500);
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

  // Navigation
  const scrollToSection = (section) => {
    setCurrentPage(section);
    setMobileMenu(false);
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* ========== NAVBAR ========== */}
      <nav className="fixed w-full top-0 z-50 bg-black bg-opacity-80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="text-4xl">🌶️</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Mmanda's
                </h1>
                <p className="text-xs text-gray-400">Premium Hot Sauces</p>
              </div>
            </div>

            {/* Desktop Nav */}
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

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/mmandassauces" 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Instagram size={20} />
              </a>

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

          {/* Mobile Menu */}
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

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full border border-red-500/30">
            <p className="text-sm text-red-300">🔥 Handcrafted in South Africa</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Mmanda's Sauces
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Crafted with pure flavour. Built for real heat.
            <br />
            <span className="text-base text-gray-400">No preservatives. No compromises. Just bold taste.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('products')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all"
            >
              Shop Now <ChevronRight className="inline ml-2" size={20} />
            </button>
            <a
              href="https://wa.me/27626456655"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all flex items-center justify-center"
            >
              <Phone className="mr-2" size={20} /> Order on WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { icon: '🌿', label: 'All Natural', value: '100%' },
              { icon: '⭐', label: 'Customer Rating', value: '4.8/5' },
              { icon: '🌍', label: 'Made in SA', value: 'Local' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Image Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="text-9xl text-center">🌶️</div>
                <div className="mt-6 text-center">
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">Trusted by heat lovers</p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-red-600/20 rounded-full border border-red-500/30">
                <p className="text-sm text-red-400">Our Story</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Who We Are
              </h2>
              
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Born from passion and perfected through flavour, Mmanda's Sauces blends 
                <span className="text-red-400 font-semibold"> African heat </span> 
                with modern craft.
              </p>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Every bottle is bold, balanced, and unapologetically spicy. From kitchen 
                experiments to bottled perfection — every sauce tells our story.
              </p>

              <div className="space-y-3">
                {[
                  '✓ 100% Natural Ingredients',
                  '✓ No Artificial Preservatives',
                  '✓ Small Batch Production',
                  '✓ Authentic African Flavors'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-gray-300">
                    <span className="text-green-500 text-xl">{item.charAt(0)}</span>
                    <span>{item.slice(2)}</span>
                  </div>
                ))}
              </div>

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

      {/* ========== PRODUCTS SECTION ========== */}
      <section id="products" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-orange-600/20 rounded-full border border-orange-500/30">
              <p className="text-sm text-orange-400">Our Products</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Range
            </h2>
            <p className="text-gray-400 text-lg">
              Crafted in small batches for bold, unforgettable flavour
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-12 text-center">
                  <div className="text-8xl mb-4">{product.image}</div>
                  <div className="inline-block px-3 py-1 bg-black/40 rounded-full text-xs text-orange-400 border border-orange-500/30">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star size={16} className="fill-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-red-500">R{product.price}</div>
                      <div className="text-xs text-gray-500">{product.stock} in stock</div>
                    </div>
                  </div>

                  <button
                    id={`add-btn-${product.id}`}
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="min-h-screen py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-green-600/20 rounded-full border border-green-500/30">
              <p className="text-sm text-green-400">Get In Touch</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Talk
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Questions, partnerships, bulk orders, or just a love note for the heat — 
              we're always happy to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: <Phone size={24} />, title: 'Phone', value: '+27 62 645 6655', link: 'tel:+27626456655' },
                { icon: <Mail size={24} />, title: 'Email', value: 'info@mmandassauces.co.za', link: 'mailto:info@mmandassauces.co.za' },
                { icon: <MapPin size={24} />, title: 'Location', value: 'Clayville, South Africa', link: null },
                { icon: <Instagram size={24} />, title: 'Instagram', value: '@mmandassauces', link: 'https://www.instagram.com/mmandassauces' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{item.title}</div>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white hover:text-red-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-4xl">🌶️</div>
            <div>
              <h3 className="text-2xl font-bold">Mmanda's Sauces</h3>
              <p className="text-sm text-gray-400">Handcrafted • Authentic • Bold</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Mmanda's Sauces. All rights reserved. Made with <Heart className="inline text-red-500" size={16} /> in South Africa
          </p>
        </div>
      </footer>

      {/* ========== SHOPPING CART SIDEBAR ========== */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCart(false)}></div>
          
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black h-full overflow-y-auto">
            <div className="p-6">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={64} className="mx-auto text-gray-700 mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      scrollToSection('products');
                    }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className="text-3xl">{item.image}</div>
                            <div>
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <p className="text-sm text-gray-400">R{item.price} each</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400 p-2 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-xl font-bold text-red-500">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-semibold">R{getTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Total</span>
                      <span className="text-red-500">R{getTotal()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all hover:shadow-lg hover:shadow-green-500/50"
                  >
                    <Phone size={20} />
                    <span>Order via WhatsApp</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    You'll be redirected to WhatsApp to complete your order
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MmandasSauces;
