import { create } from 'zustand';
import type { User } from '@avp/api-client';
import { mockUsers } from '@avp/mocks';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Auth store using Zustand.
 * Currently uses mock data — swap to real Cognito calls when backend is ready.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, _password: string) => {
    set({ isLoading: true, error: null });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser) {
      set({ user: foundUser, isAuthenticated: true, isLoading: false });
    } else {
      set({ error: 'Credenciales inválidas. Verifique su email y contraseña.', isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 1000));

    // Check if email already exists
    const exists = mockUsers.find((u) => u.email === data.email);
    if (exists) {
      set({ error: 'Este email ya está registrado.', isLoading: false });
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'REGISTERED',
      avatarUrl: null,
      hierarchyLevel: 1,
      ecosystemId: 'eco-lima',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    set({ user: newUser, isAuthenticated: true, isLoading: false });
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 800));

    const exists = mockUsers.find((u) => u.email === email);
    if (!exists) {
      set({ error: 'No se encontró una cuenta con este email.', isLoading: false });
      return;
    }

    // In production: triggers Cognito forgot password flow
    set({ isLoading: false });
  },

  resetPassword: async (_token: string, _newPassword: string) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 800));
    set({ isLoading: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
