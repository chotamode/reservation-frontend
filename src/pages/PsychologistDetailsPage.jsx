import { useParams } from 'react-router-dom';
import Slot from '../components/Slot.tsx';
import reserveSlot from "../utils/reserveSlot.js";
import useAuth from "../hooks/useAuth.js";
import useFetchPsychologistDetails from '../hooks/useFetchPsychologistDetails';
import useFetchSlots from '../hooks/useFetchSlots';

function PsychologistDetailsPage() {
    const { id } = useParams();
    const { psychologist, error: psychologistError } = useFetchPsychologistDetails(id);
    const { slots, error: slotsError } = useFetchSlots(id);
    const { user } = useAuth();

    const handleReserve = async (slotId) => {
        try {
            const result = await reserveSlot(slotId, user.id);
            if (result.error) {
                alert(result.error);
            } else {
                alert('Slot reserved successfully!');
            }
        } catch (error) {
            console.error("Reservation error:", error.message);
            alert("Failed to reserve the slot.");
        }
    };

    if (psychologistError || slotsError) return <div>Error: {psychologistError || slotsError}</div>;
    if (!psychologist) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{psychologist.system_users.name} {psychologist.system_users.surname} {psychologist.system_users.patronymic}</h2>
            <p className="text-md text-gray-600">Specialization: {psychologist.specialization}</p>
            <p className="text-md text-gray-600">Experience: {psychologist.experience} years</p>
            <p className="text-md text-gray-600 mb-4">Contact: {psychologist.contact}</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Available Slots</h3>
            <div className="grid grid-cols-2 gap-4">
                {slots.map(slot => (
                    <Slot
                        key={slot.id}
                        id={slot.id}
                        time={slot.time}
                        onReserve={() => handleReserve(slot.id)}
                        reserved={!!slot.reserved_by}
                    />
                ))}
            </div>
        </div>
    );
}

export default PsychologistDetailsPage;