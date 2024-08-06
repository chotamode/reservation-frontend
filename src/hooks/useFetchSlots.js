import { useEffect, useState } from 'react';
import config from '../config.js';

function useFetchSlots(id) {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/slot?psychologist_id=${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSlots();
  }, [id]);

  return { slots, error };
}

export default useFetchSlots;