
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Check if Firebase has already been initialized
if (getApps().length === 0) {
  // If not initialized, create the config object and initialize the app
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  app = initializeApp(firebaseConfig);
} else {
  // If already initialized, get the existing app
  app = getApp();
}

// Get the Auth and Firestore services
auth = getAuth(app);
db = getFirestore(app);

// Export the initialized auth and db instances
export { app, auth, db };
