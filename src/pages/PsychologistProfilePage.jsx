import { useParams, useNavigate } from 'react-router-dom';
import useFetchPsychologist from '../hooks/useFetchPsychologist';
import useFetchSlots from '../hooks/useFetchSlots';
import useAuth from '../hooks/useAuth';
import config from '../config.js';
import { useEffect, useState } from 'react';

function PsychologistProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isPsychologist, logout } = useAuth();
    const { psychologist, error: psychologistError } = useFetchPsychologist(id);
    const { slots, error: slotsError } = useFetchSlots(id);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (psychologistError || slotsError || error) return <div>Error: {psychologistError || slotsError || error}</div>;
    if (loading || !psychologist || !userDetails) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userDetails.name} {userDetails.surname} {userDetails.patronymic}
            </h2>
            <p className="text-md text-gray-600">Email: {userDetails.email}</p>
            <p className="text-md text-gray-600">Phone: {userDetails.phone}</p>
            <p className="text-md text-gray-600">Telegram Username: {userDetails.tg_username}</p>
            <p className="text-md text-gray-600">Specialization: {psychologist.specialization}</p>
            <p className="text-md text-gray-600">Experience: {psychologist.experience} years</p>
            <p className="text-md text-gray-600 mb-4">Contact: {psychologist.contact}</p>
            {isPsychologist && user.id === id && (
                <>
                    <button onClick={() => navigate(`/update-psychologist/${id}`)} className="btn btn-secondary mb-4">Edit Psychologist Details</button>
                    <button onClick={() => navigate(`/update-user/${id}`)} className="btn btn-secondary mb-4">Edit User Details</button>
                    <button onClick={() => navigate(`/create-slot`)} className="btn btn-secondary mb-4">Create Slot</button>
                    <button onClick={logout} className="btn btn-primary mb-4">Logout</button>
                </>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Available Slots</h3>
            <div className="grid grid-cols-2 gap-4">
                {slots.map(slot => (
                    <div key={slot.id} className="bg-gray-100 p-4 rounded shadow-md">
                        <p>Time: {new Date(slot.time).toLocaleString()}</p>
                        <p>Duration: {slot.duration} minutes</p>
                        <p>Reserved By: {slot.reserved_by ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PsychologistProfilePage;