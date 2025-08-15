
'use client';

import { create } from 'zustand';

export type UserRole = 'guest' | 'client' | 'provider';

interface UserRoleState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

// This store is deprecated and will be removed. Use useUserStore instead.
export const useUserRole = create<UserRoleState>((set) => ({
  role: 'client',
  setRole: (role) => set({ role }),
}));
