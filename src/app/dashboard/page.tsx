'use server';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Since we cannot know the user's role on the server without a real auth session,
// we will continue to use a client component to render the correct dashboard.
// However, the data fetching logic within each dashboard component will be optimized.
// This file itself doesn't need to change much, but the components it loads will be refactored.
import { DashboardPageClient } from '@/components/dashboard/dashboard-page-client';
import { getClientDashboardData, getProviderDashboardData } from '@/lib/data';

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

// The core refactor is that we now pre-fetch data for BOTH dashboards here on the server.
// We then pass this data down to the client, which will decide which dataset to use.
// This prevents the client-side `useEffect` fetching which was causing the slowness.
export default async function DashboardPage() {
    const clientData = getClientDashboardData();
    // In a real app, we'd need the provider's ID. We'll use the mock one for now.
    const providerData = getProviderDashboardData('2'); 

    return (
        <DashboardPageClient 
            clientData={clientData} 
            providerData={providerData} 
        />
    );
}
