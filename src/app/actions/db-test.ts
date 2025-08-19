
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
        
        if (!result || !result.User) {
            console.log("No users found.");
            return { users: [] };
        }
        
        console.log(`Fetched ${result.User.length} users.`);
        return { users: result.User as User[] };
    } catch (error: any) {
        console.error('[db-test.ts] Failed to fetch users:', error);
        return { error: error.message };
    }
}
