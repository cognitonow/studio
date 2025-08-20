
'use server';

import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import type { User, UserRole, Provider } from './types';
import { providers, getProviderByUserId } from './data';
// The import for `insertUser` and related Data Connect logic has been removed temporarily
// to resolve the immediate build issue. We will re-introduce database interactions
// in a subsequent step.

interface AuthCredentials {
    name?: string;
    email: string;
    password: string;
    role?: UserRole;
}

export async function signUp({ name, email, password, role = 'client' }: AuthCredentials) {
    console.log('[auth.ts] signUp function started with:', { name, email, role });
    try {
        const auth = getAuth(app);
        console.log('[auth.ts] Attempting to create user with Firebase Auth...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        console.log('[auth.ts] Firebase Auth user created successfully:', firebaseUser.uid);

        if (name) {
            console.log('[auth.ts] Attempting to update Firebase Auth profile...');
            await updateProfile(firebaseUser, { displayName: name });
            console.log('[auth.ts] Firebase Auth profile updated successfully.');
        }

        const userData: User = {
            id: firebaseUser.uid,
            name: name || firebaseUser.displayName || 'New User',
            email: email,
            role: role,
        };
        
        // TODO: Re-introduce the call to `createUserInDatabase` once the Data Connect
        // setup is stable and the function exists.

        if (role === 'provider') {
            console.log('[auth.ts] User is a provider. Creating mock provider profile.');
            const newProviderProfile: Provider = {
                id: `provider-${Date.now()}`, // Use a more unique ID
                userId: firebaseUser.uid,
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


export async function signIn({ email, password }: AuthCredentials) {
    console.log('[auth.ts] signIn function started with:', { email });
    try {
        const auth = getAuth(app);
        console.log('[auth.ts] Attempting to sign in user with Firebase Auth...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        console.log('[auth.ts] Firebase Auth user signed in successfully:', firebaseUser.uid);

        const providerProfile = getProviderByUserId(firebaseUser.uid);

        const userData: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: email,
            role: providerProfile ? 'provider' : 'client',
        };
        
        console.log('[auth.ts] Sign in process complete. Returning user data:', userData);
        return { user: userData };
    } catch (error: any) {
        console.error('[auth.ts] An error occurred during the sign in process:', error);
        const errorMessage = error.code
            ? `Firebase error: ${error.message} (Code: ${error.code})`
            : `An unknown error occurred: ${error.message}`;
        return { error: { message: errorMessage } };
    }
}
