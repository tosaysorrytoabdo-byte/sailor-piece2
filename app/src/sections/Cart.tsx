import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Send, User, AtSign, MessageSquare, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { storeConfig } from '@/data/store';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart, isOpen, setIsOpen } = useCart();
  const { addOrder } = useOrders();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    customerName: '',
    tiktokUsername: '',
    notes: '',
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
  };

  const handleSubmitOrder = () => {
    if (!formData.customerName || !formData.tiktokUsername) return;

    const order = addOrder({
      customerName: formData.customerName,
      tiktokUsername: formData.tiktokUsername,
      items: [...items],
      totalPrice,
      notes: formData.notes,
    });

    setOrderId(order.id);
    clearCart();
    setShowCheckout(false);
    setShowSuccess(true);
    setFormData({ customerName: '', tiktokUsername: '', notes: '' });
  };

  if (!isOpen && !showCheckout && !showSuccess) return null;

  return (
    <>
      {/* Cart Sidebar */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-full sm:w-[420px] bg-neutral-950 border-r border-white/10 z-50 animate-slideInLeft">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold">سلة المشتريات</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 180px)' }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-white/30" />
                  </div>
                  <p className="text-white/50 text-lg">السلة فارغة</p>
                  <p className="text-white/30 text-sm mt-2">أضف بعض المنتجات للبدء</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-white/5 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-white/50 text-sm mb-2">
                          {item.price.toLocaleString()} كوين
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-neutral-950 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/50">الإجمالي:</span>
                  <span className="text-2xl font-black">{totalPrice.toLocaleString()} كوين</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
                >
                  <Send className="w-5 h-5" />
                  إتمام الطلب
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-6 animate-scaleIn">
              <h3 className="text-2xl font-bold mb-6">إتمام الطلب</h3>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-white/50 text-sm mb-2">ملخص الطلب</p>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-white/70">{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toLocaleString()} كوين</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-black text-xl">{totalPrice.toLocaleString()} كوين</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-white/50 mb-2">
                    <User className="w-4 h-4" />
                    اسمك في اللعبة *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="أدخل اسمك"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-white/50 mb-2">
                    <AtSign className="w-4 h-4" />
                    حساب تيك توك *
                  </label>
                  <input
                    type="text"
                    value={formData.tiktokUsername}
                    onChange={(e) => setFormData({ ...formData, tiktokUsername: e.target.value })}
                    placeholder="@username"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <p className="text-xs text-white/30 mt-1">
                    سيتم التواصل معك على هذا الحساب لاستلام الكوينات
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-white/50 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    ملاحظات (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أي ملاحظات خاصة بالطلب"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!formData.customerName || !formData.tiktokUsername}
                  className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  تأكيد الطلب
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-6 text-center animate-scaleIn">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">تم إرسال الطلب!</h3>
              <p className="text-white/50 mb-6">
                سيتم التواصل معك على تيك توك لاستلام الكوينات
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-white/50 text-sm mb-1">رقم الطلب</p>
                <code className="text-xl font-black text-white">{orderId}</code>
              </div>

              <a
                href={`https://tiktok.com/${storeConfig.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                تواصل عبر تيك توك
              </a>

              <button
                onClick={() => setShowSuccess(false)}
                className="block w-full mt-4 py-3 text-white/50 hover:text-white transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
