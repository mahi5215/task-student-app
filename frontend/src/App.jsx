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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://mean-appp.onrender.com/students');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSelectStudent = (student) => {
    if (!selectedStudents.some((s) => s._id === student._id)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
    setShowDropdown(false);
    setSearchTerm('');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setShowDropdown(false);
      setFilteredStudents(students);
    } else {
      const matches = students.filter((student) =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStudents(matches);
      setShowDropdown(matches.length > 0);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      try {
        const res = await fetch('https://mean-appp.onrender.com/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newStudentName }),
        });
        if (!res.ok) throw new Error('Failed to add student');
        const newStudent = await res.json();
        setStudents((prev) => [...prev, newStudent]);
        setFilteredStudents((prev) => [...prev, newStudent]);
        setNewStudentName('');
      } catch (err) {
        console.error('Error adding student:', err);
      }
    }
  };

  const sortStudents = (list, direction) =>
    [...list].sort((a, b) =>
      direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleSortAtoZ = () => {
    const sorted = sortStudents(students, 'asc');
    setStudents(sorted);
    setFilteredStudents(sorted);
  };

  const handleSortZtoA = () => {
    const sorted = sortStudents(students, 'desc');
    setStudents(sorted);
    setFilteredStudents(sorted);
  };

  const handleSortSelectedAtoZ = () => {
    setSelectedStudents(sortStudents(selectedStudents, 'asc'));
  };

  const handleSortSelectedZtoA = () => {
    setSelectedStudents(sortStudents(selectedStudents, 'desc'));
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

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
            aria-label="Search students"
          />
          {showDropdown && (
            <ul className="dropdown">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <li
                    key={student._id}
                    onClick={() => handleSelectStudent(student)}
                    className="dropdown-item"
                    tabIndex={0}
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
            aria-label="Add new student"
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>

      <AvailableStudents
        students={filteredStudents}
        onSelect={handleSelectStudent}
        onSortAtoZ={handleSortAtoZ}
        onSortZtoA={handleSortZtoA}
      />

      <SelectedStudents
        selectedStudents={selectedStudents}
        onSortAtoZ={handleSortSelectedAtoZ}
        onSortZtoA={handleSortSelectedZtoA}
      />
    </div>
  );
};

export default App;
