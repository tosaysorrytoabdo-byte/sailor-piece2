import { ShoppingCart, TrendingUp } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { rarityColors, rarityNames } from '@/data/store';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div 
      className="group relative bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover-lift animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Popular Badge */}
      {product.popular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
          <TrendingUp className="w-3 h-3" />
          الأكثر طلباً
        </div>
      )}

      {/* Stock Badge */}
      {product.stock <= 5 && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full">
          باقي {product.stock}
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rarity Badge */}
        <div className={`inline-block px-3 py-1 text-xs font-bold border rounded-full mb-3 ${rarityColors[product.rarity]}`}>
          {rarityNames[product.rarity]}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">{product.price.toLocaleString()}</span>
            <span className="text-sm text-white/40 mr-1">كوين</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" />
            أضف
          </button>
        </div>
      </div>
    </div>
  );
}
