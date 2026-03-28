import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Order } from '@/types';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getPendingOrders: () => Order[];
  getCompletedOrders: () => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// توليد رقم طلب عشوائي
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SLR-${timestamp}-${random}`;
};

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('slr-orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const saveOrders = useCallback((newOrders: Order[]) => {
    setOrders(newOrders);
    if (typeof window !== 'undefined') {
      localStorage.setItem('slr-orders', JSON.stringify(newOrders));
    }
  }, []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    saveOrders([newOrder, ...orders]);
    return newOrder;
  }, [orders, saveOrders]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    saveOrders(
      orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, [orders, saveOrders]);

  const deleteOrder = useCallback((orderId: string) => {
    saveOrders(orders.filter(order => order.id !== orderId));
  }, [orders, saveOrders]);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const getPendingOrders = useCallback(() => {
    return orders.filter(order => order.status === 'pending');
  }, [orders]);

  const getCompletedOrders = useCallback(() => {
    return orders.filter(order => order.status === 'completed');
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
        getPendingOrders,
        getCompletedOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
