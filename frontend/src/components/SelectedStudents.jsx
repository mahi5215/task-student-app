import React from 'react';

const SelectedStudents = ({ selectedStudents }) => {
  return (
    <div className="column">
      <h2>Selected Students</h2>
      {selectedStudents.map((student, index) => (
        <div key={index} className="student-item selected-student">
          {student.name}
        </div>
      ))}
    </div>
  );
};

export default SelectedStudents;
