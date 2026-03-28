import { useEffect, useState } from 'react';
import { ChevronDown, Zap, ShieldCheck, Clock } from 'lucide-react';
import { useStoreConfig } from '@/hooks/useStoreConfig';

export default function Hero() {
  const { config } = useStoreConfig();
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24 pb-16">
        
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10 text-sm text-white/60 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          أفضل متجر Sailor Piece
        </div>

        {/* Logo */}
        <h1 className={`text-[120px] sm:text-[160px] font-black leading-none tracking-tighter mb-2 transition-all duration-700 delay-100 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ background: 'linear-gradient(180deg,#fff 40%,#444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          SLR
        </h1>

        <p className={`text-white/40 text-lg mb-3 transition-all duration-700 delay-200 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          فواكه الشيطان &bull; السيوف الأسطورية &bull; خدمات التلفيل
        </p>
        <p className={`text-white/20 text-sm mb-10 transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          Sailor Piece Store
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-center mb-16 transition-all duration-700 delay-400 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#fruits" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-black hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
            تصفح المنتجات
          </a>
          <a href={`https://tiktok.com/${config.tiktok}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/15 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            تواصل عبر تيك توك
          </a>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-4 max-w-sm mx-auto transition-all duration-700 delay-500 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, val: '100%', label: 'أمان' },
            { icon: <Clock className="w-4 h-4 text-blue-400" />, val: '24/7', label: 'دعم' },
            { icon: <Zap className="w-4 h-4 text-amber-400" />, val: '18+', label: 'منتج' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 p-3 bg-white/3 border border-white/8 rounded-xl">
              {s.icon}
              <span className="text-white font-black text-lg">{s.val}</span>
              <span className="text-white/30 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#fruits" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 hover:text-white/50 transition-colors">
        <span className="text-xs">اكتشف</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
