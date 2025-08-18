
'use client';

import { AuthProvider } from '@/components/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
