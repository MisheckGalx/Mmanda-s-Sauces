import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Mail, Instagram, ArrowRight, MapPin } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);

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
      stock: 100,
      category: 'Signature Collection',
      heatLevel: 3,
      heatLabel: 'Medium-Hot',
      flavorProfile: 'Bright, tangy heat with a bold, lingering spicy kick.'
    },
    {
      id: 2,
      name: 'Creamy Hot',
      price: 35,
      image: '/images/products/creamy-hot.jpg',
      emoji: '🔥',
      stock: 100,
      category: 'Signature Collection',
      heatLevel: 3,
      heatLabel: 'Medium-Hot',
      flavorProfile: 'Smooth, mellow heat with a rich, tangy, indulgent finish.'
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
      
      {/* DELIVERY BANNER - Corner Message */}
      {showDeliveryBanner && (
        <div className="fixed bottom-6 left-6 z-30 max-w-xs bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-2xl border border-green-500/50 animate-pulse">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-white flex-shrink-0" />
                <h3 className="font-bold text-white text-sm">FREE DELIVERY!</h3>
              </div>
              <p className="text-white text-xs leading-relaxed mb-3">
                🚗 Free delivery in and around Clayville
              </p>
              <p className="text-white text-xs leading-relaxed mb-3">
                📦 Bulk orders (10+) within 15km of Clayville = FREE delivery
              </p>
              <p className="text-yellow-200 text-xs font-bold">
                🎉 Get 10% OFF on bulk orders of 10+ units!
              </p>
            </div>
            <button
              onClick={() => setShowDeliveryBanner(false)}
              className="flex-shrink-0 p-1 hover:bg-green-500/20 rounded-full transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
      
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
                <h1 className="text-2xl font-bold text-black tracking-tight">Mmanda's Sauces</h1>
                <p className="text-xs font-medium text-gray-500 tracking-wide">CRAFTED HEAT</p>
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
              onClick={() => window.open('https://wa.me/27711346238', '_blank')}
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

      {/* ABOUT - Story with Black Background */}
      <section id="about" className="py-24 px-6 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-white tracking-tight">
                OUR <span className="block">STORY</span>
              </h2>
              
              <p className="text-xl text-orange-500 font-bold mb-12 tracking-wide">
                CRAFTED HEAT. PURE FLAVOUR
              </p>

              <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
                <p>
                  What started in our kitchen has grown into Mmanda's Sauces bold, fiery, and full of love.
                </p>

                <p>
                  Inspired by my father's legendary chilli sauces, I began crafting my own, guided by family, passion, and creativity.
                </p>

                <p className="font-semibold text-white text-lg pt-4 border-t border-gray-700">
                  Every bottle carries flavour, family, and heart crafted to bring people together.
                </p>
              </div>

              <button
                onClick={() => scrollTo('products')}
                className="mt-12 px-8 py-3.5 bg-white hover:bg-gray-100 text-black rounded-full font-bold tracking-wide transition-all transform hover:scale-105"
              >
                EXPLORE
              </button>
            </div>

            {/* Right Side - Two Large Images */}
            <div className="relative h-full min-h-[600px]">
              {/* Large Image 1 - Top Right */}
              <div className="absolute top-0 right-0 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/gallery/product-lifestyle-1.jpg"
                  alt="Our Story 1"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-8xl text-white">
                  🌶️
                </div>
              </div>

              {/* Large Image 2 - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/gallery/product-lifestyle-2.jpg"
                  alt="Our Story 2"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-8xl text-white">
                  🌶️
                </div>
              </div>

              {/* Decorative Element - Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>

          </div>
        </div>

        {/* Background Gradient Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-1"></div>
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
              <div className="font-semibold text-black">Asanda.</div>
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
              <div className="font-semibold text-black">Zahra.</div>
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
              <div className="font-semibold text-black">Lebo.</div>
              <div className="text-sm text-gray-500">Kempton Park</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 text-black tracking-tight">
              Heat in Action
            </h2>
            <p className="text-lg text-gray-600">Elevating meals, one drop at a time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[200px]">
            
            {/* Large Image 1 */}
            <div className="group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <img 
                src="/images/gallery/product-lifestyle-1.jpg"
                alt="Heat in Action 1"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-9xl text-white rounded-2xl">🌶️</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>

            {/* Large Image 2 */}
            <div className="group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <img 
                src="/images/gallery/product-lifestyle-2.jpg"
                alt="Heat in Action 2"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-9xl text-white rounded-2xl">🌶️</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>

            {/* Small Image 3 */}
            <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer md:col-span-1 md:row-span-1">
              <img 
                src="/images/gallery/product-lifestyle-3.jpg"
                alt="Heat in Action 3"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-8xl text-white rounded-2xl">🌶️</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>

            {/* Small Image 4 */}
            <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer md:col-span-1 md:row-span-1">
              <img 
                src="/images/gallery/product-lifestyle-4.jpg"
                alt="Heat in Action 4"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-8xl text-white rounded-2xl">🌶️</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>

            {/* Small Image 5 */}
            <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer md:col-span-1 md:row-span-1">
              <img 
                src="/images/gallery/product-lifestyle-5.jpg"
                alt="Heat in Action 5"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-orange-500 items-center justify-center text-8xl text-white rounded-2xl">🌶️</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Black Background with Real Details */}
      <section id="contact" className="min-h-screen py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-orange-600/20 rounded-full border border-orange-500/30">
              <p className="text-sm text-orange-400">Get In Touch</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Let's Talk <span className="text-orange-500">Flavours</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Questions, partnerships, bulk orders, or just a love note for the heat — we're always happy to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { 
                  icon: <Phone size={24} />, 
                  title: 'Phone', 
                  value: '+27 71 134 6238', 
                  link: 'tel:+27711346238',
                  sublabel: 'Mon-Fri 08am - 5pm'
                },
                { 
                  icon: <Mail size={24} />, 
                  title: 'Email', 
                  value: 'info@mmandas.com', 
                  link: 'mailto:info@mmandas.com',
                  sublabel: 'We reply within 24 hours'
                },
                { 
                  icon: <MapPin size={24} />, 
                  title: 'Location', 
                  value: 'Clayville, South Africa', 
                  link: null,
                  sublabel: 'Serving the Clayville area'
                },
                { 
                  icon: <Instagram size={24} />, 
                  title: 'Instagram', 
                  value: '@mmandas_sauces', 
                  link: 'https://www.instagram.com/mmandas_sauces',
                  sublabel: 'Follow us for updates'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">{item.title}</div>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lg font-semibold text-white hover:text-orange-400 transition-colors block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold text-white">{item.value}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">{item.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-semibold">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-semibold">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-semibold">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help you... bulk orders, partnerships, or just a love note for the heat!"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Delivery Info Box */}
          <div className="mt-16 p-8 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-2xl border border-green-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">📦 Delivery & Bulk Order Info</h3>
            <div className="grid md:grid-cols-3 gap-8 text-gray-100">
              <div>
                <p className="font-semibold text-green-400 mb-2">🚗 Free Delivery</p>
                <p className="text-sm">Free delivery in and around Clayville for all orders</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">📍 Extended Delivery</p>
                <p className="text-sm">Bulk orders (10+) within 15km of Clayville = FREE delivery</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300 mb-2">🎉 10% Bulk Discount</p>
                <p className="text-sm">Get 10% OFF on orders of 10 units or more!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 px-6 border-t border-gray-800">
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
          <p className="text-gray-400 text-sm">CRAFTED HEAT • PURE FLAVOUR</p>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 All rights reserved. | Clayville, South Africa
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
                    onClick={() => window.open(`https://wa.me/27711346238?text=Order Total: R${getTotal()}`, '_blank')}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-full font-semibold text-lg text-white transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Complete Order on WhatsApp</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">Secure checkout via WhatsApp • +27 71 134 6238</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <button
        onClick={() => window.open('https://wa.me/27711346238', '_blank')}
        className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all transform hover:scale-110"
        title="Chat on WhatsApp - +27 71 134 6238"
      >
        <Phone size={24} className="text-white" />
      </button>
    </div>
  );
}

export default App;
