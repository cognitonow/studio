
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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

        // Create a corresponding user document in Firestore
        await setDoc(doc(db, "users", firebaseUser.uid), userData);

        // If the user is a provider, create a new provider profile in our mock data
        // This will later be moved to Firestore as well.
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
        console.error("Error signing up:", error);
        // Provide a more user-friendly error message
        const errorMessage = error.code === 'auth/email-already-in-use' 
            ? 'This email address is already in use.' 
            : 'An error occurred during sign up. Please try again.';
        return { error: { message: errorMessage } };
    }
}
