// src/hooks/psychologist/useFetchPsychologistUpcomingSessions.js
import { useState, useEffect } from 'react';
import config from '../../config';

function useFetchPsychologistUpcomingSessions(psychologistId) {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/reservations/psychologist/${psychologistId}/upcoming`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch upcoming sessions');
        }
        const data = await response.json();
        setUpcomingSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSessions();
  }, [psychologistId]);

  return { upcomingSessions, loading, error };
}

export default useFetchPsychologistUpcomingSessions;