import { useState } from 'react';
import { CartProvider } from '@/hooks/useCart';
import { OrdersProvider } from '@/hooks/useOrders';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import ProductsSection from '@/sections/ProductsSection';
import OrdersSection from '@/sections/OrdersSection';
import Footer from '@/sections/Footer';
import Cart from '@/sections/Cart';
import AdminDashboard from '@/sections/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  if (currentPage === 'admin') {
    return (
      <OrdersProvider>
        <AdminDashboard onExit={() => setCurrentPage('home')} />
      </OrdersProvider>
    );
  }

  return (
    <CartProvider>
      <OrdersProvider>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Hero />
            <ProductsSection />
            <OrdersSection />
          </main>
          <Footer />
          <Cart />

          {/* زر لوحة التحكم - مخفي في الركن */}
          <button
            onClick={() => setCurrentPage('admin')}
            className="fixed bottom-4 left-4 w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/30 transition-all"
            title="لوحة التحكم"
          >
            ⚙
          </button>
        </div>
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;
