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
    { 
      id: 1, 
      name: 'Plain Hot', 
      price: 35, 
      image: '/images/products/plain-hot.jpg',
      emoji: '🌶️',
      stock: 25, 
      rating: 4.8, 
      reviews: 124, 
      description: 'Pure, unadulterated heat with authentic African peppers.', 
      color: 'from-[#e63900] to-[#ff7a00]', // Updated to your CSS Red/Orange
      badge: 'Bestseller' 
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
      description: 'A smooth, velvety blend with a powerful spicy kick.', 
      color: 'from-[#ff7a00] to-[#ffd000]', // Updated to your CSS Orange/Yellow
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
      description: 'Slow-roasted garlic cloves infused with wild chilies.', 
      color: 'from-[#ffd000] to-[#1abc9c]', // Updated to your CSS Yellow/Green
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
      description: 'Sun-ripened fruit notes with a spicy peri-peri finish.', 
      color: 'from-[#e63900] to-[#ffd000]', 
      badge: 'New' 
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

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#e63900]">
      
      {/* NAVBAR - Kept your structure, applied your CSS variables */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/55 backdrop-blur-[12px] py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <img src="/images/logo.png" alt="Logo" className="h-[60px]" />
            <span className="text-2xl font-black tracking-tighter italic uppercase text-white">Mmanda's</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-semibold">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:bg-[#e63900] px-4 py-2 rounded-[10px] transition-all">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setShowCart(true)} className="relative group p-2 bg-white/10 rounded-full transition-colors hover:bg-white/20">
              <ShoppingCart size={22} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e63900] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <a href="https://wa.me/27626456655" className="hidden md:block bg-[#1abc9c] text-white px-5 py-2.5 rounded-[24px] font-bold text-sm hover:scale-105 transition-transform">
              WhatsApp
            </a>
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Exact original structure with updated CSS visuals */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 text-center px-6 py-[90px] bg-black/55 rounded-[30px] backdrop-blur-sm max-w-4xl border border-white/5">
          <h1 className="text-5xl md:text-[4rem] font-bold uppercase tracking-[3px] leading-tight mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            Experience the <br /><span className="text-[#e63900]">Perfect Heat</span>
          </h1>
          <p className="text-[#cfcfcf] text-lg md:text-[1.4rem] mb-10 max-w-2xl mx-auto">
            Hand-crafted peri-peri sauces born from heritage and refined for the modern table.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-[#e63900] rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-all">
              Shop Now
            </button>
            <button className="px-10 py-4 border border-white/20 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - THE CLEAN WHITE GRID YOU REQUESTED */}
      <section id="products" className="py-32 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[3rem] font-bold mb-4 uppercase tracking-tighter">The Reserve Line</h2>
            <p className="text-black/60 text-[1.05rem]">Premium Selection</p>
          </div>

          <div className="flex flex-wrap justify-center gap-[48px]">
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-[320px] p-[28px] bg-white rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.18)] transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-[18px] bg-white mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-72 object-contain group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {product.badge}
                  </span>
                </div>
                <h3 className="text-[1.35rem] font-bold mb-2 uppercase">{product.name}</h3>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-[1.15rem] font-bold">R{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-3 bg-black text-white rounded-full hover:bg-[#e63900] transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Structure preserved */}
      <section id="about" className="py-32 bg-[radial-gradient(circle_at_top,#111,#000)]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-[60px]">
          <div className="w-full md:w-1/2">
            <img src="/images/hero/about-bg.jpg" className="rounded-[25px] shadow-[0_30px_60px_rgba(0,0,0,0.7)] w-full h-[500px] object-cover" alt="About" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-[3.2rem] font-bold text-[#e63900] mb-6 uppercase">True <br />Craftsmanship.</h2>
            <p className="text-[1.2rem] leading-[1.9] text-[#eee] mb-6">
              Our sauce isn't made in a factory; it's crafted in a kitchen. We source local South African ingredients to ensure that every bottle of Mmanda's speaks volume to the client's palate.
            </p>
            <div className="flex items-center space-x-4 text-[#cfcfcf]">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <Flame className="text-[#e63900] mb-2" />
                <span className="block font-bold">Natural Heat</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <Award className="text-[#ffd000] mb-2" />
                <span className="block font-bold">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Preserving split logic */}
      <section id="contact" className="py-32 bg-black border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[3rem] font-bold mb-8 uppercase text-[#e63900]">Let's Chat.</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-white/5 rounded-[18px]">
                <Mail className="text-[#e63900]" />
                <span className="font-semibold text-lg italic">info@mmandassauces.co.za</span>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-white/5 rounded-[18px]">
                <Instagram className="text-[#e63900]" />
                <span className="font-semibold text-lg italic">@mmandassauces</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-10 rounded-[30px] border border-white/5">
             <form className="space-y-6">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-widest">Full Name</span>
                  <input type="text" className="w-full bg-black border border-white/15 p-4 rounded-xl outline-none focus:border-[#e63900]" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-widest">Message</span>
                  <textarea className="w-full bg-black border border-white/15 p-4 rounded-xl h-32 outline-none focus:border-[#e63900]"></textarea>
                </label>
                <button className="w-full py-5 bg-gradient-to-br from-[#e63900] to-[#ff7a00] rounded-xl font-bold uppercase tracking-widest">Send Inquiry</button>
             </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.5em]">© 2026 Mmanda's Sauces South Africa</p>
      </footer>

      {/* CART DRAWER - Preserved structure, cleaned design */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white text-black h-full shadow-2xl flex flex-col">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Bag</h2>
              <button onClick={() => setShowCart(false)}><X size={28} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">Empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center mb-8 pb-8 border-b border-gray-50">
                    <img src={item.image} className="w-16 h-16 object-contain bg-gray-50 p-2 rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-[#e63900]"><Minus size={14}/></button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-[#e63900]"><Plus size={14}/></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">R{item.price * item.quantity}</div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 font-black uppercase">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-gray-50">
              <div className="flex justify-between text-2xl font-black italic uppercase mb-6">
                <span>Total</span>
                <span>R{getTotal()}</span>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/27626456655?text=Order: R${getTotal()}`, '_blank')}
                className="w-full py-5 bg-[#1abc9c] text-white font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
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
