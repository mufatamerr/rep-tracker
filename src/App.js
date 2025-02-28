import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import RepTracker from "./RepTracker";
import Auth from "./Auth";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
            Logout
          </button>
          <RepTracker />
        </>
      ) : (
        <Auth onAuthSuccess={() => setUser(auth.currentUser)} />
      )}
    </div>
  );
}
