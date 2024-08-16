import { useState } from 'react';
import config from '../config.js';

function useManageSession() {
  const [error, setError] = useState(null);

  const cancelSession = async (sessionId) => {
    try {
      const response = await fetch(`${config.backendUrl}/slot/${sessionId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to cancel session');
      alert('Session cancelled successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const rescheduleSession = async (sessionId, newTime) => {
    try {
      const response = await fetch(`${config.backendUrl}/slot/${sessionId}/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ newTime })
      });
      if (!response.ok) throw new Error('Failed to reschedule session');
      alert('Session rescheduled successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return { cancelSession, rescheduleSession, error };
}

export default useManageSession;