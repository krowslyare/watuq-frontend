import { create } from 'zustand';
import type { Ecosystem } from '@avp/api-client';

interface EcosystemState {
  activeEcosystem: Ecosystem | null;
  setActiveEcosystem: (eco: Ecosystem) => void;
  clearEcosystem: () => void;
}

/**
 * Tracks which ecosystem the admin is currently working inside.
 * When an ecosystem is selected, all sub-modules (indicators, forums,
 * polls, content, etc.) are scoped to that ecosystem.
 */
export const useEcosystemStore = create<EcosystemState>((set) => ({
  activeEcosystem: null,
  setActiveEcosystem: (eco) => set({ activeEcosystem: eco }),
  clearEcosystem: () => set({ activeEcosystem: null }),
}));
