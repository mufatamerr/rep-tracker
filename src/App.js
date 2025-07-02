import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import RepTracker from "./RepTracker";
import Auth from "./Auth";
import VerifyEmail from "./VerifyEmail";
import "./App.css"; // ✅ Import the updated CSS
import Navbar from './components/Navbar';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import Calendar from './components/Calendar';
import ThreeColumnLayout from './components/ThreeColumnLayout';
import WorkoutLogPanel from './components/WorkoutLogPanel';

const getToday = () => new Date().toISOString().slice(0, 10);

const MainApp = ({ user, onLogout, onProfile }) => {
  const [date, setDate] = useState(getToday());
  const [workouts, setWorkouts] = useState({});

  const handleAddWorkout = ({ date, exercises }) => {
    setWorkouts(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), ...exercises]
    }));
  };

  const handleCopy = (workout) => {
    setWorkouts(prev => ({
      ...prev,
      [getToday()]: [...(prev[getToday()] || []), workout]
    }));
    setDate(getToday());
  };

  const todayWorkouts = workouts[date] || [];
  const oldWorkouts = Object.entries(workouts)
    .filter(([d]) => d !== date)
    .flatMap(([d, ws]) => ws.map(w => ({ ...w, oldDate: d })));

  return (
    <div>
      <Navbar onLogout={onLogout} onProfile={onProfile} />
      <ThreeColumnLayout
        left={<Calendar date={date} onChange={setDate} />}
        center={<WorkoutForm onAdd={handleAddWorkout} date={date} />}
        right={<WorkoutLogPanel workouts={todayWorkouts} />}
      />
    </div>
  );
};

function App() {
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

  const handleProfile = () => {
    alert('Profile/settings coming soon!');
  };

  if (isLoading) return <div className="text-white text-center">Loading...</div>;

  return (
    <Router>
      <div className="background"> {/* ✅ Add the animated background */}
      </div>
      <Routes>
        <Route path="/" element={user ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/verify-email" />) : <Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/verify-email" element={user && !isVerified ? <VerifyEmail onVerified={() => setIsVerified(true)} /> : <Navigate to="/" />} />
        <Route
          path="/dashboard"
          element={
            user && isVerified ? (
              <MainApp user={user} onLogout={handleLogout} onProfile={handleProfile} />
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

export default App;
