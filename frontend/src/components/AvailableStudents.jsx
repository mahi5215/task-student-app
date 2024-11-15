// AvailableStudents.jsx
import React from 'react';

const AvailableStudents = ({ students, onSelect, onSortAtoZ, onSortZtoA }) => {
  return (
    <div className="column">
      <h2>Available Students</h2>

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button onClick={onSortAtoZ} className="sort-button">Sort A-Z</button>
        <button onClick={onSortZtoA} className="sort-button">Sort Z-A</button>
      </div>

      {/* Student List */}
      <ul className="student-list">
        {students.length > 0 ? (
          students.map((student) => (
            <li
              key={student._id}
              onClick={() => onSelect(student)}
              className="student-item"
            >
              {student.name}
            </li>
          ))
        ) : (
          <li className="dropdown-item">No students found</li>
        )}
      </ul>
    </div>
  );
};

export default AvailableStudents;
