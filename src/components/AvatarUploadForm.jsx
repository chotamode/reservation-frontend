import { useState } from 'react';
import useAuth from '../hooks/useAuth';

function AvatarUploadForm() {
    const { user, isPsychologist } = useAuth();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`/upload-avatar/${user.id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            setSuccess('Avatar uploaded successfully!');
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    if (!isPsychologist) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="avatar-upload-form">
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Avatar</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </form>
    );
}

export default AvatarUploadForm;