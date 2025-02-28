import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Send email verification
        await sendEmailVerification(user);
        setMessage("Verification email sent! Please check your inbox.");

      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Check if user is verified
        if (!user.emailVerified) {
          setError("Please verify your email before logging in.");
          return;
        }

        onAuthSuccess(); // Proceed if verified
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{isSignUp ? "Sign Up" : "Login"}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-xl bg-gray-700 text-white border-none mb-3 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded-xl bg-gray-700 text-white border-none mb-3 w-64"
      />
      
      <button onClick={handleAuth} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl w-64">
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      
      <p className="mt-4 cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "New here? Sign up"}
      </p>
    </div>
  );
}
