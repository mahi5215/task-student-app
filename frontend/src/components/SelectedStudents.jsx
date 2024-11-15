import React from 'react';

const SelectedStudents = ({ selectedStudents, onSortAtoZ, onSortZtoA }) => {
  return (
    <div className="column">
      <h2>Selected Students</h2>

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button onClick={onSortAtoZ} className="sort-button">Sort A-Z</button>
        <button onClick={onSortZtoA} className="sort-button">Sort Z-A</button>
      </div>

      {/* Selected Students List */}
      {selectedStudents.length > 0 ? (
        selectedStudents.map((student, index) => (
          <div key={index} className="student-item selected-student">
            {student.name}
          </div>
        ))
      ) : (
        <p>No selected students</p>
      )}
    </div>
  );
};

export default SelectedStudents;
