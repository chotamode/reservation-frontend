import { useState } from 'react';
import config from '../config.js';

function useCreateAndSendCertificate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAndSendCertificate = async ({ sender, amount, email }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.backendUrl}/certificates/create-and-send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ sender, amount, email })
      });
      if (!response.ok) throw new Error('Failed to create and send certificate');
      alert('Certificate created and sent successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createAndSendCertificate, loading, error };
}

export default useCreateAndSendCertificate;