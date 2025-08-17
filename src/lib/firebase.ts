
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
let firebaseConfig: any; // Explicitly type as any to avoid TS errors with partial config
try {
  firebaseConfig = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG || '{}');
} catch (e) {
  console.error("[firebase.ts] Error parsing FIREBASE_WEBAPP_CONFIG:", e);
  // Fallback to environment variables if parsing fails
  // This fallback is less likely to be needed with App Hosting, but good for local dev
  firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
}

console.log("[firebase.ts] Firebase Config Object:", firebaseConfig);
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  // Initialize Firebase
  console.log("[firebase.ts] Initializing Firebase...");
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("[firebase.ts] Firebase initialized.");
} else {
  // If a Firebase app is already initialized, use that one
  console.log("[firebase.ts] Using existing Firebase app.");
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// Export the initialized auth and db instances
export { app, auth, db };
