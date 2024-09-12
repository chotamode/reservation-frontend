import { useState, useEffect } from 'react';
import config from '../config.js';

const useFetchCustomerReservations = (customerId: string) => {
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [finishedReservations, setFinishedReservations] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const [upcomingResponse, finishedResponse] = await Promise.all([
                    fetch(`${config.backendUrl}/reservations/customer/${customerId}/upcoming`),
                    fetch(`${config.backendUrl}/reservations/customer/${customerId}/finished`)
                ]);

                if (!upcomingResponse.ok || !finishedResponse.ok) {
                    throw new Error('Failed to fetch reservations');
                }

                const upcomingData = await upcomingResponse.json();
                const finishedData = await finishedResponse.json();

                setUpcomingReservations(upcomingData);
                setFinishedReservations(finishedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [customerId]);

    return { upcomingReservations, finishedReservations, error, loading };
};

export default useFetchCustomerReservations;