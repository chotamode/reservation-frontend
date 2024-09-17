import { useState, useEffect } from 'react';
import config from "../../config.js";

const useFetchNearestSlots = (psychologistId, limit = 3) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/slot/nearest-free-slots?psychologistId=${psychologistId}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch nearest slots');
                }
                const data = await response.json();
                setSlots(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, [psychologistId, limit]);

    return { slots, loading, error };
};

export default useFetchNearestSlots;