import React, { useEffect, useState } from 'react';

const StudentList = ({ onSelect }) => {
  const [students, setStudents] = useState([]); // State to hold student list

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://mean-appp.onrender.com/students');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
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
