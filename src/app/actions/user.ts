
'use server';

import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig, insertUser } from '@firebasegen/default-connector';
import type { User } from '@/lib/types';
import '@/lib/firebase'; // Ensure Firebase is initialized

const dataConnect = getDataConnect(connectorConfig);

if (process.env.NODE_ENV === 'development') {
    connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}

/**
 * Creates a new user record in the database.
 * This is a server action and should only be called from server-side code.
 * @param userData - The user data to insert.
 */
export async function createUserInDatabase(userData: User) {
    try {
        await insertUser(dataConnect, {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role
        });
        console.log('[user.ts] User inserted into Data Connect successfully.');
        return { success: true };
    } catch (error) {
        console.error('[user.ts] Failed to insert user into Data Connect:', error);
        return { success: false, error: 'Failed to create user record in database.' };
    }
}
