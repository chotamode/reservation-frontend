import { useEffect, useState } from 'react';
import config from '../../config.js';

function useFetchPsychologistsBySpecialization(specialization) {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const url = specialization
          ? `${config.backendUrl}/psychologists/specialization/${specialization}`
          : `${config.backendUrl}/psychologists`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setPsychologists(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, [specialization]);

  return { psychologists, loading, error };
}

export default useFetchPsychologistsBySpecialization;