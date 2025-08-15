import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { UserRole, Provider } from './types';
import { providers, services } from './data';

interface SignUpCredentials {
    name: string;
    email: string;
    password;
    role: UserRole;
}

export async function signUp({ name, email, password, role }: SignUpCredentials) {
    try {
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
                badges: ['New Pro'],
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
