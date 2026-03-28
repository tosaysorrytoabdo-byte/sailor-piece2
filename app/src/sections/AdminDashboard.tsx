import { useState } from 'react';
import {
  ShoppingBag, CheckCircle, Clock, Search, Eye, Check, Trash2,
  Copy, ExternalLink, LogOut, DollarSign, Plus, Pencil, X, Package, Star, Settings
} from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { useStoreConfig } from '@/hooks/useStoreConfig';
import { useProducts } from '@/hooks/useProducts';
import type { Order, Product } from '@/types';
import type { StoreConfig } from '@/types';
const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  processing: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  completed: 'text-green-400 bg-green-400/10 border-green-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};
const statusLabels: Record<string, string> = {
  pending: 'معلق', processing: 'قيد المعالجة', completed: 'مكتمل', cancelled: 'ملغي',
};
const rarityColors: Record<string, string> = {
  common: 'text-gray-400', uncommon: 'text-green-400', rare: 'text-blue-400',
  epic: 'text-purple-400', legendary: 'text-yellow-400', mythical: 'text-red-400',
};
const rarityNames: Record<string, string> = {
  common: 'عادي', uncommon: 'غير شائع', rare: 'نادر',
  epic: 'ملحمي', legendary: 'أسطوري', mythical: 'أسطوري+',
};

const ADMIN_PASSWORD = 'slr2024';

const emptyProduct: Omit<Product, 'id'> = {
  name: '', description: '', price: 0, image: '',
  type: 'fruit', rarity: 'common', stock: 1, popular: false,
};

