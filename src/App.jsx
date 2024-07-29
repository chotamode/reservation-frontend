import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import PsychologistDetailsPage from './pages/PsychologistDetailsPage.jsx';
import useAuth from "./hooks/useAuth.js";

function App() {
  const { user } = useAuth(); // Use the useAuth hook

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/psychologist/:id" element={<PsychologistDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;