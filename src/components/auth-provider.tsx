
'use client';

import { useEffect, type ReactNode } from 'react';
import { useUserStore } from '@/hooks/use-user-store';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
