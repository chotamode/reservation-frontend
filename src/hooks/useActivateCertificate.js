import { useState } from 'react';
import config from '../config';

function useActivateCertificate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activateCertificate = async (certificateId, userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.backendUrl}/certificates/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ certificateId, userId })
      });

      if (!response.ok) {
        throw new Error('Failed to activate certificate');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { activateCertificate, loading, error };
}

export default useActivateCertificate;