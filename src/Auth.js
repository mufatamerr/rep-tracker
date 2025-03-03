import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "./App.css"; // Import updated styles

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!email.includes("@") || password.length < 6) {
        setError("Please enter a valid email and password (min 6 characters)");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setMessage("A verification email has been sent. Please check your inbox.");
      navigate("/verify-email"); // ✅ Redirect to verification page
    } catch (err) {
      setError(getFriendlyError(err.code));
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        navigate("/verify-email"); // ✅ Redirect to verification page
        return;
      }

      navigate("/dashboard"); // ✅ Go to main dashboard
    } catch (err) {
      setError(getFriendlyError(err.code));
    }
  };

  const getFriendlyError = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No account found with this email. Please try again.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format. Please enter a valid email.";
      case "auth/email-already-in-use":
        return "This email is already in use. Try logging in.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="container">
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={isSignUp ? handleSignup : handleLogin}>
        {isSignUp ? "SIGN UP" : "LOGIN"}
      </button>

      <div className="or-divider">Or Sign Up Using</div>
      <div className="social-login">
        <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
      </div>

      <div className="auth-footer">
        {isSignUp ? "Already have an account?" : "New here?"}{" "}
        <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Login" : "Sign Up"}</span>
      </div>
    </div>
  );
}
