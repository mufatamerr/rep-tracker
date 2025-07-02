import React from 'react';

const WorkoutList = ({ workouts, onCopy, isOld }) => (
  <div className={`workout-list${isOld ? ' old' : ''}`}>
    {workouts.length === 0 ? <div className="empty">No workouts logged.</div> :
      workouts.map((w, idx) => (
        <div className="workout-item" key={idx}>
          <div className="workout-muscle">{w.muscle} {w.icon}</div>
          <div className="workout-details">
            <span>Reps: {w.reps}</span>
            {w.partials && <span>Partials: {w.partials}</span>}
            <span>Weight: {w.weight} lbs</span>
          </div>
          {isOld && <button className="copy-btn" onClick={() => onCopy(w)}>Copy to Today</button>}
        </div>
      ))}
  </div>
);

export default WorkoutList; 