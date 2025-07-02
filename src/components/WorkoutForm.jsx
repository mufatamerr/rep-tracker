import React, { useState } from 'react';

const muscleGroups = [
  { label: 'Chest', icon: '🏋️‍♂️' },
  { label: 'Back', icon: '💪' },
  { label: 'Legs', icon: '🦵' },
  { label: 'Arms', icon: '💪' },
  { label: 'Shoulders', icon: '🤸‍♂️' },
  { label: 'Core', icon: '🧘‍♂️' },
];

const initialExercise = { muscle: '', reps: '', partials: '', weight: '' };

const WorkoutForm = ({ onAdd, date }) => {
  const [exercises, setExercises] = useState([ { ...initialExercise } ]);
  const [superset, setSuperset] = useState(false);

  const handleChange = (idx, field, value) => {
    const updated = exercises.map((ex, i) => i === idx ? { ...ex, [field]: value } : ex);
    setExercises(updated);
  };

  const addExercise = () => setExercises([...exercises, { ...initialExercise }]);
  const removeExercise = idx => setExercises(exercises.filter((_, i) => i !== idx));

  const handleSubmit = e => {
    e.preventDefault();
    if (exercises.some(ex => !ex.muscle || !ex.reps || !ex.weight)) return;
    onAdd({ date, exercises });
    setExercises([ { ...initialExercise } ]);
    setSuperset(false);
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="date-label">{date}</div>
      {exercises.map((ex, idx) => (
        <div className="exercise-row" key={idx}>
          <div className="muscle-group-select">
            {muscleGroups.map(mg => (
              <button type="button" key={mg.label} className={`muscle-btn${ex.muscle === mg.label ? ' selected' : ''}`} onClick={() => handleChange(idx, 'muscle', mg.label)}>{mg.icon}</button>
            ))}
          </div>
          <input type="number" min="0" placeholder="Reps" value={ex.reps} onChange={e => handleChange(idx, 'reps', e.target.value)} required />
          <input type="number" min="0" placeholder="Partials (opt)" value={ex.partials} onChange={e => handleChange(idx, 'partials', e.target.value)} />
          <input type="number" min="0" placeholder="Weight (lbs)" value={ex.weight} onChange={e => handleChange(idx, 'weight', e.target.value)} required />
          {superset && exercises.length > 1 && <button type="button" className="remove-ex" onClick={() => removeExercise(idx)}>✖</button>}
        </div>
      ))}
      <div className="superset-row">
        <label>
          <input type="checkbox" checked={superset} onChange={e => setSuperset(e.target.checked)} /> Superset Mode
        </label>
        {superset && <button type="button" className="add-ex" onClick={addExercise}>+ Add Exercise</button>}
      </div>
      <button className="log-btn" type="submit">Log Workout</button>
    </form>
  );
};

export default WorkoutForm; 