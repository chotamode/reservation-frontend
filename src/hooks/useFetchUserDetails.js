import { useEffect, useState } from 'react';
import config from '../config.js';

function useFetchUserDetails(id) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, [id]);

  return { user, error };
}

export default useFetchUserDetails;