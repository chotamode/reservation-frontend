import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import PsychologistDetailsPage from './pages/PsychologistDetailsPage.jsx';
import CreateSlotsPage from './pages/CreateSlotsPage.jsx';
import PsychologistProfilePage from './pages/PsychologistProfilePage.jsx';
import useAuth from './hooks/useAuth.js';

function App() {
  const { user, isPsychologist } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={user && !isPsychologist ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/psychologist/:id" element={<PsychologistDetailsPage />} />
        <Route path="/create-slot" element={user ? <CreateSlotsPage /> : <Navigate to="/login" />} />
        <Route path="/psychologist-profile/:id" element={isPsychologist ? <PsychologistProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;