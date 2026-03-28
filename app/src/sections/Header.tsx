import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useStoreConfig } from '@/hooks/useStoreConfig';

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const { config } = useStoreConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'الفواكه', href: '#fruits' },
    { name: 'السيوف', href: '#swords' },
    { name: 'التلفيل', href: '#leveling' },
    { name: 'الطلبات', href: '#orders' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl rounded-lg group-hover:scale-110 transition-transform duration-300">S</div>
              <span className="text-xl font-bold tracking-wider">{config.name.toUpperCase()}</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300">{link.name}</a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsOpen(true)} className="relative w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
              </button>
              <a href={`https://tiktok.com/${config.tiktok}`} target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                تواصل
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
        <nav className="absolute top-20 left-4 right-4 bg-neutral-950 border border-white/10 rounded-2xl p-4">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300">{link.name}</a>
          ))}
          <a href={`https://tiktok.com/${config.tiktok}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-white text-black rounded-lg font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            تواصل عبر تيك توك
          </a>
        </nav>
      </div>
    </>
  );
}
