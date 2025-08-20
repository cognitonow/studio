

'use client'

import { useEffect } from 'react';
import { useUserStore } from '@/hooks/use-user-store';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dynamically import the dashboards to avoid rendering unnecessary components.
// This also helps in code-splitting.
import dynamic from 'next/dynamic';

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

const ProviderDashboard = dynamic(
  () => import('@/components/dashboard/provider-dashboard'), 
  { loading: () => <DashboardLoadingSkeleton /> }
);

const ClientDashboard = dynamic(
  () => import('@/components/dashboard/client-dashboard'),
  { loading: () => <DashboardLoadingSkeleton /> }
);


export default function DashboardPage() {
    const { role, isLoading, user } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        // This effect handles authentication. If loading is done and there's no user,
        // it's a guest trying to access a protected route. Redirect them to login.
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
        // While loading or before the redirect happens, show a skeleton.
        // This prevents a flash of content and provides a better UX.
        return <DashboardLoadingSkeleton />;
    }

    // After loading and confirming a user exists, render the correct dashboard based on their role.
    if (role === 'provider') {
        return <ProviderDashboard />;
    }
    
    // Default to ClientDashboard for the 'client' role.
    return <ClientDashboard />;
}
