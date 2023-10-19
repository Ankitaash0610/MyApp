import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3002/students');
      const students = await response.json();

      const foundStudent = students.find(
        (student) => student.studentId === parseInt(studentId) && student.password === password
      );

      if (!foundStudent) {
        alert('Invalid studentID or password');
      } else {
        localStorage.setItem('studentId', foundStudent.studentId);
        navigate('/studentInfo');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={styles.container}>
        <h1 style={styles.heading}>Student Management System</h1>
      <label style={styles.label}>
        Student ID:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.label}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const styles = {
    heading:{
        border: '1px solid black',
        color:'white',
        backgroundColor:'#5a9bd3',
        padding:'10px'
    },
  container: {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: '50px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    backgroundColor:'#a7d08c'
  },
  button: {
    backgroundColor: '#5a9bd3',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginForm;