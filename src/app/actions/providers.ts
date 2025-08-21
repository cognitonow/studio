
'use server';

import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig, listServices } from '@firebasegen/default-connector';
import type { Provider } from '@/lib/types';
import { getReviewsByProviderId, getBadgesByProviderId } from '@/lib/data';
import '@/lib/firebase';

const dataConnect = getDataConnect(connectorConfig);

if (process.env.NODE_ENV === 'development') {
    connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}

/**
 * Fetches all service providers from the PostgreSQL database via Data Connect.
 * This is a server action and should only be called from server-side code.
 */
export async function getProviders(): Promise<Provider[]> {
    try {
        console.log("Fetching services to derive providers from Data Connect...");
        const result = await listServices(dataConnect, {});
        
        if (!result || !result.services) {
            console.log("No services found in Data Connect.");
            return [];
        }
        
        console.log(`Fetched ${result.services.length} services.`);

        // Create a map to store unique providers to avoid duplicates
        const providerMap = new Map<string, Provider>();

        result.services.forEach(service => {
            service.provider?.forEach(p => {
                if (p && !providerMap.has(p.id)) {
                    providerMap.set(p.id, {
                        id: p.id,
                        userId: p.userId,
                        name: p.name,
                        specialty: p.specialty,
                        avatarUrl: p.avatarUrl,
                        dataAiHint: p.dataAiHint,
                        rating: p.rating,
                        reviewCount: p.reviewCount,
                        isFeatured: p.isFeatured,
                        isFavourite: p.isFavourite,
                        bio: p.bio,
                        location: p.location,
                        playlist: p.playlist,
                        // For now, we use mock functions for these nested properties.
                        portfolio: [], // portfolio is not in the schema yet
                        services: [], // This will be populated later if needed
                        reviews: getReviewsByProviderId(p.id),
                        badges: getBadgesByProviderId(p.id),
                    });
                }
            });
        });

        const providers = Array.from(providerMap.values());
        console.log(`Derived ${providers.length} unique providers.`);

        return providers;
    } catch (error) {
        console.error('[providers.ts] Failed to fetch providers from Data Connect:', error);
        return [];
    }
}
