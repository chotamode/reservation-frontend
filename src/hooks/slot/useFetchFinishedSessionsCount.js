import { useEffect, useState } from 'react';
import config from '../../config.js';

function useFetchFinishedSessionsCount(userId) {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/reservations/customer/${userId}/finished/count`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setCount(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, [userId]);

    return { count, loading, error };
}

export default useFetchFinishedSessionsCount;