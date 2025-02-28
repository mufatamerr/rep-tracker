import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics }; 
