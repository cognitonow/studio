
'use server';

import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig, listServiceProviders } from '@firebasegen/default-connector';
import type { Provider } from '@/lib/types';
import { getServicesByIds, getReviewsByProviderId, getBadgesByProviderId } from '@/lib/data'; // We'll keep using mock data for nested fields for now
import '@/lib/firebase'; // Ensure Firebase is initialized

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
        console.log("Fetching providers from Data Connect...");
        const result = await listServiceProviders(dataConnect, {});
        
        if (!result || !result.serviceprovider) {
            console.log("No providers found in Data Connect.");
            return [];
        }
        
        console.log(`Fetched ${result.serviceprovider.length} providers.`);
        
        // Map the data from Data Connect to the application's Provider type.
        // During migration, we can still use mock data for complex nested fields
        // that haven't been migrated yet (like services, reviews, badges).
        const providers: Provider[] = result.serviceprovider.map((p) => ({
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
            // These will be replaced with proper joins and queries later.
            portfolio: [], // portfolio is not in the schema yet
            services: getServicesByIds([]), // Placeholder
            reviews: getReviewsByProviderId(p.id), // Placeholder
            badges: getBadgesByProviderId(p.id), // Placeholder
        }));

        return providers;
    } catch (error) {
        console.error('[providers.ts] Failed to fetch providers from Data Connect:', error);
        return [];
    }
}
