import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBfEGg7Y6Ar2-B3NODPUpsqJYvr0oiyl34",
  authDomain: "rep-tracker-51521.firebaseapp.com",
  projectId: "rep-tracker-51521",
  storageBucket: "rep-tracker-51521.firebasestorage.app", 
  messagingSenderId: "615420042952",
  appId: "1:615420042952:web:c03eff822c11bf10b48ffd",
  measurementId: "G-8PGP30MJNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics, signOut, collection, doc, setDoc, getDocs, deleteDoc, addDoc };