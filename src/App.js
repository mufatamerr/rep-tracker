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
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // ✅ Ensure latest verification status
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
      } else {
        setUser(null);
        setIsVerified(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setIsVerified(false);
  };

  if (isLoading) return <div className="text-white text-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Login or Sign Up */}
        <Route path="/" element={user ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/verify-email" />) : <Auth />} />

        {/* Email Verification Page */}
        <Route path="/verify-email" element={user && !isVerified ? <VerifyEmail onVerified={() => setIsVerified(true)} /> : <Navigate to="/" />} />

        {/* Dashboard - Only Verified Users Allowed */}
        <Route
          path="/dashboard"
          element={
            user && isVerified ? (
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

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
