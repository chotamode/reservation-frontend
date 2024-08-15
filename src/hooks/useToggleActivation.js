import { useState } from 'react';
import config from '../config.js';

function useToggleActivation() {
  const [error, setError] = useState(null);

  const toggleActivation = async (id, currentStatus, setPsychologists) => {
    try {
      const response = await fetch(`${config.backendUrl}/psychologists/${id}/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ activated: !currentStatus })
      });
      if (response.ok) {
        setPsychologists(prevPsychologists =>
          prevPsychologists.map(psych =>
            psych.id === id ? { ...psych, activated: !currentStatus } : psych
          )
        );
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { toggleActivation, error };
}

export default useToggleActivation;