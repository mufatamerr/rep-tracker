import React, { useState, useEffect } from "react";
import { db, auth, collection, addDoc, getDocs, deleteDoc, doc } from "./firebase"; // ✅ Import Firestore functions
import "./App.css";

export default function RepTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const user = auth.currentUser; // ✅ Get the logged-in user

  useEffect(() => {
    if (user) {
      loadWorkouts(); // ✅ Load workouts when user logs in
    }
  }, [user]);

  // ✅ Load Workouts from Firestore
  const loadWorkouts = async () => {
    if (!user) return;
    const workoutsCollection = collection(db, "users", user.uid, "workouts");
    const workoutSnapshot = await getDocs(workoutsCollection);
    const workoutList = workoutSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setWorkouts(workoutList);
  };

  // ✅ Add Workout to Firestore
  const addWorkout = async () => {
    if (workoutName && reps > 0 && weight > 0) {
      const newWorkout = { workoutName, reps, weight };

      if (user) {
        const workoutsCollection = collection(db, "users", user.uid, "workouts");
        await addDoc(workoutsCollection, newWorkout); // ✅ Save workout in Firestore
      }

      setWorkouts([...workouts, newWorkout]);
      setWorkoutName("");
      setReps("");
      setWeight("");
    }
  };

  // ✅ Delete Workout from Firestore
  const deleteWorkout = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "workouts", id));
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold neon-glow">Rep Tracker</h1>

      <div className="card w-full max-w-lg mt-6">
        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(Math.max(0, Number(e.target.value)))}
        />
        <input
          type="number"
          placeholder="Weight (lbs)"
          value={weight}
          onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>

      <table className="workout-table">
        <thead>
          <tr>
            <th>Workout</th>
            <th>Reps</th>
            <th>Weight (lbs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={workout.id}>
              <td>{workout.workoutName}</td>
              <td>{workout.reps}</td>
              <td>{workout.weight}</td>
              <td>
                <button onClick={() => deleteWorkout(workout.id)} className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
