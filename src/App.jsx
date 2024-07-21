import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";

const dummyUser = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

const dummyPsychologists = [
  { id: 1, name: 'Dr. Smith', specialization: 'Clinical Psychology', experience: 10, contact: 'smith@example.com' },
  { id: 2, name: 'Dr. Johnson', specialization: 'Counseling Psychology', experience: 8, contact: 'johnson@example.com' },
  // Add more dummy data as needed
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage user={dummyUser} psychologists={dummyPsychologists} />} />
      </Routes>
    </Router>
  );
}

export default App;