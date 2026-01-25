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
    { id: 1, name: 'Plain Hot', price: 35, image: '🌶️', stock: 25, rating: 4.8, reviews: 124, description: 'Pure, unadulterated heat with authentic African peppers.', color: 'from-red-500 to-orange-600', badge: 'Bestseller' },
    { id: 2, name: 'Creamy Hot', price: 35, image: '🔥', stock: 18, rating: 4.9, reviews: 156, description: 'Smooth and creamy with a perfect kick.', color: 'from-orange-500 to-yellow-500', badge: 'Fan Favorite' },
    { id: 3, name: 'Garlic Infusion', price: 40, image: '🧄', stock: 15, rating: 4.7, reviews: 89, description: 'Bold garlic meets fiery heat.', color: 'from-purple-500 to-pink-500', badge: 'Premium' },
    { id: 4, name: 'Sweet & Spicy', price: 38, image: '🍯', stock: 20, rating: 4.6, reviews: 98, description: 'Honey-sweetened with a spicy finish.', color: 'from-yellow-500 to-red-500', badge: 'New' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-red-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollTo('home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative text-5xl transform group-hover:scale-110 transition">🌶️</div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Mmanda's
                </h1>
                <p className="text-xs font-medium text-gray-400 tracking-widest">PREMIUM HOT SAUCES</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'products', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className="px-6 py-2 text-gray-300 hover:text-white font-medium capitalize transition-all hover:bg-white/5 rounded-full"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-110"
              >
                <ShoppingCart size={22} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-3 hover:bg-white/5 rounded-full transition">
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden py-4 space-y-2">
              {['home', 'about', 'products', 'contact'].map(section => (
                <button key={section} onClick={() => scrollTo(section)} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl capitalize transition">
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <Sparkles className="text-yellow-400" size={18} />
            <span className="text-sm font-medium">Handcrafted in South Africa</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
            <span className="block bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
              Flavor
            </span>
            <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              That Fires
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Premium hot sauces crafted with pure ingredients. No preservatives. Just bold, authentic heat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollTo('products')}
              className="group px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold text-lg shadow-2xl shadow-red-500/50 hover:shadow-red-500/80 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
            </button>
            <button
              onClick={() => window.open('https://wa.me/27626456655', '_blank')}
              className="px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>WhatsApp Order</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: <Award className="text-yellow-400" size={32} />, value: '4.8★', label: 'Rated' },
              { icon: <Flame className="text-red-400" size={32} />, value: '100%', label: 'Natural' },
              { icon: <Heart className="text-pink-400" size={32} />, value: '1000+', label: 'Customers' }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition group">
                <div className="flex justify-center mb-3 group-hover:scale-110 transition">{stat.icon}</div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition"></div>
              <div className="relative p-12 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10">
                <div className="text-9xl text-center mb-8 transform group-hover:scale-110 transition">🌶️</div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-center text-gray-400 text-sm">Trusted by 1000+ spice lovers</p>
              </div>
            </div>

            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-500/30 mb-6">
                <span className="text-sm font-bold text-red-400">OUR STORY</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Crafted with
                <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Passion & Fire
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Every bottle of Mmanda's Sauces is a celebration of African heat and artisanal craft. 
                We blend tradition with innovation to create sauces that elevate every meal.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '🌿', text: '100% Natural' },
                  { icon: '🔥', text: 'Bold Flavor' },
                  { icon: '🏆', text: 'Award Winning' },
                  { icon: '🇿🇦', text: 'Proudly SA' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition group">
                    <span className="text-3xl group-hover:scale-125 transition">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo('products')}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105"
              >
                Discover Our Sauces
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full border border-orange-500/30 mb-6">
              <span className="text-sm font-bold text-orange-400">OUR COLLECTION</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Premium Sauces
              </span>
            </h2>
            <p className="text-xl text-gray-400">Crafted in small batches. Packed with flavor.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, idx) => (
              <div key={p.id} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-20 blur-2xl transition duration-500`}></div>

                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden group-hover:border-white/30 transition-all duration-500 transform group-hover:-translate-y-2">
                  
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 bg-gradient-to-r ${p.color} rounded-full text-xs font-bold shadow-lg`}>
                      {p.badge}
                    </span>
                  </div>

                  <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-20`}></div>
                    <div className="relative text-8xl transform group-hover:scale-125 group-hover:rotate-12 transition duration-500">
                      {p.image}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-black">{p.name}</h3>
                      <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 rounded-lg">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{p.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{p.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                          R{p.price}
                        </div>
                        <div className="text-xs text-gray-500">{p.stock} in stock</div>
                      </div>
                      <div className="text-xs text-gray-400">{p.reviews} reviews</div>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className={`w-full py-4 bg-gradient-to-r ${p.color} rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30 mb-6">
              <span className="text-sm font-bold text-green-400">GET IN TOUCH</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-xl text-gray-400">Questions? Orders? We're here to help.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => window.open('tel:+27626456655')}
              className="group relative p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 blur-2xl transition"></div>
              <div className="relative inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Phone size={28} />
              </div>
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Phone</div>
              <div className="text-lg font-bold">+27 62 645 6655</div>
            </button>

            <button
              onClick={() => window.open('mailto:info@mmandassauces.co.za')}
              className="group relative p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-2xl transition"></div>
              <div className="relative inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Mail size={28} />
              </div>
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Email</div>
              <div className="text-lg font-bold">info@mmandassauces.co.za</div>
            </button>

            <button
              onClick={() => window.open('https://instagram.com/mmandassauces', '_blank')}
              className="group relative p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-2xl transition"></div>
              <div className="relative inline-flex p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition">
                <Instagram size={28} />
              </div>
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Instagram</div>
              <div className="text-lg font-bold">@mmandassauces</div>
            </button>
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-4xl">🌶️</div>
            <h3 className="text-2xl font-black">Mmanda's Sauces</h3>
          </div>
          <p className="text-gray-500 text-sm mb-2">Handcrafted • Authentic • Bold</p>
          <p className="text-gray-600 text-xs">© 2026 All rights reserved. Made with love in South Africa</p>
        </div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black h-full overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-white/10 rounded-full transition">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={80} className="mx-auto text-gray-700 mb-6" />
                  <p className="text-xl text-gray-400 mb-6">Your cart is empty</p>
                  <button
                    onClick={() => { setShowCart(false); scrollTo('products'); }}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold shadow-xl hover:shadow-2xl transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-4xl">{item.image}</div>
                            <div>
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <p className="text-sm text-gray-400">R{item.price} each</p>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 transition">
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
                              <Minus size={16} />
                            </button>
                            <span className="text-xl font-bold w-12 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-2xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mb-6">
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                      <span>Subtotal</span>
                      <span className="font-semibold">R{getTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center text-3xl font-black">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        R{getTotal()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(`https://wa.me/27626456655?text=Order Total: R${getTotal()}`, '_blank')}
                    className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <Phone size={22} />
                    <span>Complete Order on WhatsApp</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">Secure checkout via WhatsApp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => window.open('https://wa.me/27626456655', '_blank')}
        className="fixed bottom-8 right-8 z-40 p-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all transform hover:scale-110"
        title="Chat on WhatsApp"
      >
        <Phone size={28} />
      </button>
    </div>
  );
}

export default App;
