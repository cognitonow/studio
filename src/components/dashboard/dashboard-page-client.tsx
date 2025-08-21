'use client'

import { useEffect, type ReactNode } from 'react';
import { useUserStore } from '@/hooks/use-user-store';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import ProviderDashboard from '@/components/dashboard/provider-dashboard';
import ClientDashboard from '@/components/dashboard/client-dashboard';
import type { ClientDashboardData, ProviderDashboardData } from '@/lib/types';


function DashboardLoadingSkeleton() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold font-headline mb-8">
                <Skeleton className="h-10 w-3/4" />
            </h1>
            <div className="space-y-4">
                <div className="flex space-x-1">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-48" />
                </div>
                 <Skeleton className="h-96 w-full" />
            </div>
        </div>
    );
}

interface DashboardPageClientProps {
    clientData: ClientDashboardData | null;
    providerData: ProviderDashboardData | null;
}

export function DashboardPageClient({ clientData, providerData }: DashboardPageClientProps) {
    const { role, isLoading, user } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
        return <DashboardLoadingSkeleton />;
    }

    if (role === 'provider') {
        return <ProviderDashboard data={providerData} />;
    }
    
    return <ClientDashboard data={clientData} />;
}
