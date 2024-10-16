import { useState } from 'react';
import config from "../config.js";

const useUploadAvatar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const uploadAvatar = async (userId, file) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`${config.backendUrl}/avatar/upload-avatar/${userId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            setSuccess('Avatar uploaded successfully!');
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { uploadAvatar, loading, error, success };
};

export default useUploadAvatar;