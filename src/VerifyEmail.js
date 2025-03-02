import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

export default function VerifyEmail({ onVerified }) {
  const [message, setMessage] = useState("A verification email has been sent to your inbox.");

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      await auth.currentUser?.reload(); // Refresh user data from Firebase
      if (auth.currentUser?.emailVerified) {
        clearInterval(checkVerification);
        onVerified(); // ✅ Redirect to main app
      }
    }, 5000); // ✅ Check every 5 seconds

    return () => clearInterval(checkVerification);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>
      <p className="text-gray-400 text-center mb-4">{message}</p>
      <p className="text-green-500 text-center mb-4">Once verified, you will be redirected automatically.</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl w-64"
      >
        Refresh
      </button>
    </div>
  );
}
