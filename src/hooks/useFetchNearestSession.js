import { useState, useEffect } from 'react';
import config from '../config';

function useFetchNearestSession(userId) {
  const [nearestSession, setNearestSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNearestSession = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/reservations/customer/${userId}/upcoming/reservation`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nearest session');
        }
        const data = await response.json();
        setNearestSession(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNearestSession();
  }, [userId]);

  return { nearestSession, loading, error };
}

export default useFetchNearestSession;