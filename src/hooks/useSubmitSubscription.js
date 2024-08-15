import { useState } from 'react';
import config from '../config.js';

function useSubmitSubscription() {
  const [error, setError] = useState(null);

  const submitSubscription = async ({ psychologistId, ownerId, totalCount }) => {
    try {
      const response = await fetch(`${config.backendUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ psychologistId, ownerId, totalCount })
      });
      if (!response.ok) throw new Error('Failed to create subscription');
      alert('Subscription created successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return { submitSubscription, error };
}

export default useSubmitSubscription;