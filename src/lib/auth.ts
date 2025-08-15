import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { UserRole } from './types';

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

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: role,
        });

        return { user };
    } catch (error: any) {
        console.error("Error signing up:", error);
        return { error };
    }
}
