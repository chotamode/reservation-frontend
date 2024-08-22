import PropTypes from 'prop-types';
import Psychologist from '../components/Psychologist';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetchPsychologistsBySpecialization from '../hooks/useFetchPsychologistsBySpecialization';
import config from '../config.js';
import { useEffect, useState } from "react";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [specialization, setSpecialization] = useState('');
  const { psychologists, loading, error } = useFetchPsychologistsBySpecialization(specialization);

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
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Logout
              </button>
              <button onClick={() => navigate(`/update-user/${user.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                Edit Profile
              </button>
            </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Available Psychologists</h2>
        <div className="mb-4">
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Select Specialization</label>
          <select
            id="specialization"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            <option value="Burnout">Burnout</option>
            <option value="Depression">Depression</option>
          </select>
        </div>
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

export default ProfilePage;