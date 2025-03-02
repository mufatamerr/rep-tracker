import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import RepTracker from "./RepTracker";
import Auth from "./Auth";
import VerifyEmail from "./VerifyEmail";
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
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Login or Sign Up */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth onAuthSuccess={() => setUser(auth.currentUser)} />} />

        {/* Email Verification */}
        <Route path="/verify-email" element={<VerifyEmail onVerified={() => setUser(auth.currentUser)} />} />

        {/* Main Dashboard with Logout Button */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <div>
                <button
                  onClick={handleLogout}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Logout
                </button>
                <RepTracker />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Redirect Unknown Routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
