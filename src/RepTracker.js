import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "./components/ui/table";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function RepTracker() {
  const [weeks, setWeeks] = useState({});
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ✅ Fetch Workouts from Firestore
  async function fetchWorkouts() {
    try {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const fetchedWorkouts = {};
      querySnapshot.forEach((doc) => {
        const { week, workoutName, reps, weight } = doc.data();
        if (!fetchedWorkouts[week]) {
          fetchedWorkouts[week] = [];
        }
        fetchedWorkouts[week].push({ workoutName, reps, weight });
      });
      setWeeks(fetchedWorkouts);
    } catch (error) {
      console.error("Firestore fetch error:", error);
    }
  }

  // ✅ Add Workouts to Firestore
  const addWorkout = async () => {
    if (workoutName && reps > 0 && weight > 0) {
      const newWorkout = { week: selectedWeek, workoutName, reps, weight };

      try {
        await addDoc(collection(db, "workouts"), newWorkout);
        setWeeks((prevWeeks) => ({
          ...prevWeeks,
          [selectedWeek]: [...(prevWeeks[selectedWeek] || []), newWorkout],
        }));
      } catch (error) {
        console.error("Error adding workout:", error);
      }

      setWorkoutName("");
      setReps("");
      setWeight("");
    }
  };

  const previousWeek = `Week ${parseInt(selectedWeek.split(" ")[1]) - 1}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Rep Tracker
      </motion.h1>

      <select 
        value={selectedWeek} 
        onChange={(e) => setSelectedWeek(e.target.value)}
        className="mb-4 p-3 rounded-xl bg-gray-800 text-white border-none"
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={`Week ${i + 1}`}>{`Week ${i + 1}`}</option>
        ))}
      </select>

      <Card className="p-6 w-full max-w-lg bg-gray-800 shadow-xl rounded-2xl">
        <CardContent className="flex flex-col gap-4">
          <Input 
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="p-3 rounded-xl bg-gray-700 text-white border-none"
          />
          <Input 
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(Math.max(0, Number(e.target.value)))}
            className="p-3 rounded-xl bg-gray-700 text-white border-none"
          />
          <Input 
            type="number"
            placeholder="Weight (lbs)"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            className="p-3 rounded-xl bg-gray-700 text-white border-none"
          />
          <Button onClick={addWorkout} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl">
            Add Workout
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-2xl">
        {weeks[selectedWeek] && weeks[selectedWeek].length > 0 ? (
          <Table className="w-full bg-gray-800 rounded-2xl overflow-hidden">
            <TableHead>
              <TableRow className="bg-gray-700 text-white">
                <TableCell>Workout</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Weight (lbs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks[selectedWeek].map((workout, index) => (
                <TableRow key={index} className="border-b border-gray-700">
                  <TableCell>{workout.workoutName}</TableCell>
                  <TableCell>{workout.reps}</TableCell>
                  <TableCell>{workout.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-400">No data for {selectedWeek} yet.</p>
        )}
      </div>
    </div>
  );
}
