import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star, Mail, Instagram, ChevronRight } from 'lucide-react';

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
    { id: 1, name: 'Plain Hot', price: 35, image: '/images/products/plain-hot.jpg', rating: 4.8, description: 'The pure essence of African Bird’s Eye chili.' },
    { id: 2, name: 'Creamy Hot', price: 35, image: '/images/products/creamy-hot.jpg', rating: 4.9, description: 'Velvety texture meets a sharp, lingering heat.' },
    { id: 3, name: 'Garlic Infusion', price: 40, image: '/images/products/garlic-infusion.jpg', rating: 4.7, description: 'Slow-roasted garlic blended with wild chilies.' },
    { id: 4, name: 'Sweet & Spicy', price: 38, image: '/images/products/sweet-spicy.jpg', rating: 4.6, description: 'Sun-ripened fruit notes with a spicy finish.' }
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
    <div className="min-h-screen bg-[#000] text-white font-sans antialiased selection:bg-[#e63900]">
      
      {/* NAVBAR - Based on your CSS glass/flex logic */}
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-black/55 backdrop-blur-[12px] shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="/images/logo.png" alt="Logo" className="h-[60px]" />
            <span className="text-2xl font-black uppercase tracking-tighter italic">Mmanda's</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['home', 'about', 'products', 'gallery', 'contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-[14px] font-semibold uppercase tracking-wide hover:bg-[#e63900] px-4 py-2 rounded-[10px] transition-all">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowCart(true)} className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/15 transition relative">
              <ShoppingCart size={18} />
              {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-[#e63900] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{getTotalItems()}</span>}
            </button>
            <a href="https://wa.me/27626456655" className="hidden md:flex items-center gap-2 bg-[#1abc9c] text-white px-[18px] py-[10px] rounded-[24px] font-semibold text-sm hover:scale-105 transition-transform">
              <Phone size={16} /> WhatsApp
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      {/* HERO - Full Viewport 100vh */}
      <section id="home" className="h-screen relative flex items-center justify-center bg-[url('/images/hero-bg.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 text-center px-6 py-[90px] bg-black/55 rounded-[30px] backdrop-blur-sm max-w-4xl border border-white/5">
          <h1 className="text-4xl md:text-[4rem] font-bold uppercase tracking-[3px] leading-tight mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            Artisanal Heat <br /><span className="text-[#e63900]">Redefined.</span>
          </h1>
          <p className="text-[#cfcfcf] text-lg md:text-[1.4rem] mb-10 max-w-2xl mx-auto">
            Sun-dried chilies, small-batch tradition, and bold African soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo('products')} className="px-10 py-4 bg-gradient-to-br from-[#e63900] to-[#ff7a00] text-white font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
              Explore Collection
            </button>
            <button onClick={() => scrollTo('about')} className="px-10 py-4 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/20 transition">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT - Heritage Feel */}
      <section id="about" className="min-h-screen flex items-center py-24 bg-[radial-gradient(circle_at_top,#111,#000)]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-[60px]">
          <img src="/images/hero/about-bg.jpg" alt="Process" className="w-full md:w-[420px] rounded-[25px] shadow-[0_30px_60px_rgba(0,0,0,0.7)] object-cover h-[500px]" />
          <div className="text-left">
            <h2 className="text-[3.2rem] font-bold text-[#e63900] leading-tight mb-6 uppercase tracking-tighter">Beyond The <br />Bottle.</h2>
            <p className="text-[1.2rem] leading-[1.9] text-[#eee] mb-4">
              Mmanda’s follows the Portuguese-African tradition of peri-peri. Every chili is hand-selected, every batch is tasted for perfection. We don't do mass-production; we do flavor.
            </p>
            <p className="text-[0.95rem] text-white/70 italic font-serif">"Crafted for those who respect the flame." — The Founder</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS - Pure White Section from your CSS */}
      <section id="products" className="py-32 bg-white text-black text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[3rem] font-bold mb-4 uppercase tracking-tighter">The Collection</h2>
          <p className="text-black/60 text-[1.05rem] mb-[48px]">Select your preferred intensity</p>
          
          <div className="flex flex-wrap justify-center gap-[48px]">
            {products.map((p) => (
              <div key={p.id} className="w-full sm:w-[320px] p-[28px] bg-white rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.18)] transition-all duration-300">
                <img src={p.image} className="w-full rounded-[18px] bg-white mb-5 transition-transform group-hover:scale-105" alt={p.name} />
                <h3 className="text-[1.35rem] font-bold mb-2 uppercase">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden line-clamp-2">{p.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-[1.15rem] font-bold">R {p.price}.00</span>
                  <button onClick={() => addToCart(p)} className="p-3 bg-black text-white rounded-full hover:bg-[#e63900] transition">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY - Grid Layout */}
      <section id="gallery" className="py-24 bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold uppercase tracking-widest text-center mb-16">The Lifestyle</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-white/5 rounded-2xl overflow-hidden hover:opacity-80 transition cursor-pointer">
                <img src={`/images/gallery/img-${i}.jpg`} className="w-full h-full object-cover" alt="Gallery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Formal Split Grid */}
      <section id="contact" className="py-32 bg-[#050505]">
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-[80px]">
          <div className="text-left">
            <h2 className="text-[3rem] font-bold mb-6 text-[#e63900] uppercase italic">Get In <br />Touch.</h2>
            <p className="text-[#cfcfcf] mb-10 text-lg">We are ready to spice up your next event or retail shelf. Reach out to our team today.</p>
            <div className="space-y-4">
              {[
                { label: 'Instagram', value: '@mmandassauces', icon: <Instagram size={20} /> },
                { label: 'Email Support', value: 'info@mmandassauces.co.za', icon: <Mail size={20} /> },
                { label: 'Direct Line', value: '+27 62 645 6655', icon: <Phone size={20} /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-[22px] rounded-[18px] flex items-center gap-4 hover:bg-white/10 transition">
                  <div className="text-[#e63900]">{item.icon}</div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 p-8 md:p-[50px] rounded-[30px] border border-white/5">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <span className="block mb-2 text-xs font-bold uppercase text-gray-400">Full Name</span>
                <input type="text" className="w-full p-4 bg-black border border-white/15 rounded-[14px] text-white focus:border-[#e63900] outline-none transition" />
              </div>
              <div>
                <span className="block mb-2 text-xs font-bold uppercase text-gray-400">Message</span>
                <textarea rows="4" className="w-full p-4 bg-black border border-white/15 rounded-[14px] text-white focus:border-[#e63900] outline-none transition"></textarea>
              </div>
              <button className="w-full py-5 rounded-[18px] bg-gradient-to-br from-[#e63900] to-[#ff7a00] font-bold text-white uppercase tracking-widest shadow-xl shadow-red-900/20 hover:scale-105 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">© 2026 Mmanda's Sauces South Africa</p>
      </footer>

      {/* CART OVERLAY */}
      {showCart && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white text-black h-full flex flex-col animate-slide-left">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic">Your Selection</h2>
              <button onClick={() => setShowCart(false)} className="hover:rotate-90 transition duration-300"><X size={28} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">Bag is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-6">
                    <img src={item.image} className="w-16 h-16 object-contain" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#e63900]"><Minus size={14}/></button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#e63900]"><Plus size={14}/></button>
                      </div>
                    </div>
                    <span className="font-bold text-sm">R {item.price * item.quantity}</span>
                  </div>
                ))
              )}
            </div>
            <div className="p-8 bg-gray-50">
              <div className="flex justify-between text-2xl font-black uppercase mb-6 italic">
                <span>Total</span>
                <span>R {getTotal()}</span>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/27626456655?text=Order from Website: R${getTotal()}`, '_blank')}
                className="w-full py-5 bg-[#1abc9c] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition"
              >
                Inquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[150] bg-black p-10 flex flex-col items-center justify-center space-y-8">
           <button onClick={() => setMobileMenu(false)} className="absolute top-10 right-10"><X size={32} /></button>
           {['home', 'about', 'products', 'gallery', 'contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-3xl font-black uppercase tracking-widest italic">{item}</button>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
