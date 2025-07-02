import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ date, onChange }) => {
  const today = new Date();
  return (
    <div className="calendar-picker">
      <label style={{color: '#fff', fontWeight: 600, fontSize: '1.1rem'}}>Date</label>
      <DatePicker
        selected={new Date(date)}
        onChange={d => onChange(d.toISOString().slice(0, 10))}
        maxDate={today}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="calendar-input"
      />
    </div>
  );
};

export default Calendar; 