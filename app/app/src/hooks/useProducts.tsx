import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  collection, onSnapshot, updateDoc, deleteDoc,
  doc, setDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types';
import { fruits, swords, levelingServices } from '@/data/store';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
const defaultProducts = [...fruits, ...swords, ...levelingServices];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (snapshot.empty && !loaded) {
        // أول مرة — نحمّل المنتجات الافتراضية على Firebase
        defaultProducts.forEach(p => setDoc(doc(db, 'products', p.id), p));
      } else {
        const data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as Product[];
        setProducts(data);
      }
      setLoaded(true);
    });
    return () => unsub();
  }, []);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const id = `product-${Date.now()}`;
    await setDoc(doc(db, 'products', id), { ...product, id });
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), updates);
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}
