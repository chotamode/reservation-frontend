import { useState } from 'react';
import config from '../../config.js';

const useRescheduleReservation = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const rescheduleReservation = async (reservationId: string, newSlotId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${config.backendUrl}/reservations/${reservationId}/reschedule`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newSlotId }),
            });
            if (!response.ok) throw new Error('Failed to reschedule reservation');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { rescheduleReservation, error, loading };
};

export default useRescheduleReservation;