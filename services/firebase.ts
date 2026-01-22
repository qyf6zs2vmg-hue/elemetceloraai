import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  Auth
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlBehjAAXNqrEWufBEHARQXqbRYh5hyKI",
  authDomain: "ai-assistant-6939a.firebaseapp.com",
  projectId: "ai-assistant-6939a",
  storageBucket: "ai-assistant-6939a.firebasestorage.app",
  messagingSenderId: "515419380278",
  appId: "1:515419380278:web:308f67852fe824ec25d697",
  measurementId: "G-7K35ZLDGT3"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Fallback objects if needed (though Auth component now bypasses these for registration)
}

// Providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export { auth, db, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };