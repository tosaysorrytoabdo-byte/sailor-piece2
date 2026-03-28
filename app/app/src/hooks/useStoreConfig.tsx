import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { storeConfig as defaultConfig } from '@/data/store';
import type { StoreConfig } from '@/types';

interface StoreConfigContextType {
  config: StoreConfig;
  updateConfig: (updates: Partial<StoreConfig>) => void;
}

const StoreConfigContext = createContext<StoreConfigContextType | undefined>(undefined);

export function StoreConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<StoreConfig>(defaultConfig);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'store'), (snap) => {
      if (snap.exists()) {
        setConfig(snap.data() as StoreConfig);
      } else {
        setDoc(doc(db, 'settings', 'store'), defaultConfig);
      }
    });
    return () => unsub();
  }, []);

  const updateConfig = useCallback(async (updates: Partial<StoreConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    await setDoc(doc(db, 'settings', 'store'), newConfig);
  }, [config]);

  return (
    <StoreConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </StoreConfigContext.Provider>
  );
}

export function useStoreConfig() {
  const context = useContext(StoreConfigContext);
  if (!context) throw new Error('useStoreConfig must be used within StoreConfigProvider');
  return context;
}
