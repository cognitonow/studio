
'use server';

import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, type User as FirebaseUser } from 'firebase/auth';
import type { User, UserRole, Provider } from './types';
import { providers } from './data';
// Correctly import from the base 'firebase/data-connect' and the generated connector
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { insertUser, connectorConfig } from '@firebasegen/default-connector';

interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export async function signUp({ name, email, password, role }: SignUpCredentials) {
    console.log('Attempting to sign up with credentials:', { name, email, role });
    try {
        const auth = getAuth(app);

        // Step 1: Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        console.log('Firebase Auth user created:', firebaseUser);

        // Update profile display name in Firebase Auth
        await updateProfile(firebaseUser, { displayName: name });

        console.log('Firebase Auth profile updated.');

        // Step 2: Save user data to your SQL database via Data Connect
        const dataConnect = getDataConnect(connectorConfig);

        // In a development environment, connect to the emulator
        if (process.env.NODE_ENV !== 'production') {
            connectDataConnectEmulator(dataConnect, 'localhost', 9399);
        }

        console.log('Data Connect client initialized:', dataConnect);

        const userDataForInsert = {
            users: {
                id: firebaseUser.uid, // Using Firebase Auth UID as primary key
                name: name,
                email: email,
                role: role,
            }
        };
        console.log('Attempting to insert user data into SQL via Data Connect:', userDataForInsert);
        // Correct usage: Call the mutation directly, passing the dataConnect instance.
        await insertUser(dataConnect, userDataForInsert);
        
        console.log('User data successfully inserted into SQL.');

        const userData: User = {
            id: firebaseUser.uid,
            name: name,
            email: email,
            role: role,
        };

        // If the user is a provider, create a new provider profile in our mock data
        if (role === 'provider') {
            const newProviderProfile: Provider = {
                id: `provider-${providers.length + 1}`,
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
        }

        console.log('Sign up successful, returning user data:', userData);
        return { user: userData };
    } catch (error: any) {

        console.error('An error occurred during sign up:', error);

        // Provide a more user-friendly error message
        const errorMessage = error.code === 'auth/email-already-in-use'
            ? 'This email address is already in use.' 
            : `Firebase error: ${error.message} (Code: ${error.code})`;
        return { error: { message: errorMessage } };
    }
}
