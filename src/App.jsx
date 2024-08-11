import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import PsychologistDetailsPage from './pages/PsychologistDetailsPage.jsx';
import PsychologistProfilePage from './pages/PsychologistProfilePage.jsx';
import UpdateUserDetails from './pages/UpdateUserDetails.jsx';
import UpdatePsychologistDetails from './pages/UpdatePsychologistDetails.jsx';
import useAuth from './hooks/useAuth.js';
import config from "./config.js";
import CreateSlot from "./pages/CreateSlot.jsx";

function App() {
  const { user, isPsychologist } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${config.backendUrl}/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          setUserDetails(data.user);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={user && !isPsychologist ? <ProfilePage userDetails={userDetails} /> : <Navigate to="/login" />} />
        <Route path="/psychologist/:id" element={<PsychologistDetailsPage />} />
        <Route path="/psychologist-profile/:id" element={isPsychologist ? <PsychologistProfilePage /> : <Navigate to="/login" />} />
        <Route path="/update-user/:id" element={user ? <UpdateUserDetails /> : <Navigate to="/login" />} />
        <Route path="/update-psychologist/:id" element={isPsychologist ? <UpdatePsychologistDetails /> : <Navigate to="/login" />} />
        <Route path="/create-slot" element={isPsychologist ? <CreateSlot /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;