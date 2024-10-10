import { useState } from 'react';
import config from "../config.js";

const useLeaveRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const leaveRequest = async (name, email, phone, reqComType) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${config.backendUrl}/for-business/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    reqComType
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { leaveRequest, loading, error, success };
};

export default useLeaveRequest;