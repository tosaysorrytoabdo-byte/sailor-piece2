import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order } from '@/types';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getPendingOrders: () => Order[];
  getCompletedOrders: () => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SLR-${timestamp}-${random}`;
};

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        _firebaseId: doc.id,
      })) as (Order & { _firebaseId: string })[];
      setOrders(data);
    });
    return () => unsub();
  }, []);

  const addOrder = useCallback(async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, 'orders'), {
      ...newOrder,
      createdAt: serverTimestamp(),
    });
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    const order = orders.find(o => o.id === orderId) as any;
    if (!order?._firebaseId) return;
    await updateDoc(doc(db, 'orders', order._firebaseId), { status });
  }, [orders]);

  const deleteOrder = useCallback(async (orderId: string) => {
    const order = orders.find(o => o.id === orderId) as any;
    if (!order?._firebaseId) return;
    await deleteDoc(doc(db, 'orders', order._firebaseId));
  }, [orders]);

  const getOrderById = useCallback((orderId: string) => orders.find(o => o.id === orderId), [orders]);
  const getPendingOrders = useCallback(() => orders.filter(o => o.status === 'pending'), [orders]);
  const getCompletedOrders = useCallback(() => orders.filter(o => o.status === 'completed'), [orders]);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder, getOrderById, getPendingOrders, getCompletedOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within OrdersProvider');
  return context;
}
