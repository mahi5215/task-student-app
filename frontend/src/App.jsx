import React, { useState } from 'react';
import StudentList from './components/StudentList';
import SelectedStudents from './components/SelectedStudents';
import './App.css';

const App = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSelectStudent = (student) => {
    // Check if student is already selected to avoid duplicates
    if (!selectedStudents.some((s) => s._id === student._id)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
  };

  return (
    <div className="container">
      <StudentList onSelect={handleSelectStudent} />
      <SelectedStudents selectedStudents={selectedStudents} />
    </div>
  );
};

export default App;
