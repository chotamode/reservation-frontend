import PropTypes from 'prop-types';
import Psychologist from '../components/Psychologist';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config.js';
import { useEffect, useState } from "react";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/user/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="container mx-auto p-4">
        {userDetails && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Welcome, {userDetails.name}!</h1>
              <p>Phone: {userDetails.phone}</p>
              <p>Email: {userDetails.email}</p>
              <p>Full Name: {userDetails.surname + ' ' + userDetails.name + ' ' + userDetails.patronymic}</p>
              <p>Telegram Nickname: {userDetails.tg_username}</p>
              <button onClick={logout} className="btn btn-primary">Logout</button>
              <button onClick={() => navigate(`/update-user/${user.id}`)} className="btn btn-secondary">Edit Profile</button>
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
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    fullName: PropTypes.string,
    telegramNickname: PropTypes.string,
  }),
};

export default ProfilePage