'use client';

import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
              {children}
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
    )
}
