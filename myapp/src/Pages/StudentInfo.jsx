import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear("studentId");
    navigate("/studentMgmt");
  }

  useEffect(() => {
    // Fetch the stored student ID from local storage
    const storedStudentId = localStorage.getItem('studentId');


    if (storedStudentId) {
      const fetchStudentInfo = async () => {
        try {
          // Fetching data from the server
          const response = await fetch('http://localhost:3002/students');
          const students = await response.json();

          // Finding the student with the stored ID
          const foundStudent = students.find((student) => student.studentId === parseInt(storedStudentId));

          if (foundStudent) {
            setStudent(foundStudent);
          } else {
            console.error('Student not found in the database');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchStudentInfo();
    }
  }, []);

  if (!student) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to StudentInfo Page</h2>
      <p style={styles.info}>Student ID: {student.studentId}</p>
      <p style={styles.info}>First Name: {student.firstName}</p>
      <p style={styles.info}>Last Name: {student.lastName}</p>
      <p style={styles.info}>Institute Name: {student.instituteName}</p>
      <p style={styles.info}>Course Name: {student.courseName}</p>
    
    </div>
      <br />
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
      </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    marginTop:"10%"
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  info: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  loading: {
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    backgroundColor: '#5a9bd3',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '48%',

  },
};

export default StudentInfo;