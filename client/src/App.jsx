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
      stock: 25
    },
    { 
      id: 2, 
      name: 'Creamy Hot', 
      price: 35, 
      image: '/images/products/creamy-hot.jpg',
      emoji: '🔥',
      stock: 18
    },
    { 
      id: 3, 
      name: 'Garlic Infusion', 
      price: 40, 
      image: '/images/products/garlic-infusion.jpg',
      emoji: '🧄',
      stock: 15
    },
    { 
      id: 4, 
      name: 'Sweet & Spicy', 
      price: 38, 
      image: '/images/products/sweet-spicy.jpg',
      emoji: '🍯',
      stock: 20
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
      
      {/* NAVBAR */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollTo('home')}>
              <img 
                src="/images/logo.png" 
                alt="Mmanda's Logo" 
                className="w-16 h-16 object-contain transform group-hover:scale-110 transition"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-5xl hidden">🌶️</div>
              <div>
                <h1 className="text-3xl font-black text-red-600">Mmanda's</h1>
                <p className="text-xs font-bold text-gray-600 tracking-widest">PREMIUM HOT SAUCES</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className="px-6 py-2 text-gray-700 hover:text-red-600 font-bold capitalize transition-all hover:bg-red-50 rounded-full"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 rounded-full bg-red-600 hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
              >
                <ShoppingCart size={22} className="text-white" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-3 text-red-600">
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden py-4 space-y-2 bg-white border-t">
              {['home', 'about', 'products', 'gallery', 'contact'].map(section => (
                <button key={section} onClick={() => scrollTo(section)} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 rounded-xl capitalize font-semibold">
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO WITH SLIDER - NO FADE OVERLAY */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
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

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none text-white drop-shadow-2xl">
            FLAVOR
            <span className="block text-yellow-400">
              THAT FIRES!
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-white mb-8 max-w-2xl mx-auto font-bold drop-shadow-lg">
            Premium Hot Sauces • Handcrafted in South Africa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('products')}
              className="group px-12 py-6 bg-yellow-400 hover:bg-yellow-300 rounded-full font-black text-xl text-gray-900 shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="group-hover:translate-x-1 transition" size={24} />
            </button>
            <button
              onClick={() => window.open('https://wa.me/27626456655', '_blank')}
              className="px-12 py-6 bg-white hover:bg-gray-100 rounded-full font-black text-xl text-red-600 shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Phone size={24} />
              <span>ORDER NOW</span>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mt-16">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - SIMPLIFIED */}
      <section id="about" className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="/images/hero/about-bg.jpg" 
                alt="About Mmanda's" 
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-96 bg-red-600 rounded-3xl items-center justify-center text-9xl text-white">
                🌶️
              </div>
            </div>

            <div>
              <div className="inline-block px-6 py-3 bg-red-600 rounded-full mb-6">
                <span className="text-sm font-black text-white">OUR STORY</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-gray-900">
                Crafted with
                <span className="block text-red-600">
                  Passion & Fire
                </span>
              </h2>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Every bottle of Mmanda's Sauces is a celebration of African heat and artisanal craft. 
                We blend tradition with innovation to create sauces that elevate every meal.
              </p>

              <button
                onClick={() => scrollTo('products')}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-black text-lg shadow-xl transition-all transform hover:scale-105"
              >
                DISCOVER OUR SAUCES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS - CLEAN VERSION */}
      <section id="products" className="py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-3 bg-orange-500 rounded-full mb-6">
              <span className="text-sm font-black text-white">OUR COLLECTION</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900">
              PREMIUM SAUCES
            </h2>
            <p className="text-xl text-gray-600 font-bold">Crafted in small batches. Packed with flavor.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-4 border-gray-100 hover:border-black">

                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img 
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-red-600 items-center justify-center text-8xl text-white">
                    {p.emoji}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{p.name}</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-black text-red-600">
                      R{p.price}
                    </div>
                    <div className="text-xs text-gray-500 font-bold">{p.stock} in stock</div>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-4 bg-yellow-400">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-3 bg-red-600 rounded-full mb-6">
              <span className="text-sm font-black text-white">LIFESTYLE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900">
              HEAT IN ACTION
            </h2>
            <p className="text-xl text-gray-900 font-bold">See how our sauces elevate every meal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className="group relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white hover:border-red-600 transition-all"
              >
                <img 
                  src={`/images/gallery/product-lifestyle-${num}.jpg`}
                  alt={`Mmanda's Sauce Lifestyle ${num}`}
                  className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-96 bg-red-600 items-center justify-center text-8xl text-white">
                  🌶️
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - SIMPLE BLACK BACKGROUND */}
      <section id="contact" className="py-32 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
              GET CONNECTED
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => window.open('tel:+27626456655')}
              className="group p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="inline-flex p-5 bg-green-500 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Phone size={32} className="text-white" />
              </div>
              <div className="text-sm font-black text-gray-500 mb-2">PHONE</div>
              <div className="text-lg font-black text-gray-900">+27 62 645 6655</div>
            </button>

            <button
              onClick={() => window.open('mailto:info@mmandassauces.co.za')}
              className="group p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="inline-flex p-5 bg-red-600 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Mail size={32} className="text-white" />
              </div>
              <div className="text-sm font-black text-gray-500 mb-2">EMAIL</div>
              <div className="text-lg font-black text-gray-900">info@mmandassauces.co.za</div>
            </button>

            <button
              onClick={() => window.open('https://instagram.com/mmandassauces', '_blank')}
              className="group p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="inline-flex p-5 bg-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Instagram size={32} className="text-white" />
              </div>
              <div className="text-sm font-black text-gray-500 mb-2">INSTAGRAM</div>
              <div className="text-lg font-black text-gray-900">@mmandassauces</div>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/images/logo-white.png" 
              alt="Mmanda's Logo" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.src = '/images/logo.png';
                e.target.onerror = () => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                };
              }}
            />
            <div className="text-4xl hidden">🌶️</div>
            <h3 className="text-3xl font-black text-white">Mmanda's Sauces</h3>
          </div>
          <p className="text-red-500 text-sm font-bold mb-2">Handcrafted • Authentic • Bold</p>
          <p className="text-gray-400 text-xs font-semibold">© 2026 All rights reserved. Made with 🔥 in South Africa</p>
        </div>
      </footer>

      {/* CART */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-red-600">
                <h2 className="text-3xl font-black text-gray-900">YOUR CART</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} className="text-gray-900" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={80} className="mx-auto text-gray-300 mb-6" />
                  <p className="text-xl text-gray-600 mb-6 font-bold">Your cart is empty</p>
                  <button
                    onClick={() => { setShowCart(false); scrollTo('products'); }}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-black shadow-xl"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
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
                              <h3 className="font-black text-lg text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600 font-semibold">R{item.price} each</p>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-black">
                              <Minus size={16} />
                            </button>
                            <span className="text-xl font-black w-12 text-center text-gray-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-black">
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-2xl font-black text-red-600">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-600 mb-6">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3 font-bold">
                      <span>Subtotal</span>
                      <span>R{getTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center text-4xl font-black">
                      <span className="text-gray-900">Total</span>
                      <span className="text-red-600">R{getTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(`https://wa.me/27626456655?text=Order Total: R${getTotal()}`, '_blank')}
                    className="w-full py-6 bg-green-600 hover:bg-green-700 rounded-2xl font-black text-xl text-white shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <Phone size={24} />
                    <span>COMPLETE ORDER</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 font-semibold">Secure checkout via WhatsApp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <button
        onClick={() => window.open('https://wa.me/27626456655', '_blank')}
        className="fixed bottom-8 right-8 z-40 p-6 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl transition-all transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <Phone size={32} className="text-white" />
      </button>
    </div>
  );
}

export default App;
