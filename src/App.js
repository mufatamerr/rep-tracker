import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function RepTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addWorkout = () => {
    if (workoutName && reps && weight) {
      setWorkouts([...workouts, { workoutName, reps, weight }]);
      setWorkoutName("");
      setReps("");
      setWeight("");
    }
  };

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
            onChange={(e) => setReps(e.target.value)}
            className="p-3 rounded-xl bg-gray-700 text-white border-none"
          />
          <Input 
            type="number"
            placeholder="Weight (lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-3 rounded-xl bg-gray-700 text-white border-none"
          />
          <Button onClick={addWorkout} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl">
            Add Workout
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-2xl">
        {workouts.length > 0 && (
          <Table className="w-full bg-gray-800 rounded-2xl overflow-hidden">
            <TableHead>
              <TableRow className="bg-gray-700 text-white">
                <TableCell>Workout</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Weight (lbs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts.map((workout, index) => (
                <TableRow key={index} className="border-b border-gray-700">
                  <TableCell>{workout.workoutName}</TableCell>
                  <TableCell>{workout.reps}</TableCell>
                  <TableCell>{workout.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
