// src/hooks/slot/useReserveSlot.js
import { useState } from 'react';
import config from '../../config.js';

const useReserveSlot = () => {
    const [error, setError] = useState(null);

    const reserveSlot = async (slotId, customerId) => {
        try {
            const response = await fetch(`${config.backendUrl}/slot/create-reservation-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ slotId, customerId })
            });

            if (!response.ok) {
                throw new Error('Failed to reserve slot');
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    return { reserveSlot, error };
};

export default useReserveSlot;