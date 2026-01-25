import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Phone, Star, Mail, Instagram, Flame, Sparkles, Award, Heart, ArrowRight, ShieldCheck, MapPin, ChevronRight } from 'lucide-react';

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
    { id: 1, name: 'Plain Hot', price: 35, image: '/images/products/plain-hot.jpg', rating: 4.8, description: 'The pure essence of African Bird’s Eye chili.', badge: 'Traditional' },
    { id: 2, name: 'Creamy Hot', price: 35, image: '/images/products/creamy-hot.jpg', rating: 4.9, description: 'Velvety texture meets a sharp, lingering heat.', badge: 'Bestseller' },
    { id: 3, name: 'Garlic Infusion', price: 40, image: '/images/products/garlic-infusion.jpg', rating: 4.7, description: 'Slow-roasted garlic blended with wild chilies.', badge: 'Premium' },
    { id: 4, name: 'Sweet & Spicy', price: 38, image: '/images/products/sweet-spicy.jpg', rating: 4.6, description: 'Sun-ripened fruit notes with a spicy finish.', badge: 'New Arrival' }
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
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      
      {/* PRECISE NAVIGATION */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="text-xl font-black tracking-tighter uppercase italic text-[#e31837]">Mmanda's</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'products', 'gallery', 'contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#e31837] transition">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            <button onClick={() => setShowCart(true)} className="relative p-2 hover:bg-slate-100 rounded-full transition">
              <ShoppingCart size={20} className="text-slate-800" />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-[#e31837] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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

      {/* HERO - Clean, Large, White Space */}
      <section id="home" className="relative min-h-screen flex items-center bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="z-10 text-left order-2 md:order-1">
            <span className="inline-block text-[#e31837] font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
              Premium South African Craft
            </span>
            <h1 className="text-6xl md:text-[90px] font-black leading-[0.9] tracking-tighter uppercase italic mb-6">
              FLAVOR <br /> <span className="text-[#DAA520]">BEFORE</span> <br /> FIRE.
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-md mb-8 font-medium leading-relaxed">
              Experience the artisanal peri-peri heritage. Bottled fresh, small-batch, and purely natural.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('products')} className="px-10 py-4 bg-[#e31837] text-white font-extrabold uppercase tracking-widest hover:bg-black transition-all">
                Shop Collection
              </button>
              <button onClick={() => window.open('https://wa.me/27626456655')} className="px-10 py-4 border-2 border-slate-200 text-slate-900 font-extrabold uppercase tracking-widest hover:bg-slate-100 transition">
                Order via WhatsApp
              </button>
            </div>
          </div>
          <div className="relative order-1 md:order-2 flex justify-center">
            <div className="absolute inset-0 bg-[#e31837]/5 rounded-full blur-3xl transform scale-75"></div>
            <img src="/images/hero/hero-bg.jpg" alt="Featured Product" className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ABOUT - White Commercial Style */}
      <section id="about" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-[#f2f2f2] rounded-3xl overflow-hidden aspect-video md:aspect-square flex items-center justify-center">
                <img src="/images/hero/about-bg.jpg" className="w-full h-full object-cover" alt="The Process" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">Built on <span className="text-[#e31837]">Heritage.</span></h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Mmanda's isn't just a sauce; it's a family tradition. We use the finest African Bird's Eye chilies, hand-selected and blended with a secret mix of herbs and citrus to create a balance that speaks volume to the palette.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest text-[#DAA520] mb-2">100% Natural</h4>
                  <p className="text-sm text-slate-500 font-medium">No artificial preservatives or colorants. Purely from the earth.</p>
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest text-[#DAA520] mb-2">Small Batch</h4>
                  <p className="text-sm text-slate-500 font-medium">Crafted in controlled quantities to ensure maximum freshness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS - The "Nike" Grid */}
      <section id="products" className="py-24 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-black tracking-tighter uppercase italic">The Collection</h2>
            <button className="hidden md:flex items-center text-xs font-bold uppercase tracking-widest text-[#e31837]">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
                <div className="aspect-square mb-6 bg-[#fcfcfc] rounded-xl overflow-hidden flex items-center justify-center relative">
                    <span className="absolute top-3 left-3 bg-[#e31837] text-white text-[9px] font-black px-2 py-1 uppercase">{p.badge}</span>
                    <img src={p.image} className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500" alt={p.name} />
                </div>
                <h3 className="text-xl font-extrabold uppercase italic mb-1">{p.name}</h3>
                <p className="text-slate-400 text-xs mb-4 line-clamp-1">{p.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-black tracking-tighter">R {p.price}</span>
                    <button onClick={() => addToCart(p)} className="p-3 bg-slate-900 text-white rounded-full hover:bg-[#e31837] transition">
                        <Plus size={20} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY - The Missing Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-12 text-center">In The Kitchen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden hover:opacity-90 transition">
                <img src={`/images/gallery/img-${i}.jpg`} className="w-full h-full object-cover" alt="Gallery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & SOCIAL */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-black uppercase italic mb-12">Join the Club.</h2>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-2">
                    <Instagram size={32} className="mx-auto text-[#DAA520] mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">Instagram</p>
                    <p className="text-slate-400">@mmandassauces</p>
                </div>
                <div className="space-y-2">
                    <Mail size={32} className="mx-auto text-[#DAA520] mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">Email</p>
                    <p className="text-slate-400">info@mmandassauces.co.za</p>
                </div>
                <div className="space-y-2 text-[#25D366]">
                    <Phone size={32} className="mx-auto mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">WhatsApp Order</p>
                    <p className="text-slate-100 font-bold">+27 62 645 6655</p>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-white border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">
          © 2026 Mmanda's Sauces South Africa
        </p>
      </footer>

      {/* CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Bag</h2>
              <button onClick={() => setShowCart(false)} className="hover:rotate-90 transition duration-300"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-400 uppercase text-xs font-bold tracking-widest">Bag is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 mb-8 items-center border-b border-slate-50 pb-8">
                    <div className="w-20 h-20 bg-slate-50 rounded-lg p-2 flex items-center justify-center">
                        <img src={item.image} className="max-h-full object-contain" alt={item.name} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between font-bold uppercase text-sm mb-2">
                            <span>{item.name}</span>
                            <span>R {item.price * item.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#e31837]"><Minus size={14}/></button>
                            <span className="font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#e31837]"><Plus size={14}/></button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto"><Trash2 size={16} className="text-slate-300 hover:text-red-500" /></button>
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-8 bg-slate-50">
              <div className="flex justify-between text-2xl font-black mb-6 italic uppercase tracking-tighter">
                <span>Total</span>
                <span>R {getTotal()}</span>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/27626456655?text=Order from Website: R${getTotal()}`, '_blank')}
                className="w-full py-5 bg-[#e31837] text-white font-black uppercase tracking-widest hover:bg-black transition shadow-xl shadow-red-500/20"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON - Fixed */}
      <button
        onClick={() => window.open('https://wa.me/27626456655', '_blank')}
        className="fixed bottom-8 right-8 z-40 p-5 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <Phone size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold uppercase text-xs tracking-widest">Chat Now</span>
      </button>

    </div>
  );
}

export default App;
