import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { collection, onSnapshot, updateDoc, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types';
import { fruits, swords, levelingServices } from '@/data/store';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
const defaultProducts = [...fruits, ...swords, ...levelingServices];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        defaultProducts.forEach(p => batch.set(doc(db, 'products', p.id), p));
        batch.commit();
      } else {
        const data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as Product[];
        setProducts(data);
      }
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

  const resetToDefault = useCallback(async () => {
    const batch = writeBatch(db);
    // Delete all existing
    const snap = await import('firebase/firestore').then(m => m.getDocs(collection(db, 'products')));
    snap.docs.forEach(d => batch.delete(d.ref));
    // Add defaults
    defaultProducts.forEach(p => batch.set(doc(db, 'products', p.id), p));
    await batch.commit();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetToDefault }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}
