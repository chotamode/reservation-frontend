import PropTypes from 'prop-types';
import Psychologist from '../components/Psychologist';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config.js';
import {useEffect, useState} from "react";

function ProfilePage({ user }) {
  const { logout } = useAuth();
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/psychologists`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const psychologistsData = await response.json();
        setPsychologists(psychologistsData);
      } catch (error) {
        console.error("Error fetching psychologists:", error.message);
      }
    };

    fetchPsychologists();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Available Psychologists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {psychologists.map((psychologist) => (
          <Link to={`/psychologist/${psychologist.id}`} key={psychologist.id} className="no-underline">
            <Psychologist psychologist={psychologist}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ProfilePage;