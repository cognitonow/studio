
'use server';

import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import type { User, UserRole, Provider } from './types';
import { providers } from './data';

interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export async function signUp({ name, email, password, role }: SignUpCredentials) {
    console.log('[auth.ts] signUp function started with:', { name, email, role });
    try {
        console.log('[auth.ts] Getting Firebase Auth instance.');
        const auth = getAuth(app);
        console.log('[auth.ts] Firebase Auth instance obtained.');

        console.log('[auth.ts] Attempting to create user with Firebase Auth...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        console.log('[auth.ts] Firebase Auth user created successfully:', firebaseUser.uid);

        console.log('[auth.ts] Attempting to update Firebase Auth profile...');
        await updateProfile(firebaseUser, { displayName: name });
        console.log('[auth.ts] Firebase Auth profile updated successfully.');

        const userData: User = {
            id: firebaseUser.uid,
            name: name,
            email: email,
            role: role,
        };

        if (role === 'provider') {
            console.log('[auth.ts] User is a provider. Creating mock provider profile.');
            const newProviderProfile: Provider = {
                id: `provider-${providers.length + 1}`,
                userId: firebaseUser.uid, // This is the critical fix
                name: `${name}'s Shop`,
                specialty: 'New Provider',
                avatarUrl: 'https://placehold.co/100x100.png',
                dataAiHint: 'salon interior',
                rating: 0,
                reviewCount: 0,
                isFeatured: false,
                isFavourite: false,
                bio: `Welcome to the shop for ${name}! Please update your bio and services on the dashboard.`,
                portfolio: [],
                services: [],
                reviews: [],
                badges: [{ name: 'New Pro', level: 'New' }],
                location: 'Dublin, Ireland',
                playlist: 'top-rated-nails',
            };
            providers.push(newProviderProfile);
            console.log('[auth.ts] Mock provider profile created for userId:', firebaseUser.uid);
        }

        console.log('[auth.ts] Sign up process complete. Returning user data:', userData);
        return { user: userData };
    } catch (error: any) {
        console.error('[auth.ts] An error occurred during the sign up process:', error);
        const errorMessage = error.code
            ? `Firebase error: ${error.message} (Code: ${error.code})`
            : `An unknown error occurred: ${error.message}`;
        return { error: { message: errorMessage } };
    }
}
