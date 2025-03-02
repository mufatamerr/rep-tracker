import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function RepTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addWorkout = () => {
    if (workoutName && reps > 0 && weight > 0) {
      setWorkouts([...workouts, { workoutName, reps, weight }]);
      setWorkoutName("");
      setReps("");
      setWeight("");
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
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
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index}>
              <td>{workout.workoutName}</td>
              <td>{workout.reps}</td>
              <td>{workout.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
