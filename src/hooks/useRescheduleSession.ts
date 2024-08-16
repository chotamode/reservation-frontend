import { useState } from 'react';
import config from '../config.js';

const useRescheduleSession = () => {
    const [error, setError] = useState(null);

    const rescheduleSession = async (currentSlotId: string, newSlotId: string, userId: string) => {
        try {
            const response = await fetch(`${config.backendUrl}/slot/reschedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ currentSlotId, newSlotId, userId })
            });
            if (!response.ok) throw new Error('Failed to reschedule session');
            alert('Session rescheduled successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    return { rescheduleSession, error };
};

export default useRescheduleSession;