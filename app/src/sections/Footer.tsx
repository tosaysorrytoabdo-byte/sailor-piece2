import { storeConfig } from '@/data/store';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl rounded-lg">
                S
              </div>
              <span className="text-xl font-bold">SLR</span>
            </div>
            <p className="text-white/50 text-sm">
              متجر متخصص في Sailor Piece - فواكه، سيوف، وخدمات تلفيل
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#fruits" className="text-white/50 hover:text-white transition-colors text-sm">
                  فواكه الشيطان
                </a>
              </li>
              <li>
                <a href="#swords" className="text-white/50 hover:text-white transition-colors text-sm">
                  السيوف الأسطورية
                </a>
              </li>
              <li>
                <a href="#leveling" className="text-white/50 hover:text-white transition-colors text-sm">
                  خدمات التلفيل
                </a>
              </li>
              <li>
                <a href="#orders" className="text-white/50 hover:text-white transition-colors text-sm">
                  تتبع الطلبات
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-2">
              <a
                href={`https://tiktok.com/${storeConfig.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                {storeConfig.tiktok}
              </a>
              <p className="text-white/50 text-sm">{storeConfig.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-sm">
            © 2024 SLR. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
