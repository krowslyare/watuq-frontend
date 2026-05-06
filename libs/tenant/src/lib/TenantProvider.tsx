import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Ecosystem } from '@avp/api-client';

interface TenantContextType {
  activeTenant: Ecosystem | null;
  setActiveTenant: (tenant: Ecosystem | null) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [activeTenant, setActiveTenant] = useState<Ecosystem | null>(null);

  // Apply dynamic theming when tenant changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (activeTenant) {
      root.style.setProperty('--tenant-primary', activeTenant.primaryColor);
      root.style.setProperty('--tenant-primary-hover', activeTenant.secondaryColor); // Basic logic for hover
      root.style.setProperty('--tenant-primary-light', `${activeTenant.primaryColor}20`); // Hex with 20% opacity
    } else {
      // Revert to defaults (or AVP defaults)
      root.style.removeProperty('--tenant-primary');
      root.style.removeProperty('--tenant-primary-hover');
      root.style.removeProperty('--tenant-primary-light');
    }
  }, [activeTenant]);

  return (
    <TenantContext.Provider value={{ activeTenant, setActiveTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
