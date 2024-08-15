import { useEffect, useState } from 'react';
import config from '../config.js';

function useFetchPsychologists() {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/psychologists`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setPsychologists(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  return { psychologists, loading, error, setPsychologists };
}

export default useFetchPsychologists;