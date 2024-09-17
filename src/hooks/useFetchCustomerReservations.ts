import { useState, useEffect } from 'react';
import config from '../config.js';

const useFetchCustomerReservations = (customerId: string) => {
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [finishedReservations, setFinishedReservations] = useState([]);
    const [canceledReservations, setCanceledReservations] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const [upcomingResponse, finishedResponse, canceledResponse] = await Promise.all([
                    fetch(`${config.backendUrl}/reservations/customer/${customerId}/upcoming`),
                    fetch(`${config.backendUrl}/reservations/customer/${customerId}/finished`),
                    fetch(`${config.backendUrl}/reservations/customer/${customerId}/canceled`)
                ]);

                if (!upcomingResponse.ok || !finishedResponse.ok || !canceledResponse.ok) {
                    throw new Error('Failed to fetch reservations');
                }

                const upcomingData = await upcomingResponse.json();
                const finishedData = await finishedResponse.json();
                const canceledData = await canceledResponse.json();

                setUpcomingReservations(upcomingData);
                setFinishedReservations(finishedData);
                setCanceledReservations(canceledData);
                console.log(upcomingData, finishedData, canceledData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [customerId]);

    return { upcomingReservations, finishedReservations, canceledReservations, error, loading };
};

export default useFetchCustomerReservations;