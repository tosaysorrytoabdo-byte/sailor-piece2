import { useState } from 'react';
import { ClipboardList, Search, ExternalLink, Check, Clock, X } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { storeConfig } from '@/data/store';

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-blue-400 bg-blue-400/10',
  completed: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

const statusLabels: Record<string, string> = {
  pending: 'معلق',
  processing: 'قيد المعالجة',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  processing: <Clock className="w-4 h-4" />,
  completed: <Check className="w-4 h-4" />,
  cancelled: <X className="w-4 h-4" />,
};

export default function OrdersSection() {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.tiktokUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="orders" className="section-padding bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <ClipboardList className="w-4 h-4" />
            <span className="text-sm text-white/70">تتبع طلباتك</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">الطلبات السابقة</h2>
          <p className="text-white/50">ابحث عن طلبك باستخدام رقم الطلب أو اسمك</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الطلب أو اسمك..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-10 h-10 text-white/30" />
            </div>
            <p className="text-white/50">لا توجد طلبات</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-black text-white">{order.id}</code>
                      <span className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm">
                      {order.customerName} • {order.tiktokUsername}
                    </p>
                    <p className="text-white/30 text-xs mt-1">
                      {new Date(order.createdAt).toLocaleString('ar-EG')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-black">{order.totalPrice.toLocaleString()}</p>
                      <p className="text-white/50 text-sm">كوين</p>
                    </div>
                    <a
                      href={`https://tiktok.com/${storeConfig.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Items */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 text-white/70 text-sm rounded-full"
                      >
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
