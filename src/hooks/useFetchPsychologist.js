import { useEffect, useState } from 'react';
import config from '../config.js';

function useFetchPsychologist(id) {
  const [psychologist, setPsychologist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/psychologists/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setPsychologist(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPsychologist();
  }, [id]);

  return { psychologist, error };
}

export default useFetchPsychologist;