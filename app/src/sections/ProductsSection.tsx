import { Package, Sword, TrendingUp } from 'lucide-react';
import { fruits, swords, levelingServices } from '@/data/store';
import ProductCard from '@/components/ProductCard';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  products: typeof fruits;
}

function ProductSection({ id, title, subtitle, icon, products }: SectionProps) {
  return (
    <section id={id} className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">{title}</h2>
            <p className="text-white/50">{subtitle}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductsSection() {
  return (
    <>
      {/* Fruits Section */}
      <ProductSection
        id="fruits"
        title="فواكه الشيطان"
        subtitle="جميع الفواكه المتوفرة في Sailor Piece"
        icon={<Package className="w-6 h-6 text-white" />}
        products={fruits}
      />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Swords Section */}
      <ProductSection
        id="swords"
        title="السيوف الأسطورية"
        subtitle="نساعدك في الحصول على أي سيف تريده"
        icon={<Sword className="w-6 h-6 text-white" />}
        products={swords}
      />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Leveling Section */}
      <ProductSection
        id="leveling"
        title="خدمات التلفيل"
        subtitle="نوصل حسابك لفل ماكس بأسرع وقت"
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        products={levelingServices}
      />
    </>
  );
}
