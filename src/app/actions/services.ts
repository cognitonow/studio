
'use server';

import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig, listServices } from '@firebasegen/default-connector';
import type { Service } from '@/lib/types';
import '@/lib/firebase'; // Ensure Firebase is initialized

const dataConnect = getDataConnect(connectorConfig);

if (process.env.NODE_ENV === 'development') {
    connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}

/**
 * Fetches all services from the PostgreSQL database via Data Connect.
 * This is a server action and should only be called from server-side code.
 */
export async function getServices(): Promise<Service[]> {
    try {
        console.log("Fetching services from Data Connect...");
        const result = await listServices(dataConnect, {});
        
        if (!result || !result.services) {
            console.log("No services found in Data Connect.");
            return [];
        }
        
        console.log(`Fetched ${result.services.length} services.`);
        // The result from Data Connect is already in the correct shape.
        return result.services as Service[];
    } catch (error) {
        console.error('[services.ts] Failed to fetch services from Data Connect:', error);
        // In case of an error, return an empty array to prevent the page from crashing.
        // You might want to handle this more gracefully in a real application.
        return [];
    }
}
