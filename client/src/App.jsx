import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star, Mail, Instagram, Flame, Sparkles, Award, Heart, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

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
    { 
      id: 1, 
      name: 'Plain Hot', 
      price: 35, 
      image: '/images/products/plain-hot.jpg',
      emoji: '🌶️',
      stock: 25, 
      rating: 4.8, 
      reviews: 124, 
      description: 'The authentic taste of tradition. Pure African bird’s eye chili blend.', 
      color: 'bg-[#8B0000]', // Deep Burgundy
      badge: 'Traditional' 
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
      description: 'A sophisticated, velvety blend with a slow-burning finish.', 
      color: 'bg-[#B22222]', 
      badge: 'Chef\'s Choice' 
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
      description: 'Roasted garlic cloves infused with our signature spice oils.', 
      color: 'bg-[#DAA520]', // Golden
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
      description: 'Balancing sun-ripened sweetness with a bold peri-peri kick.', 
      color: 'bg-[#5C4033]', // Earthy Brown
      badge: 'New Blend' 
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
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-serif antialiased">
      
      {/* Formal Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/95 border-white/10 py-3 shadow-xl' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="/images/logo.png" alt="Mmanda's Logo" className="w-14 h-14 object-contain" />
            <div className="leading-tight">
              <h1 className="text-2xl font-bold tracking-[0.1em] text-white uppercase">Mmanda's</h1>
              <p className="text-[10px] text-[#DAA520] tracking-[0.3em] font-sans uppercase font-bold">Peri-Peri Heritage</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10 font-sans">
            {['home', 'about', 'products', 'gallery', 'contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-[#DAA520] transition-colors">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setShowCart(true)} className="relative hover:scale-110 transition">
              <ShoppingCart size={20} className="text-white" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8B0000] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white/20">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Commercial Presentation */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-[1px] bg-[#DAA520] self-center"></div>
            <span className="mx-4 text-[#DAA520] font-sans text-xs font-black tracking-[0.4em] uppercase">Est. 2026</span>
            <div className="w-16 h-[1px] bg-[#DAA520] self-center"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight text-white uppercase italic">
            Artisanal <span className="text-[#8B0000] block not-italic">Peri-Peri</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 font-sans max-w-2xl mx-auto leading-relaxed italic">
            Experience the soul of South African heat. Crafted in small batches using sun-dried chilies and heritage recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center font-sans">
            <button onClick={() => scrollTo('products')} className="px-12 py-4 bg-[#8B0000] text-white font-bold uppercase tracking-widest hover:bg-[#A52A2A] transition-all shadow-2xl">
              Shop The Collection
            </button>
            <button onClick={() => window.open('https://wa.me/27626456655')} className="px-12 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition">
              Direct Order
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Formal Content */}
      <section id="about" className="py-32 px-6 bg-[#161616]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#DAA520]/30"></div>
              <img src="/images/hero/about-bg.jpg" alt="Our Craft" className="relative z-10 w-full h-[600px] object-cover grayscale-[30%]" />
            </div>
            <div className="space-y-8">
              <span className="text-[#DAA520] font-sans text-xs font-black tracking-[0.4em] uppercase">The Mmanda's Story</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">The Quality of <br /><span className="italic">True Spice.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed font-sans">
                Unlike mass-produced sauces, Mmanda’s is built on the philosophy of "Fire & Flavor." We use 100% natural ingredients, zero preservatives, and a slow-aging process that allows the peri-peri peppers to develop their full character.
              </p>
              <div className="grid grid-cols-2 gap-10 border-y border-white/10 py-10">
                <div>
                  <h4 className="text-[#DAA520] font-bold uppercase text-xs tracking-widest mb-2">Purity</h4>
                  <p className="text-sm text-gray-400">No Artificial Colors or Flavors</p>
                </div>
                <div>
                  <h4 className="text-[#DAA520] font-bold uppercase text-xs tracking-widest mb-2">Origin</h4>
                  <p className="text-sm text-gray-400">Hand-Picked South African Chilies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Serious Grid */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">The Reserve Collection</h2>
            <div className="w-24 h-1 bg-[#8B0000] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map((p) => (
              <div key={p.id} className="group">
                <div className="relative aspect-[3/4] bg-[#1a1a1a] mb-6 overflow-hidden border border-white/5 group-hover:border-[#DAA520]/40 transition-all duration-500">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] bg-black/80 text-[#DAA520] px-3 py-1 font-bold uppercase tracking-widest border border-[#DAA520]/30">{p.badge}</span>
                  </div>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <h3 className="text-xl font-bold uppercase mb-2 text-white">{p.name}</h3>
                <p className="text-xs text-gray-500 font-sans mb-4 h-10 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-white tracking-tighter">R {p.price}.00</span>
                  <div className="flex text-[#DAA520]"><Star size={12} className="fill-current" /> <span className="text-[10px] ml-1 font-bold text-white">{p.rating}</span></div>
                </div>
                <button onClick={() => addToCart(p)} className="w-full py-4 border border-white/20 font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition duration-300">
                  Add To Selection
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formal Contact */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold uppercase tracking-[0.2em] mb-16">Connect With The Brand</h2>
          <div className="grid md:grid-cols-3 gap-16 font-sans">
            <div className="space-y-4">
              <Phone size={24} className="mx-auto text-[#DAA520]" />
              <h5 className="uppercase text-[10px] font-black tracking-widest text-gray-500">Direct Inquiries</h5>
              <p className="text-lg font-bold">+27 62 645 6655</p>
            </div>
            <div className="space-y-4">
              <Mail size={24} className="mx-auto text-[#DAA520]" />
              <h5 className="uppercase text-[10px] font-black tracking-widest text-gray-500">Electronic Mail</h5>
              <p className="text-lg font-bold">info@mmandassauces.co.za</p>
            </div>
            <div className="space-y-4">
              <Instagram size={24} className="mx-auto text-[#DAA520]" />
              <h5 className="uppercase text-[10px] font-black tracking-widest text-gray-500">Visual Journal</h5>
              <p className="text-lg font-bold">@mmandassauces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-center border-t border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-600">
          © 2026 Mmanda's Sauces South Africa • Excellence in Every Bottle
        </p>
      </footer>

      {/* Refined Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-[#0F0F0F] border-l border-white/10 h-full flex flex-col">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest">Your Selection</h2>
              <button onClick={() => setShowCart(false)} className="hover:rotate-90 transition duration-300"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em] py-20">Your cart is currently empty</p>
              ) : (
                <div className="space-y-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-6 items-center border-b border-white/5 pb-8">
                      <div className="w-20 h-20 bg-white/5 p-2"><img src={item.image} className="w-full h-full object-contain" alt={item.name} /></div>
                      <div className="flex-1">
                        <div className="flex justify-between font-bold text-sm uppercase mb-2">
                          <span>{item.name}</span>
                          <span>R {item.price * item.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center border border-white/20">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white/10"><Minus size={12}/></button>
                            <span className="px-4 text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white/10"><Plus size={12}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase font-black text-[#8B0000]">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-8 bg-black">
              <div className="flex justify-between text-2xl font-bold uppercase mb-6">
                <span className="text-gray-500">Subtotal</span>
                <span>R {getTotal()}</span>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/27626456655?text=Order from Website: R${getTotal()}`, '_blank')}
                className="w-full py-5 bg-[#8B0000] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#A52A2A] transition"
              >
                Complete Inquiry via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
