
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log("[firebase.ts] Firebase Config Object:", firebaseConfig);


let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("[firebase.ts] Firebase App initialized successfully.");
  } catch (error) {
    console.error("[firebase.ts] Error initializing Firebase App:", error);
  }
} else {
  app = getApp();
  console.log("[firebase.ts] Existing Firebase App retrieved.");
}

auth = getAuth(app);
db = getFirestore(app);


export { app, auth, db };