export default function AdminDashboard({ onExit }: { onExit?: () => void }) {
  const { orders, updateOrderStatus, deleteOrder, getPendingOrders, getCompletedOrders } = useOrders();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { config: contact, updateConfig: saveContact } = useStoreConfig();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');

  // Orders
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [ordersFilter, setOrdersFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Products
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [previewImage, setPreviewImage] = useState('');

  // Settings
  const [settingsForm, setSettingsForm] = useState({ ...contact });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert('كلمة المرور غير صحيحة');
  };

  const handleSaveSettings = () => {
    saveContact(settingsForm as Partial<StoreConfig>);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.tiktokUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedOrders = ordersFilter === 'all' ? filteredOrders
    : ordersFilter === 'pending' ? filteredOrders.filter(o => o.status === 'pending')
    : filteredOrders.filter(o => o.status === 'completed');
  const pendingOrders = getPendingOrders();
  const completedOrders = getCompletedOrders();
  const totalRevenue = orders.reduce((sum, o) => o.status === 'completed' ? sum + o.totalPrice : sum, 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return alert('أدخل الاسم والسعر على الأقل');
    addProduct(newProduct);
    setNewProduct(emptyProduct);
    setIsAddingProduct(false);
    setPreviewImage('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white text-black flex items-center justify-center font-black text-2xl rounded-xl mx-auto mb-4">S</div>
            <h2 className="text-2xl font-bold">لوحة التحكم</h2>
            <p className="text-white/50 mt-2">أدخل كلمة المرور للدخول</p>
          </div>
          <div className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={handleLogin} className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90">دخول</button>
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
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl rounded-lg">S</div>
              <span className="font-bold">لوحة التحكم</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onExit?.()} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm">العودة للموقع</button>
              <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm">
                <LogOut className="w-4 h-4" /> خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <ShoppingBag className="w-5 h-5" />, label: 'إجمالي الطلبات', value: orders.length, bg: 'bg-white/5', color: '' },
            { icon: <Clock className="w-5 h-5 text-yellow-400" />, label: 'معلق', value: pendingOrders.length, bg: 'bg-yellow-500/10', color: 'text-yellow-400' },
            { icon: <CheckCircle className="w-5 h-5 text-green-400" />, label: 'مكتمل', value: completedOrders.length, bg: 'bg-green-500/10', color: 'text-green-400' },
            { icon: <DollarSign className="w-5 h-5" />, label: 'الإيرادات', value: `${totalRevenue.toLocaleString()} كوين`, bg: 'bg-white/5', color: '' },
          ].map((s, i) => (
            <div key={i} className="bg-neutral-950 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>{s.icon}</div>
                <span className="text-white/50 text-sm">{s.label}</span>
              </div>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'orders', label: 'الطلبات' },
            { key: 'products', label: 'المنتجات' },
            { key: 'settings', label: 'الإعدادات', icon: <Settings className="w-4 h-4" /> },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.key ? 'bg-white text-black' : 'bg-neutral-950 border border-white/10 text-white/50 hover:text-white'}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* ====== ORDERS ====== */}
        {activeTab === 'orders' && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="البحث..."
                  className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
              </div>
              <div className="flex gap-2">
                {[{ key: 'all', label: 'الكل', count: orders.length }, { key: 'pending', label: 'معلق', count: pendingOrders.length }, { key: 'completed', label: 'مكتمل', count: completedOrders.length }].map(t => (
                  <button key={t.key} onClick={() => setOrdersFilter(t.key as any)}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${ordersFilter === t.key ? 'bg-white text-black' : 'bg-neutral-950 border border-white/10 text-white/50 hover:text-white'}`}>
                    {t.label} ({t.count})
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-neutral-950 border border-white/10 rounded-xl overflow-hidden">
              {displayedOrders.length === 0 ? (
                <div className="text-center py-12"><p className="text-white/50">لا توجد طلبات</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['رقم الطلب','العميل','تيك توك','المنتجات','المبلغ','الحالة','إجراءات'].map(h => (
                          <th key={h} className="px-6 py-4 text-right text-white/50 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedOrders.map(order => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4"><div className="flex items-center gap-2"><code className="font-bold">{order.id}</code><button onClick={() => navigator.clipboard.writeText(order.id)} className="text-white/30 hover:text-white"><Copy className="w-4 h-4" /></button></div></td>
                          <td className="px-6 py-4">{order.customerName}</td>
                          <td className="px-6 py-4 text-white/70">{order.tiktokUsername}</td>
                          <td className="px-6 py-4">{order.items.length} منتج</td>
                          <td className="px-6 py-4 font-bold">{order.totalPrice.toLocaleString()} كوين</td>
                          <td className="px-6 py-4"><span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full border ${statusColors[order.status]}`}>{statusLabels[order.status]}</span></td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setSelectedOrder(order)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg"><Eye className="w-4 h-4" /></button>
                              {order.status === 'pending' && <button onClick={() => updateOrderStatus(order.id, 'completed')} className="w-8 h-8 flex items-center justify-center bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg"><Check className="w-4 h-4" /></button>}
                              <button onClick={() => deleteOrder(order.id)} className="w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ====== PRODUCTS ====== */}
        {activeTab === 'products' && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="ابحث عن منتج..."
                  className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
              </div>
              <button onClick={() => { setIsAddingProduct(true); setNewProduct(emptyProduct); setPreviewImage(''); }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90">
                <Plus className="w-5 h-5" /> إضافة منتج
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-neutral-950 border border-white/10 rounded-xl overflow-hidden">
                  <div className="relative h-40">
                    {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      : <div className="w-full h-full flex items-center justify-center bg-white/5"><Package className="w-10 h-10 text-white/20" /></div>}
                    {product.popular && <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-400/30"><Star className="w-3 h-3" /> شائع</span>}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white">{product.name}</h3>
                      <span className={`text-xs font-bold ${rarityColors[product.rarity]}`}>{rarityNames[product.rarity]}</span>
                    </div>
                    <p className="text-white/50 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-black">{product.price.toLocaleString()} كوين</span>
                      <span className="text-white/40 text-sm">مخزون: {product.stock}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProduct({ ...product })} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm"><Pencil className="w-4 h-4" /> تعديل</button>
                      <button onClick={() => { if (confirm('حذف هذا المنتج؟')) deleteProduct(product.id); }} className="w-10 flex items-center justify-center py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ====== SETTINGS ====== */}
        {activeTab === 'settings' && (
          <div className="max-w-lg">
            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5" /> معلومات التواصل</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">حساب تيك توك</span>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                    <input
                      value={settingsForm.tiktok?.replace('@','')}
                      onChange={e => setSettingsForm({ ...settingsForm, tiktok: '@' + e.target.value.replace('@','') })}
                      placeholder="اسم_الحساب"
                      className="w-full pr-8 pl-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">رقم الواتساب</span>
                  <input
                    value={settingsForm.whatsapp}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    placeholder="مثال: 966501234567"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
                  />
                </label>

                {settingsSaved && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl">
                    <CheckCircle className="w-4 h-4" /> تم الحفظ بنجاح!
                  </div>
                )}

                <button onClick={handleSaveSettings} className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all">
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ====== ORDER MODAL ====== */}
      {selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={() => setSelectedOrder(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">تفاصيل الطلب</h3>
                <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><span className="text-white/50">رقم الطلب</span><code className="font-bold">{selectedOrder.id}</code></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl"><span className="text-white/50 text-sm block mb-1">العميل</span><span className="font-bold">{selectedOrder.customerName}</span></div>
                  <div className="p-4 bg-white/5 rounded-xl"><span className="text-white/50 text-sm block mb-1">تيك توك</span><span className="font-bold">{selectedOrder.tiktokUsername}</span></div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <span className="text-white/50 text-sm block mb-3">المنتجات</span>
                  {selectedOrder.items.map((item, i) => <div key={i} className="flex items-center justify-between"><span>{item.name}</span><span className="text-white/50">× {item.quantity}</span></div>)}
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><span className="text-white/50">الإجمالي</span><span className="text-2xl font-black">{selectedOrder.totalPrice.toLocaleString()} كوين</span></div>
                <a href={`https://tiktok.com/${contact.tiktok}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90">
                  <ExternalLink className="w-5 h-5" /> تواصل مع العميل
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====== EDIT PRODUCT MODAL ====== */}
      {editingProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={() => setEditingProduct(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 my-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">تعديل المنتج</h3>
                <button onClick={() => setEditingProduct(null)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                {editingProduct.image && <div className="h-40 rounded-xl overflow-hidden bg-white/5"><img src={editingProduct.image} alt="preview" className="w-full h-full object-cover" /></div>}
                {[
                  { label: 'اسم المنتج', key: 'name', type: 'text' },
                  { label: 'رابط الصورة', key: 'image', type: 'text', placeholder: 'https://...' },
                  { label: 'السعر (كوين)', key: 'price', type: 'number' },
                  { label: 'المخزون', key: 'stock', type: 'number' },
                ].map(f => (
                  <label key={f.key} className="block">
                    <span className="text-white/50 text-sm mb-1 block">{f.label}</span>
                    <input type={f.type} placeholder={f.placeholder} value={(editingProduct as any)[f.key]}
                      onChange={e => setEditingProduct({ ...editingProduct, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                  </label>
                ))}
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">الوصف</span>
                  <textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 resize-none" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">النوع</span>
                    <select value={editingProduct.type} onChange={e => setEditingProduct({ ...editingProduct, type: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30">
                      <option value="fruit">فاكهة</option><option value="sword">سيف</option><option value="leveling">تلفيل</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">الندرة</span>
                    <select value={editingProduct.rarity} onChange={e => setEditingProduct({ ...editingProduct, rarity: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30">
                      {Object.entries(rarityNames).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </label>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editingProduct.popular || false} onChange={e => setEditingProduct({ ...editingProduct, popular: e.target.checked })} className="w-5 h-5 rounded" />
                  <span className="text-white/70">منتج شائع ⭐</span>
                </label>
                <div className="flex gap-3">
                  <button onClick={handleSaveEdit} className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90">حفظ</button>
                  <button onClick={() => setEditingProduct(null)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl">إلغاء</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====== ADD PRODUCT MODAL ====== */}
      {isAddingProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={() => setIsAddingProduct(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 my-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">إضافة منتج جديد</h3>
                <button onClick={() => setIsAddingProduct(false)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                {previewImage && <div className="h-40 rounded-xl overflow-hidden bg-white/5"><img src={previewImage} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>}
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">اسم المنتج *</span>
                  <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                </label>
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">رابط الصورة</span>
                  <input value={newProduct.image} placeholder="https://..."
                    onChange={e => { setNewProduct({ ...newProduct, image: e.target.value }); setPreviewImage(e.target.value); }}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                </label>
                <label className="block">
                  <span className="text-white/50 text-sm mb-1 block">الوصف</span>
                  <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 resize-none" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">السعر (كوين) *</span>
                    <input type="number" value={newProduct.price || ''} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                  </label>
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">المخزون</span>
                    <input type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">النوع</span>
                    <select value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30">
                      <option value="fruit">فاكهة</option><option value="sword">سيف</option><option value="leveling">تلفيل</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-white/50 text-sm mb-1 block">الندرة</span>
                    <select value={newProduct.rarity} onChange={e => setNewProduct({ ...newProduct, rarity: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30">
                      {Object.entries(rarityNames).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </label>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={newProduct.popular || false} onChange={e => setNewProduct({ ...newProduct, popular: e.target.checked })} className="w-5 h-5 rounded" />
                  <span className="text-white/70">منتج شائع ⭐</span>
                </label>
                <div className="flex gap-3">
                  <button onClick={handleAddProduct} className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90">إضافة</button>
                  <button onClick={() => setIsAddingProduct(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl">إلغاء</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
