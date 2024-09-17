import { useState, useEffect } from 'react';
import config from '../../config';

function useFetchPsychologistCanceledSessions(psychologistId) {
  const [canceledSessions, setCanceledSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCanceledSessions = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/reservations/psychologist/${psychologistId}/canceled`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch canceled sessions');
        }
        const data = await response.json();
        setCanceledSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledSessions();
  }, [psychologistId]);

  return { canceledSessions, loading, error };
}

export default useFetchPsychologistCanceledSessions;