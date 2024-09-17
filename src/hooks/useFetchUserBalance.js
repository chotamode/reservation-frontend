import { useState, useEffect } from 'react';
import config from '../config';

function useFetchUserBalance(userId) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/customers/${userId}/balance`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user balance');
        }
        const data = await response.json();
        setBalance(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBalance();
  }, [userId]);

  return { balance, loading, error };
}

export default useFetchUserBalance;