import { useState } from 'react';
import config from '../../config.js';

const useCreateSlot = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createSlot = async (psychologistId, duration, time) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.backendUrl}/slot/create-slot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ psychologistId, duration, time })
            });

            if (!response.ok) {
                throw new Error('Failed to create slot');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createSlot, loading, error };
};

export default useCreateSlot;