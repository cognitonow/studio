'use client';

import { create } from 'zustand';
import type { User, UserRole } from '@/lib/types';
import { getProviderByUserId, mockClientUser, mockProviderUser } from '@/lib/data';

interface UserState {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  initialize: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  role: 'guest',
  isLoading: true,
  login: (user: User) => {
    let role: UserRole = 'client';
    // If the user has a provider profile, set their role to provider
    if (getProviderByUserId(user.id)) {
      role = 'provider';
    } else {
      role = user.role;
    }
    
    set({ user, role, isLoading: false });
    // In a real app, you might persist this to localStorage
  },
  logout: () => {
    set({ user: null, role: 'guest', isLoading: false });
  },
  setRole: (role: UserRole) => {
    if (role === 'guest') {
      get().logout();
      return;
    }
    
    // When switching roles, log in the corresponding mock user
    const userToLogin = role === 'client' ? mockClientUser : mockProviderUser;
    get().login(userToLogin);
    set({ role });
  },
  initialize: () => {
    // In a real app, you would check for a token in localStorage or a cookie
    // For this mock app, we'll just initialize to a default guest state.
    // The login function will handle setting the correct user and role upon sign-up.
    set({ user: null, role: 'guest', isLoading: false });
  },
}));
