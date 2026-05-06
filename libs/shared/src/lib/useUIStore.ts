import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Widget editor specific state
  isWidgetEditorOpen: boolean;
  toggleWidgetEditor: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  isWidgetEditorOpen: false,
  toggleWidgetEditor: () => set((state) => ({ isWidgetEditorOpen: !state.isWidgetEditorOpen })),
}));
