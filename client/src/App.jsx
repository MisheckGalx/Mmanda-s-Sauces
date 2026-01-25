import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star, Mail, Instagram, Flame, Sparkles, Award, Heart, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { 
      id: 1, 
      name: 'Plain Hot', 
      price: 35, 
      image: '/images/products/plain-hot.jpg',
      emoji: '🌶️',
      stock: 25, 
      rating: 4.8, 
      reviews: 124, 
      description: 'The pure essence of African Bird\'s Eye chili.', 
      color: 'from-[#e31837] to-[#921024]', 
      badge: 'Signature' 
    },
    { 
      id: 2, 
      name: 'Creamy Hot', 
      price: 35, 
      image: '/images/products/creamy-hot.jpg',
      emoji: '🔥',
      stock: 18, 
      rating: 4.9, 
      reviews: 156, 
      description: 'Velvety texture meets a sharp, lingering heat.', 
      color: 'from-[#f37021] to-[#c45311]', 
      badge: 'Popular' 
    },
    { 
      id: 3, 
      name: 'Garlic Infusion', 
      price: 40, 
      image: '/images/products/garlic-infusion.jpg',
      emoji: '🧄',
      stock: 15, 
      rating: 4.7, 
      reviews: 89, 
      description: 'Slow-roasted garlic blended with wild chilies.', 
      color: 'from-[#ffc20e] to-[#d4a00b]', 
      badge: 'Premium' 
    },
    { 
      id: 4, 
      name: 'Sweet & Spicy', 
      price: 38, 
      image: '/images/products/sweet-spicy.jpg',
      emoji: '🍯',
      stock: 20, 
      rating: 4.6, 
      reviews: 98, 
      description: 'Sun-ripened fruit notes with a spicy finish.', 
      color: 'from-[#e31837] to-[#f37021]', 
      badge: 'New Arrival' 
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
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e31837] selection:text-white font-sans antialiased">
      
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollTo('home')}>
            <img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain group-hover:scale-110 transition duration-500" />
            <span className="text-2xl font-black tracking-tighter uppercase italic">Mmanda's</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['home', 'about', 'products', 'gallery', 'contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#e31837] transition">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setShowCart(true)} className="relative group">
              <ShoppingCart size={22} className="group-hover:text-[#e31837] transition" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-3 -right-3 bg-[#e31837] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e31837]/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f37021]/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="inline-block text-[#e31837] font-bold tracking-[0.3em] uppercase text-xs mb-6 animate-fade-in">
            EST. 2026 • South Africa
          </span>
          <h1 className="text-6xl md:text-[120px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            The Heat <br />
            <span className="text-transparent border-b-4 border-[#e31837]" style={{ WebkitTextStroke: '1.5px white' }}>Is Real.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 font-medium">
            Artisanal peri-peri sauces crafted for those who respect the flame. No fillers, just fire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo('products')} className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-[#e31837] hover:text-white transition-all duration-300">
              Shop Collection
            </button>
            <button onClick={() => window.open('https://wa.me/27626456655')} className="w-full sm:w-auto px-10 py-5 border border-white/20 font-black uppercase tracking-widest hover:bg-white/10 transition">
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-900 group">
                <img src="/images/hero/about-bg.jpg" alt="Process" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 scale-105 group-hover:scale-100" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-8">
                Born in the <br /><span className="text-[#e31837]">Kitchen,</span> Built for the <span className="text-[#f37021]">Table.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Mmanda's follows the Portuguese-African tradition of peri-peri. Every chili is hand-selected, every batch is tasted for perfection. We don't do mild—we do flavor.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                {[{l:'Natural', v:'100%'}, {l:'Handcrafted', v:'Small Batch'}].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black uppercase italic text-white">{s.v}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">The Lineup</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest pb-2">Select your poison</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p.id} className="group relative bg-[#f5f5f7] p-8 flex flex-col justify-between transition-all duration-500 hover:bg-[#0a0a0a] hover:text-white">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e31837] mb-2 block">{p.badge}</span>
                    <h3 className="text-2xl font-black uppercase italic mb-4">{p.name}</h3>
                </div>
                
                <div className="py-12 transform group-hover:scale-110 transition duration-500 h-64 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                </div>

                <div>
                    <div className="flex justify-between items-end mb-6">
                        <span className="text-3xl font-black tracking-tighter">R{p.price}</span>
                        <div className="flex items-center text-[10px] font-bold text-gray-400 group-hover:text-gray-500">
                            <Star size={12} className="mr-1 fill-current" /> {p.rating}
                        </div>
                    </div>
                    <button onClick={() => addToCart(p)} className="w-full py-4 bg-black text-white group-hover:bg-[#e31837] text-xs font-black uppercase tracking-widest transition">
                        Add To Cart
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Social */}
      <section id="contact" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-12">Join The Cult.</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <a href="https://instagram.com/mmandassauces" className="group">
                <Instagram size={40} className="mx-auto mb-4 group-hover:text-[#e31837] transition" />
                <span className="text-xs uppercase tracking-widest font-bold">Instagram</span>
            </a>
            <a href="mailto:info@mmandassauces.co.za" className="group">
                <Mail size={40} className="mx-auto mb-4 group-hover:text-[#e31837] transition" />
                <span className="text-xs uppercase tracking-widest font-bold">Email</span>
            </a>
            <a href="tel:+27626456655" className="group">
                <Phone size={40} className="mx-auto mb-4 group-hover:text-[#e31837] transition" />
                <span className="text-xs uppercase tracking-widest font-bold">Call</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-black border-t border-white/5 text-center">
        <div className="text-[150px] font-black uppercase italic leading-none text-white/[0.02] absolute left-0 right-0 pointer-events-none overflow-hidden select-none">
            MMANDA'S MMANDA'S MMANDA'S
        </div>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.5em] relative z-10">
          © 2026 MMANDA'S SAUCES • PROUDLY SOUTH AFRICAN
        </p>
      </footer>

      {/* Cart Modal - Polished */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white text-black h-full shadow-2xl flex flex-col">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Bag</h2>
              <button onClick={() => setShowCart(false)}><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 uppercase text-xs font-bold tracking-widest">Bag is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-100 p-2"><img src={item.image} className="w-full h-full object-contain" /></div>
                    <div className="flex-1">
                        <div className="flex justify-between font-black uppercase text-sm mb-1">
                            <span>{item.name}</span>
                            <span>R{item.price * item.quantity}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-4">Quantity: {item.quantity}</div>
                        <div className="flex items-center space-x-4">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-[#e31837]"><Minus size={14}/></button>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-[#e31837]"><Plus size={14}/></button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-xs font-bold uppercase text-red-500">Remove</button>
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-gray-50 space-y-4">
              <div className="flex justify-between text-2xl font-black uppercase italic">
                <span>Total</span>
                <span>R{getTotal()}</span>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/27626456655?text=Order: R${getTotal()}`, '_blank')}
                className="w-full py-5 bg-black text-white font-black uppercase tracking-widest hover:bg-[#e31837] transition"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
