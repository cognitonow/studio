
'use server';

import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@firebasegen/default-connector';
import type { User } from '@/lib/types';
import '@/lib/firebase'; // Ensure Firebase is initialized

const dataConnect = getDataConnect(connectorConfig);

if (process.env.NODE_ENV === 'development') {
    connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}

/**
 * Test action to fetch all users from the database.
 */
export async function testListUsers(): Promise<{ users?: User[]; error?: string }> {
    try {
        console.log("Testing 'listUsers' query...");
        const result = await listUsers(dataConnect, {});
        
        // The generated SDK nests the result under a key named after the query.
        if (!result || !result.listUsers) {
            console.log("No users found or unexpected response structure.");
            return { users: [] };
        }
        
        console.log(`Fetched ${result.listUsers.length} users.`);
        // The result from the SDK should already be in the correct shape.
        const users = result.listUsers as User[];
        
        return { users };
    } catch (error: any) {
        console.error('[db-test.ts] Failed to fetch users:', error);
        return { error: error.message };
    }
}
