import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import RepTracker from "./RepTracker";
import Auth from "./Auth";
import VerifyEmail from "./VerifyEmail";
import "./App.css"; // ✅ Import the updated CSS

export default function App() {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
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
      <div className="background"> {/* ✅ Add the animated background */}
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
      </div>

      <Routes>
        <Route path="/" element={user ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/verify-email" />) : <Auth />} />
        <Route path="/verify-email" element={user && !isVerified ? <VerifyEmail onVerified={() => setIsVerified(true)} /> : <Navigate to="/" />} />
        <Route
          path="/dashboard"
          element={
            user && isVerified ? (
              <div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>

                <RepTracker />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
