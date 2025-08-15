

import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { User, UserRole, Provider } from './types';
import { providers, services } from './data';

interface SignUpCredentials {
    name: string;
    email: string;
    password;
    role: UserRole;
}

export async function signUp({ name, email, password, role }: SignUpCredentials) {
    try {
        // Special mock handling for the main provider demo account
        if (role === 'provider' && email.toLowerCase() === 'provider@example.com') {
            const providerUser = {
                id: 'provider-user-id', // Statically defined ID
                name: 'Glow & Go', // The name of the provider
                email: email,
                role: 'provider'
            };
            // In a real app, you wouldn't return here, but for the mock flow,
            // we assume this user is already 'created' and linked.
            return { user: providerUser };
        }


        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile in Firebase Auth
        await updateProfile(user, { displayName: name });

        const userData = {
            id: user.uid,
            name: name,
            email: email,
            role: role,
        };

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), userData);

        if (role === 'provider') {
            // Create a new blank provider profile for any other provider email
            const newProviderProfile: Provider = {
                id: String(providers.length + 1),
                userId: user.uid,
                name: `${name}'s Shop`,
                specialty: 'General Beauty Services',
                avatarUrl: 'https://placehold.co/100x100.png',
                dataAiHint: 'salon interior',
                rating: 0,
                reviewCount: 0,
                isFeatured: false,
                isFavourite: false,
                bio: `Welcome to the shop for ${name}! Please update your bio.`,
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
        return { error };
    }
}
