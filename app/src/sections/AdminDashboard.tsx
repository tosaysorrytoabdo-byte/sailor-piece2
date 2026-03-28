import { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Search,
  Eye,
  Check,
  Trash2,
  Copy,
  ExternalLink,
  LogOut,
  DollarSign
} from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import type { Order } from '@/types';
import { storeConfig } from '@/data/store';

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  processing: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  completed: 'text-green-400 bg-green-400/10 border-green-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const statusLabels: Record<string, string> = {
  pending: 'معلق',
  processing: 'قيد المعالجة',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

// ⚠️ كلمة المرور للوحة التحكم
const ADMIN_PASSWORD = 'slr2024';

export default function AdminDashboard({ onExit }: { onExit?: () => void }) {
  const { orders, updateOrderStatus, deleteOrder, getPendingOrders, getCompletedOrders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.tiktokUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedOrders = activeTab === 'all' 
    ? filteredOrders 
    : activeTab === 'pending' 
      ? filteredOrders.filter(o => o.status === 'pending')
      : filteredOrders.filter(o => o.status === 'completed');

  const pendingOrders = getPendingOrders();
  const completedOrders = getCompletedOrders();
  const totalRevenue = orders.reduce((sum, o) => o.status === 'completed' ? sum + o.totalPrice : sum, 0);

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white text-black flex items-center justify-center font-black text-2xl rounded-xl mx-auto mb-4">
              S
            </div>
            <h2 className="text-2xl font-bold">لوحة التحكم</h2>
            <p className="text-white/50 mt-2">أدخل كلمة المرور للدخول</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
            >
              دخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-neutral-950 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl rounded-lg">
                S
              </div>
              <span className="font-bold">لوحة التحكم</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onExit?.()}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
              >
                العودة للموقع
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-white/50 text-sm">إجمالي الطلبات</span>
            </div>
            <p className="text-3xl font-black">{orders.length}</p>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-white/50 text-sm">معلق</span>
            </div>
            <p className="text-3xl font-black text-yellow-400">{pendingOrders.length}</p>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white/50 text-sm">مكتمل</span>
            </div>
            <p className="text-3xl font-black text-green-400">{completedOrders.length}</p>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-white/50 text-sm">الإيرادات</span>
            </div>
            <p className="text-3xl font-black">{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث برقم الطلب، الاسم، أو تيك توك..."
              className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'الكل', count: orders.length },
              { key: 'pending', label: 'معلق', count: pendingOrders.length },
              { key: 'completed', label: 'مكتمل', count: completedOrders.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-black'
                    : 'bg-neutral-950 border border-white/10 text-white/50 hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-neutral-950 border border-white/10 rounded-xl overflow-hidden">
          {displayedOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/50">لا توجد طلبات</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">رقم الطلب</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">العميل</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">تيك توك</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">المنتجات</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">المبلغ</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">الحالة</th>
                    <th className="px-6 py-4 text-right text-white/50 font-semibold">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="font-bold">{order.id}</code>
                          <button
                            onClick={() => copyOrderId(order.id)}
                            className="text-white/30 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4 text-white/70">{order.tiktokUsername}</td>
                      <td className="px-6 py-4">{order.items.length} منتج</td>
                      <td className="px-6 py-4 font-bold">{order.totalPrice.toLocaleString()} كوين</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full border ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="w-8 h-8 flex items-center justify-center bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 animate-scaleIn">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">تفاصيل الطلب</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/50">رقم الطلب</span>
                  <code className="font-bold">{selectedOrder.id}</code>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <span className="text-white/50 text-sm block mb-1">العميل</span>
                    <span className="font-bold">{selectedOrder.customerName}</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <span className="text-white/50 text-sm block mb-1">تيك توك</span>
                    <span className="font-bold">{selectedOrder.tiktokUsername}</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <span className="text-white/50 text-sm block mb-3">المنتجات</span>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-white/50">× {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/50">الإجمالي</span>
                  <span className="text-2xl font-black">{selectedOrder.totalPrice.toLocaleString()} كوين</span>
                </div>

                <a
                  href={`https://tiktok.com/${storeConfig.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  تواصل مع العميل
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
