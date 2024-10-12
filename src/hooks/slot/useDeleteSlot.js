import { useState } from 'react';
import config from '../../config.js';

const useDeleteSlot = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteSlot = async (slotId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.backendUrl}/slot/${slotId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete slot');
            }

            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteSlot, loading, error };
};

export default useDeleteSlot;