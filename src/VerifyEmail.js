import React, { useEffect, useState } from "react";
import { auth, signOut } from "./firebase"; // ✅ Now correctly imported
import { useNavigate } from "react-router-dom";

export default function VerifyEmail({ onVerified }) {
  const [message, setMessage] = useState("A verification email has been sent to your inbox.");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || "Unknown Email"; // ✅ Get user email

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      await auth.currentUser?.reload(); // ✅ Force Firebase to reload the user
      if (auth.currentUser?.emailVerified) {
        clearInterval(checkVerification);
        onVerified();
        navigate("/dashboard"); // ✅ Redirect to Dashboard once verified
      }
    }, 5000);

    return () => clearInterval(checkVerification);
  }, [navigate, onVerified]);

  const handleRefresh = async () => {
    setIsChecking(true);
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) {
      onVerified();
      navigate("/dashboard"); // ✅ Redirect to dashboard immediately
    } else {
      setMessage("Your email is not verified yet. Please check your inbox.");
      setIsChecking(false);
    }
  };

  const handleGoBack = async () => {
    await signOut(auth); // ✅ Sign the user out so they can enter a new email
    navigate("/"); // ✅ Redirect to login/signup page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>
      <p className="text-gray-400 text-center mb-4">{message}</p>

      {/* ✅ Show the email the user entered */}
      <p className="text-lg font-semibold mb-4">
        Email: <span className="text-green-400">{userEmail}</span>
      </p>

      <p className="text-green-500 text-center mb-4">Once verified, you will be redirected automatically.</p>

      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl w-64 mb-3"
        disabled={isChecking}
      >
        {isChecking ? "Checking..." : "Refresh"}
      </button>

      {/* ✅ Fixed Go Back Button */}
      <button
        onClick={handleGoBack}
        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl w-64"
      >
        Go Back
      </button>
    </div>
  );
}
