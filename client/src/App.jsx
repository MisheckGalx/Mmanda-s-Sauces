import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Mail, Instagram, ArrowRight } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroImages = [
    '/images/hero/hero-bg.jpg',
    '/images/hero/hero-bg-2.jpg',
    '/images/hero/hero-bg-3.jpg'
  ];

  const products = [
    {
      id: 1,
      name: 'Plain Hot',
      price: 35,
      image: '/images/products/plain-hot.jpg',
      emoji: '🌶️',
      stock: 25,
      category: 'Signature Collection',
      heatLevel: 3,
      heatLabel: 'Medium-Hot',
      flavorProfile: 'Bold habanero with roasted garlic and cumin.'
    },
    {
      id: 2,
      name: 'Creamy Hot',
      price: 35,
      image: '/images/products/creamy-hot.jpg',
      emoji: '🔥',
      stock: 18,
      category: 'Signature Collection',
      heatLevel: 3,
      heatLabel: 'Medium-Hot',
      flavorProfile: 'Roasted red peppers with smoked paprika and cream.'
    }
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
    <div className="min-h-screen bg-white">
      
      {/* NAVBAR - Clean White */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollTo('home')}>
              <img 
                src="/images/logo.png" 
                alt="Mmanda's Logo" 
                className="w-12 h-12 object-contain transform group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-4xl hidden">🌶️</div>
              <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">Mmanda's</h1>
                <p className="text-xs font-medium text-gray-500 tracking-wide">PREMIUM HOT SAUCES</p>
                <p className="text-xs font-medium text-gray-500 tracking-wide">Monday - Friday 08am - 5pm</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'products', 'reviews', 'gallery', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-black capitalize transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2.5 rounded-full bg-black hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={20} className="text-white" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-black">
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden py-4 space-y-1 bg-white border-t border-gray-100">
              {['home', 'about', 'products', 'reviews', 'gallery', 'contact'].map(section => (
                <button key={section} onClick={() => scrollTo(section)} className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 capitalize transition-colors">
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO - Clean Minimal */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 pt-20">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Hero ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => e.target.style.display = 'none'}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none text-white drop-shadow-2xl tracking-tight">
            CRAFTED HEAT
            <span className="block text-orange-500">
            PURE FLAVOUR
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg">
            Premium Hot Sauces • Handcrafted with heat
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollTo('products')}
              className="group px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-lg text-white transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => window.open('https://wa.me/27626456655', '_blank')}
              className="px-10 py-4 bg-white hover:bg-gray-50 rounded-full font-semibold text-lg text-black transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Order Now</span>
            </button>
          </div>

          <div className="flex justify-center space-x-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - Story */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-orange-50 to-white relative">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src="/images/founder/founder-photo.jpg" 
                alt="Mmanda's Founder" 
                className="w-full aspect-[3/4] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full aspect-[3/4] bg-orange-500 items-center justify-center text-9xl text-white rounded-2xl">
                👨‍🍳
              </div>
            </div>

            {/* Story Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black tracking-tight">Our Story</h2>
              <p className="text-xl text-orange-600 font-semibold mb-8 tracking-wide">CRAFTED HEAT. PURE FLAVOUR</p>
              <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Mmanda's Sauces didn't start on a shelf — it started in our kitchen.
                </p>

                <p>
                  As a child, I watched my father transform simple ingredients into magic. He didn't just cook — he experimented, tasted, adjusted, and perfected. His chilli sauces, made entirely from scratch, were legendary in our home: bold, fiery, and full of love. Each bottle told a story of patience, creativity, and a passion for flavour.
                </p>

                <p>
                  Inspired by him, I began crafting my own sauces, determined to capture that same spirit. What began as a few small batches for family and friends quickly grew into something more — a brand that celebrates tradition, authenticity, and the joy of sharing food with the people you love.
                </p>

                <p>
                  My mother and sister have been my guiding lights on this journey. From tasting and giving honest feedback to cheering me on through every experiment, their support has been woven into every bottle we make.
                </p>

                <p className="font-semibold text-black text-lg">
                  Mmanda's Sauces isn't just about heat — it's about flavour, family, and heart. Every bottle carries a piece of our story, crafted with love and ready to bring people together.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollTo('products')}
            className="mt-12 px-8 py-3.5 bg-black hover:bg-gray-800 text-white rounded-full font-semibold transition-all transform hover:scale-105"
          >
            View Our Sauces
          </button>
        </div>
      </section>

      {/* PRODUCTS - Clean and Simple */}
      <section id="products" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 text-black tracking-tight">
              Our Collection
            </h2>
            <p className="text-lg text-gray-600">Crafted in small batches. Packed with flavor.</p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
              {products.map((p) => (
                <div 
                  key={p.id} 
                  className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-orange-50 to-white overflow-hidden">
                    <img 
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-9xl text-white">
                      {p.emoji}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-black mb-6 tracking-tight">{p.name}</h3>
                    
                    {/* Flavor Profile */}
                    <div className="mb-8">
                      <p className="text-gray-700 text-base leading-relaxed font-medium">
                        {p.flavorProfile}
                      </p>
                    </div>

                    {/* Pricing and Stock */}
                    <div className="flex items-baseline justify-between mb-8">
                      <div className="text-4xl font-bold text-black tracking-tight">
                        R{p.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        <p className="font-semibold">{p.stock} in stock</p>
                      </div>
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={() => {
                        addToCart(p);
                        setTimeout(() => setShowCart(true), 300);
                      }}
                      className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-full font-semibold transition-all transform hover:scale-105"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - World Class */}
      <section id="reviews" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 text-black tracking-tight">
              Loved by Food Enthusiasts
            </h2>
            <p className="text-lg text-gray-600">Hear from those who've experienced the fire</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Simply exceptional. The perfect balance of heat and flavor. It's become a staple in my kitchen."
              </p>
              <div className="font-semibold text-black">Amanda S.</div>
              <div className="text-sm text-gray-500">Clayville</div>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Authentic African fire in a bottle. The quality is unmatched. I'm hooked!"
              </p>
              <div className="font-semibold text-black">Misheck G.</div>
              <div className="text-sm text-gray-500">Johannesburg</div>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Every meal is an experience now. Bold, flavorful, and beautifully crafted. Five stars!"
              </p>
              <div className="font-semibold text-black">Ayanda S.</div>
              <div className="text-sm text-gray-500">Kempton Park</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY - Clean White */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 text-black tracking-tight">
              Heat in Action
            </h2>
            <p className="text-lg text-gray-600">Elevating meals, one drop at a time</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
              >
                <img 
                  src={`/images/gallery/product-lifestyle-${num}.jpg`}
                  alt={`Mmanda's Sauce Lifestyle ${num}`}
                  className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full aspect-[3/4] bg-orange-500 items-center justify-center text-8xl text-white">
                  🌶️
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Minimal Clean */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 text-black tracking-tight">
              Let's Talk Flavors
            </h2>
            <p className="text-lg text-gray-600">Questions, partnerships, bulk orders, or just a love note for the heat — we're always happy to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => window.open('tel:+27626456655')}
              className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center border border-gray-200"
            >
              <div className="inline-flex p-4 bg-green-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Phone size={24} className="text-white" />
              </div>
              <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Phone</div>
              <div className="text-base font-semibold text-black">+27 62 645 6655</div>
            </button>

            <button
              onClick={() => window.open('mailto:info@mmandassauces.co.za')}
              className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center border border-gray-200"
            >
              <div className="inline-flex p-4 bg-orange-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-white" />
              </div>
              <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email</div>
              <div className="text-base font-semibold text-black">info@mmandassauces.co.za</div>
            </button>

            <button
              onClick={() => window.open('https://instagram.com/mmandassauces', '_blank')}
              className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center border border-gray-200"
            >
              <div className="inline-flex p-4 bg-pink-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Instagram size={24} className="text-white" />
              </div>
              <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Instagram</div>
              <div className="text-base font-semibold text-black">@mmandassauces</div>
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img 
              src="/images/logo-white.png" 
              alt="Mmanda's Logo" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.src = '/images/logo.png';
                e.target.onerror = () => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                };
              }}
            />
            <div className="text-3xl hidden">🌶️</div>
            <h3 className="text-2xl font-bold text-white">Mmanda's Sauces</h3>
          </div>
          <p className="text-gray-400 text-sm">Handcrafted • Authentic • Bold</p>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 All rights reserved. Made with 🔥 in South Africa
          </p>
        </div>
      </footer>

      {/* CART */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-black">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-black" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
                  <p className="text-xl text-gray-600 mb-6 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => { setShowCart(false); scrollTo('products'); }}
                    className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white rounded-full font-semibold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="p-6 bg-gray-50 rounded-2xl">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                              }}
                            />
                            <div className="text-4xl hidden">{item.emoji}</div>
                            <div>
                              <h3 className="font-bold text-lg text-black">{item.name}</h3>
                              <p className="text-sm text-gray-600">R{item.price} each</p>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-black transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2.5 bg-white hover:bg-gray-100 rounded-lg transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="text-lg font-semibold w-8 text-center text-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2.5 bg-white hover:bg-gray-100 rounded-lg transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-2xl font-bold text-black">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-gray-50 rounded-2xl mb-6 border-t-4 border-black">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>Subtotal</span>
                      <span>R{getTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center text-3xl font-bold">
                      <span className="text-black">Total</span>
                      <span className="text-black">R{getTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(`https://wa.me/27626456655?text=Order Total: R${getTotal()}`, '_blank')}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-full font-semibold text-lg text-white transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Complete Order</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">Secure checkout via WhatsApp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <button
        onClick={() => window.open('https://wa.me/27626456655', '_blank')}
        className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <Phone size={24} className="text-white" />
      </button>
    </div>
  );
}

export default App;
