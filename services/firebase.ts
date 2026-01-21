// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlBehjAAXNqrEWufBEHARQXqbRYh5hyKI",
  authDomain: "ai-assistant-6939a.firebaseapp.com",
  projectId: "ai-assistant-6939a",
  storageBucket: "ai-assistant-6939a.firebasestorage.app",
  messagingSenderId: "515419380278",
  appId: "1:515419380278:web:308f67852fe824ec25d697",
  measurementId: "G-7K35ZLDGT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
// Use OAuthProvider for Apple to avoid potential missing export issues with AppleAuthProvider
export const appleProvider = new OAuthProvider('apple.com');

export { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };