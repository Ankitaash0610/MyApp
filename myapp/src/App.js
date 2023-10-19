import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/LoginForm';
import RegistrationForm from './Pages/RegistrationForm';
import StudentInfo from './Pages/StudentInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/studentMgmt" element=<LoginForm/> />
        <Route path="/register" element=<RegistrationForm/> />
        <Route path="/studentInfo" element=<StudentInfo/> />
      </Routes>
    </Router>
  );
}

export default App;