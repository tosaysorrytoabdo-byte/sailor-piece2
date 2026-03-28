import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
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
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('slr-products');
      if (saved) {
        try { return JSON.parse(saved); } catch { return defaultProducts; }
      }
    }
    return defaultProducts;
  });

  const save = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('slr-products', JSON.stringify(newProducts));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
    };
    save([...products, newProduct]);
  }, [products, save]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    save(products.map(p => p.id === id ? { ...p, ...updates } : p));
  }, [products, save]);

  const deleteProduct = useCallback((id: string) => {
    save(products.filter(p => p.id !== id));
  }, [products, save]);

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
