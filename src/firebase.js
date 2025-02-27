// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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