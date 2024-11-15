// App.jsx
import React, { useState, useEffect } from 'react';
import AvailableStudents from './components/AvailableStudents';
import SelectedStudents from './components/SelectedStudents';
import './App.css';

const App = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch initial student list from the server
    fetch('https://mean-appp.onrender.com/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data); // Initialize filtered list
      })
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  // Function to handle selecting a student
  const handleSelectStudent = (student) => {
    if (!selectedStudents.some((s) => s._id === student._id)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
    setShowDropdown(false);
    setSearchTerm(''); // Clear search field after selection
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setShowDropdown(false);
      setFilteredStudents(students); // Reset to full list
    } else {
      const matches = students.filter((student) =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStudents(matches);
      setShowDropdown(true);
    }
  };

  // Function to handle adding a new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      fetch('https://mean-appp.onrender.com/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStudentName }),
      })
        .then((res) => res.json())
        .then((newStudent) => {
          setNewStudentName(''); // Clear the input field after adding
          setStudents((prev) => [...prev, newStudent]); // Add the new student to the list
          setFilteredStudents((prev) => [...prev, newStudent]); // Update filtered list
        })
        .catch((err) => console.error('Error adding student:', err));
    }
  };

  // Function to handle sorting available students A-Z
  const handleSortAtoZ = () => {
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    setStudents(sorted);
    setFilteredStudents(sorted); // Update filtered students list as well
  };

  // Function to handle sorting available students Z-A
  const handleSortZtoA = () => {
    const sorted = [...students].sort((a, b) => b.name.localeCompare(a.name));
    setStudents(sorted);
    setFilteredStudents(sorted); // Update filtered students list as well
  };

  // Function to handle sorting selected students A-Z
  const handleSortSelectedAtoZ = () => {
    const sortedSelected = [...selectedStudents].sort((a, b) => a.name.localeCompare(b.name));
    setSelectedStudents(sortedSelected);
  };

  // Function to handle sorting selected students Z-A
  const handleSortSelectedZtoA = () => {
    const sortedSelected = [...selectedStudents].sort((a, b) => b.name.localeCompare(a.name));
    setSelectedStudents(sortedSelected);
  };

  return (
    <div className="container">
      <div className="search-add-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {showDropdown && (
            <ul className="dropdown">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <li
                    key={student._id}
                    onClick={() => handleSelectStudent(student)}
                    className="dropdown-item"
                  >
                    {student.name}
                  </li>
                ))
              ) : (
                <li className="dropdown-item">No students found</li>
              )}
            </ul>
          )}
        </div>

        <form onSubmit={handleAddStudent} className="add-form">
          <input
            type="text"
            placeholder="Add new student"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            className="add-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>

      {/* Render AvailableStudents component */}
      <AvailableStudents
        students={filteredStudents}
        onSelect={handleSelectStudent}
        onSortAtoZ={handleSortAtoZ}
        onSortZtoA={handleSortZtoA}
      />

      {/* Render SelectedStudents component */}
      <SelectedStudents
        selectedStudents={selectedStudents}
        onSortAtoZ={handleSortSelectedAtoZ}
        onSortZtoA={handleSortSelectedZtoA}
      />
    </div>
  );
};

export default App;
