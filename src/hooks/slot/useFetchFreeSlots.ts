import { useState, useEffect } from 'react';
import config from '../../config.js';

const useFetchFreeSlots = (psychologistId: string) => {
    const [freeSlots, setFreeSlots] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFreeSlots = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/slot/free?psychologistId=${psychologistId}`);
                if (!response.ok) throw new Error('Failed to fetch free slots');
                const data = await response.json();
                setFreeSlots(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFreeSlots();
    }, [psychologistId]);

    return { freeSlots, error, loading };
};

export default useFetchFreeSlots;