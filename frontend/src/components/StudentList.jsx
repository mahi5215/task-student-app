import React, { useEffect, useState } from 'react';

const StudentList = ({ onSelect }) => {
  const [students, setStudents] = useState([]); // State to hold student list

  // Fetch students from API
  useEffect(() => {
    fetch('http://localhost:5000/students') 
      .then((response) => response.json())
      .then((data) => setStudents(data)) 
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="column">
      <h2>Available Students</h2>
      {students.map((student) => (
        <div
          key={student._id} 
          className="student-item"
          onClick={() => onSelect(student)}
        >
          {student.name}
        </div>
      ))}
    </div>
  );
};

export default StudentList;
