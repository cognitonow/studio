
'use client';

import { create } from 'zustand';

export type UserRole = 'guest' | 'client' | 'provider';

interface UserRoleState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useUserRole = create<UserRoleState>((set) => ({
  role: 'client',
  setRole: (role) => set({ role }),
}));
