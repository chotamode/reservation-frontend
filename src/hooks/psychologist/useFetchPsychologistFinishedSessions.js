import { useState, useEffect } from 'react';
import config from '../../config';

function useFetchPsychologistFinishedSessions(psychologistId) {
  const [finishedSessions, setFinishedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinishedSessions = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/reservations/psychologist/${psychologistId}/finished`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch finished sessions');
        }
        const data = await response.json();
        setFinishedSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedSessions();
  }, [psychologistId]);

  return { finishedSessions, loading, error };
}

export default useFetchPsychologistFinishedSessions;