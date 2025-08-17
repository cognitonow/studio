
import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import type { User, UserRole, Provider } from './types';
import { providers } from './data';

interface SignUpCredentials {
    name: string;
    email: string;
    password;
    role: UserRole;
}

export async function signUp({ name, email, password, role }: SignUpCredentials) {
    try {
        // Get a fresh instance of the Auth service for this specific call
        const auth = getAuth(app);
        
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Update profile display name in Firebase Auth
        await updateProfile(firebaseUser, { displayName: name });

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

        return { user: userData };
    } catch (error: any) {
        
        // Provide a more user-friendly error message
        const errorMessage = error.code === 'auth/email-already-in-use' 
            ? 'This email address is already in use.' 
            : `Firebase error: ${error.message} (Code: ${error.code})`;
        return { error: { message: errorMessage } };
    }
}
