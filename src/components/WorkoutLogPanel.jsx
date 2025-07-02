import React from 'react';

const muscleColors = {
  Back: '#4F8EF7',
  Biceps: '#F76E6E',
  Calves: '#FFD166',
  Chest: '#FF6B6B',
  Core: '#6BCB77',
  Forearms: '#A259F7',
  Hamstrings: '#F7B267',
  Quads: '#43B0F1',
  Shoulders: '#FFD166',
  Triceps: '#F48498',
};

const WorkoutLogPanel = ({ workouts }) => (
  <div className="workout-log-panel">
    <h3>Today's Workouts</h3>
    {workouts.length === 0 ? <div className="empty">No workouts logged.</div> :
      workouts.map((w, idx) => (
        <div className="workout-log-card" key={idx}>
          <div className="workout-muscle" style={{color: muscleColors[w.muscle] || '#fff'}}>{w.muscle}</div>
          <div className="workout-details">
            <span>Reps: {w.reps}</span>
            {w.partials && <span>Partials: {w.partials}</span>}
            <span>Weight: {w.weight} lbs</span>
          </div>
        </div>
      ))}
  </div>
);

export default WorkoutLogPanel; 