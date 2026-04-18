import { useState, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Recycle, Zap, CheckCircle2, ShoppingBag, Trash2, Key, Star, Loader2 } from 'lucide-react';
import { saveLead } from './lib/firebase';

import logoImg from './assets/v3-logo.png';
import productImg from './assets/v3-product.png';
import lifestyleImg from './assets/v3-lifestyle.png';
import recycleImg from './assets/v3-recycle.png';
import bioImg from './assets/v3-bio.png';
import wasteFreeImg from './assets/v3-waste-free.png';
import holdsUptoImg from './assets/v3-holds-upto.png';

const ProductIllustration = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: -20 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
    className="w-full -mx-0 md:-mx-0 flex justify-center"
  >
    <img 
      src={productImg}
      alt="MESH BAG PRODUCT" 
      className="w-full max-w-none h-auto object-cover"
    />
  </motion.div>
);

const TickerTape = () => {
  const icons = [
    { src: recycleImg, alt: "Recycle" },
    { src: bioImg, alt: "Bio" },
    { src: wasteFreeImg, alt: "Waste-free" },
    { src: holdsUptoImg, alt: "Holds Upto" },
  ];
  
  // Double the icons for seamless loop
  const displayIcons = [...icons, ...icons, ...icons, ...icons, ...icons];

  return (
    <div className="w-full overflow-hidden bg-white py-4 mb-10">
      <motion.div 
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: [ -1200, 0] }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear"
        }}
      >
        {displayIcons.map((icon, i) => (
          <div key={i} className="shrink-0">
            <img 
              src={icon.src} 
              alt={icon.alt} 
              className="h-20 md:h-28 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SectionHeading = ({ children, size = "large", centered = false }: { children: ReactNode, color?: string, size?: "large" | "small", centered?: boolean }) => (
  <div className={`flex flex-col mb-8 ${centered ? 'items-center text-center w-full' : ''}`}>
    <h2 className={`font-display font-black uppercase tight-text flex items-center gap-4 ${size === 'small' ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'} ${centered ? 'justify-center' : ''}`}>
       {children}
    </h2>
  </div>
);

export default function App() {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    if (!selectedPrice) {
      setError("Please select a price preference first!");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      await saveLead(email, selectedPrice);
      setSubmitted(true);
    } catch (err) {
      console.error("Database save error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper min-h-screen border-x-2 border-ink max-w-2xl mx-auto shadow-[12px_0_0_#ffcc00,-12px_0_0_#ff3b3b]">
      {/* NAV */}
      <nav className="border-b-2 border-ink p-6 flex flex-col items-center gap-4 bg-white sticky top-0 z-50">
        <img 
          src={logoImg} 
          alt="THE MESH" 
          className="h-14 md:h-18 w-auto object-contain" 
        />
        <div className="bg-primary-yellow border border-ink px-3 py-1 font-bold text-xs uppercase">Pre-Build</div>
      </nav>

      <main className="p-6 md:p-10">
        {/* HERO */}
        <section className="mb-12 text-center md:text-left">
          <h1 className="font-display text-2xl md:text-4xl font-black uppercase tight-text mb-4 whitespace-nowrap overflow-hidden">
            Packs Smart. <span className="text-primary-red">Thinks</span> Big.
          </h1>
          <div className="mb-4 max-w-lg">
            <p className="font-black text-xl md:text-2xl leading-tight mb-2">
              Designed for smart people <br className="hidden md:block" /> who’d like to skip the trash.
            </p>
            <p className="font-medium text-[8px] leading-tight text-ink/80">
              A bio-degradable bag charm that zaps into a reusable mesh-bag in seconds!
            </p>
          </div>
          
          <div className="flex justify-center md:justify-start mb-6 -mx-6 md:-mx-10 overflow-hidden text-center">
            <ProductIllustration />
          </div>

          <div className="flex flex-col gap-4">
            <a href="#survey" className="brutalist-button bg-primary-yellow text-center active:bg-primary-yellow/80">Reserve Access</a>
          </div>
        </section>


        {/* HOW IT WORKS */}
        <section id="how" className="mb-12">
          <SectionHeading size="small">One object. Two lives.</SectionHeading>
          <div className="space-y-4 mb-8">
            {[
              { n: "01", t: "CLIP", d: "Lives on your keys. Weighs zero." },
              { n: "02", t: "UNZIP", d: "Opens in 5 seconds." },
              { n: "03", t: "CRUMPLE", d: "Done shopping? Stuff & zap. No folding." }
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start pl-0 py-1">
                <span className="font-display text-3xl font-black text-primary-blue leading-none">{s.n}</span>
                <div>
                   <h3 className="font-black uppercase text-lg mb-0">{s.t}</h3>
                   <p className="font-medium text-xs text-ink/60 leading-tight">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* ICON TICKER TAPE */}
          <TickerTape />
        </section>

        {/* PRICING SURVEY */}
        <section id="survey" className="mb-12">
          <SectionHeading size="small" centered>Help us set the right price</SectionHeading>
          
          <div className="mb-8 -mt-4 -mx-6 md:-mx-10 overflow-hidden">
            <img 
              src={lifestyleImg} 
              alt="Lifestyle" 
              className="w-full h-auto object-cover" 
            />
          </div>

          <div className="border-2 border-ink p-6 md:p-10 bg-white">
            {!submitted ? (
              <div className="space-y-8">
                <p className="font-display font-medium text-2xl uppercase tracking-tighter leading-none italic text-center">
                  What would you pay for The Mesh?
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "$24", label: "GOOD VALUE" },
                    { val: "$32", label: "FAIR FOR SUSTAINABLE" },
                    { val: "$42", label: "WORTH IT" },
                    { val: "$55", label: "PREMIUM FEELS RIGHT" }
                  ].map((p) => (
                    <motion.button
                      key={p.val}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPrice(p.val)}
                      className={`brutalist-button py-6 flex flex-col items-center justify-center transition-colors ${
                        selectedPrice === p.val 
                          ? 'bg-primary-red text-white' 
                          : 'bg-primary-blue text-white hover:bg-primary-blue/90'
                      }`}
                    >
                      <span className="text-3xl font-display font-bold leading-none mb-1">{p.val}</span>
                      <span className="text-[7px] font-medium tracking-widest opacity-90">{p.label}</span>
                    </motion.button>
                  ))}
                </div>

                  <form onSubmit={handleSubmit} className="space-y-3" name="lead-capture">
                    <input
                      id="email-input"
                      name="email"
                      type="email"
                      placeholder="ENTER YOUR EMAIL"
                      value={email}
                      disabled={loading}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-ink p-4 font-black uppercase text-sm focus:outline-none focus:bg-zinc-50 disabled:opacity-50"
                    />
                    <button 
                      id="submit-button"
                      name="submit"
                      type="submit"
                    disabled={loading || !isValidEmail(email)}
                    className="w-full border-2 border-ink px-6 py-4 font-bold uppercase tracking-tight bg-primary-red text-white text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-primary-red/90"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'JOIN LIST'}
                  </button>
                  {error && (
                    <p className="text-primary-red text-xs font-bold uppercase text-center">{error}</p>
                  )}
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center py-10"
              >
                <h3 className="font-display text-4xl font-black uppercase mb-4 text-primary-blue">CONFIRMED.</h3>
                <p className="font-bold">You'll hear from us when the mesh drops.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink p-10 bg-zinc-100 text-center space-y-4">
        <p className="font-black text-xs uppercase">© THE MESH 2026 — DESIGNED FOR SMART COMMUTERS</p>
        <p className="text-xl text-primary-red font-mono uppercase tracking-[0.2em] font-black">Build Revision: 2.0.5-V3</p>
        <div className="flex justify-center gap-6">
           <Zap className="w-5 h-5 text-primary-yellow" />
           <Recycle className="w-5 h-5 text-primary-blue" />
           <Leaf className="w-5 h-5 text-primary-red" />
        </div>
        <p className="text-[0.6rem] font-bold text-ink/40 uppercase tracking-widest">The Meg + Pal Co.</p>
      </footer>
    </div>
  );
}
