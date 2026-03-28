import { ShoppingCart, Flame, Swords, TrendingUp, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

const rarityConfig: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  common:    { color: 'text-slate-300',  bg: 'bg-slate-500/10',   border: 'border-slate-500/30',   glow: '' },
  uncommon:  { color: 'text-emerald-400',bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10' },
  rare:      { color: 'text-blue-400',   bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    glow: 'shadow-blue-500/10' },
  epic:      { color: 'text-purple-400', bg: 'bg-purple-500/10',  border: 'border-purple-500/30',  glow: 'shadow-purple-500/20' },
  legendary: { color: 'text-amber-400',  bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   glow: 'shadow-amber-500/20' },
  mythical:  { color: 'text-rose-400',   bg: 'bg-rose-500/10',    border: 'border-rose-500/30',    glow: 'shadow-rose-500/20' },
};

const rarityNames: Record<string, string> = {
  common: 'عادي', uncommon: 'غير شائع', rare: 'نادر',
  epic: 'ملحمي', legendary: 'أسطوري', mythical: 'أسطوري+',
};

const typeIcon: Record<string, React.ReactNode> = {
  fruit:    <Flame className="w-3 h-3" />,
  sword:    <Swords className="w-3 h-3" />,
  leveling: <TrendingUp className="w-3 h-3" />,
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const r = rarityConfig[product.rarity] || rarityConfig.common;

  return (
    <div
      className={`group relative flex flex-col bg-neutral-900 border ${r.border} rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${r.glow} animate-fadeInUp`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Popular badge */}
      {product.popular && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 bg-amber-400 text-black text-xs font-black rounded-full">
          <Star className="w-3 h-3 fill-current" /> الأكثر طلباً
        </div>
      )}

      {/* Stock badge */}
      {product.stock <= 3 && product.stock > 0 && (
        <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
          باقي {product.stock} فقط!
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 bg-neutral-800 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-6xl">?</div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent`} />
        
        {/* Type icon */}
        <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 ${r.bg} ${r.color} text-xs font-bold rounded-full border ${r.border}`}>
          {typeIcon[product.type]}
          {rarityNames[product.rarity]}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-bold text-white text-base leading-tight mb-1">{product.name}</h3>
          <p className="text-white/40 text-xs line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <span className={`text-xl font-black ${r.color}`}>{product.price.toLocaleString()}</span>
            <span className="text-white/30 text-xs mr-1">كوين</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
              product.stock === 0
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : `${r.bg} ${r.color} border ${r.border} hover:brightness-125 active:scale-95`
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.stock === 0 ? 'نفد' : 'أضف'}
          </button>
        </div>
      </div>
    </div>
  );
}
