
'use server';

import type { Provider } from '@/lib/types';
import { providers } from '@/lib/data';

/**
 * Fetches all service providers.
 * This is a server action.
 * NOTE: This function currently uses mock data due to issues with the Data Connect SDK.
 */
export async function getProviders(): Promise<Provider[]> {
    try {
        console.log("Fetching providers from mock data source...");
        // Directly return the mock providers from the data file.
        const allProviders = providers;
        console.log(`Fetched ${allProviders.length} providers from mock data.`);
        return allProviders;
    } catch (error) {
        console.error('[providers.ts] Failed to fetch providers from mock data:', error);
        return [];
    }
}
