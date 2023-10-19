import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

   // <---------------------logic---------------->


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [courseName, setCourseName] = useState('Mechanical');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:3002/students');
      const students = await response.json();

      if (firstName.length < 3) {
        alert('Name is too short');
      } else if (!isNaN(lastName)) {
        alert('Last Name cannot be an integer');
      } else if (!isNaN(instituteName)) {
        alert('Institute name cannot be an integer');
      } else if (password.length !== 8) {
        alert('Password must be 8 characters long');
      } else {

        const newStudent = {
          studentId: students.length + 1,
          firstName,
          lastName,
          instituteName,
          courseName,
          password,
        };

        await fetch('http://localhost:3002/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
        });

        localStorage.setItem('studentId', newStudent.studentId);
        navigate('/studentInfo');
      }
    } catch (error) {
      console.error('Error fetching or updating data:', error);
    }
  };

  // <-----------------html----------jsx element(html elements which are able to call function and use logic)--------------->
  return (
    <div style={styles.container}>
               <h1 style={styles.heading}>Student Management System</h1>
      <label style={styles.label}>
        First Name:
        <input
          type="text"
          value={firstName}
          // curly bracket --> denotes dynamic values and object
          // trigger on change event
          onChange={(e) => setFirstName(e.target.value)}

          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.label}>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.label}>
        Institute Name:
        <input
          type="text"
          value={instituteName}
          onChange={(e) => setInstituteName(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label style={styles.label}>
        Course Name:
        <select
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={styles.input}
        >
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="IT">IT</option>
          <option value="Electronics">Electronics</option>
        </select>
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
      <button style={styles.button} onClick={handleRegistration}>
        Submit
      </button>
    </div>
  );
};

///<------------------------------------- styling

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
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    boxSizing: 'border-box',
    backgroundColor:'#a7d08c',
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

export default RegistrationForm;