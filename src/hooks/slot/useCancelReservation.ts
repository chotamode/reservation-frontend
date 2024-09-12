import { useState } from 'react';
import config from '../../config.js';

const useCancelReservation = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const cancelReservation = async (reservationId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${config.backendUrl}/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'canceled' }),
            });
            if (!response.ok) throw new Error('Failed to cancel reservation');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { cancelReservation, error, loading };
};

export default useCancelReservation;