import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap, TrendingUp } from 'lucide-react';
import { storeConfig } from '@/data/store';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Zap className="w-4 h-4 text-white" />
          <span className="text-sm text-white/70">أفضل متجر Sailor Piece</span>
        </div>

        {/* Main Title */}
        <h1 
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-gradient">SLR</span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-xl sm:text-2xl text-white/60 mb-4 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Sailor Piece Store
        </p>

        <p 
          className={`text-lg text-white/40 max-w-xl mx-auto mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          فواكه الشيطان • السيوف الأسطورية • خدمات التلفيل
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#fruits"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <TrendingUp className="w-5 h-5" />
            تصفح المنتجات
          </a>
          <a
            href={`https://tiktok.com/${storeConfig.tiktok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            تواصل عبر تيك توك
          </a>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '18+', label: 'منتج' },
            { value: '24/7', label: 'دعم' },
            { value: '100%', label: 'أمان' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#fruits"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
      >
        <span className="text-sm">اكتشف المزيد</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}
