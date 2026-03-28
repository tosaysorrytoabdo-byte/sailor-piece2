import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { StoreConfig } from '@/types';
import { storeConfig as defaultConfig } from '@/data/store';

interface StoreConfigContextType {
  config: StoreConfig;
  updateConfig: (updates: Partial<StoreConfig>) => void;
}

const StoreConfigContext = createContext<StoreConfigContextType | undefined>(undefined);

export function StoreConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<StoreConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('slr-config');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultConfig;
  });

  const updateConfig = useCallback((updates: Partial<StoreConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem('slr-config', JSON.stringify(newConfig));
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
