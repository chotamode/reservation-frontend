import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slot from '../components/Slot.jsx';
import supabase from "../supabaseClient.js";
import reserveSlot from "../utils/reserveSlot.js";
import useAuth from "../hooks/useAuth.js";

async function fetchPsychologistDetails(id) {
    const { data: psychologistData, error: psychologistError } = await supabase
        .from('psychologists')
        .select(`
      id,
      experience,
      system_user:system_users (
        name,
        surname,
        email,
        patronymic
      )
    `)
        .eq('id', id)
        .single();

    if (psychologistError) throw new Error(psychologistError.message);

    const { data: slotsData, error: slotsError } = await supabase
        .from('slots')
        .select('*')
        .eq('psychologist_id', id);

    if (slotsError) throw new Error(slotsError.message);

    return { psychologist: psychologistData, slots: slotsData };
}

function PsychologistDetailsPage() {
    const { id } = useParams();
    const [psychologist, setPsychologist] = useState(null);
    const [slots, setSlots] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchPsychologistDetails(id).then(data => {
            setPsychologist(data.psychologist);
            setSlots(data.slots);
        }).catch(error => {
            console.error("Failed to fetch psychologist details:", error.message);
        });
    }, [id]);

    const handleReserve = async (slotId) => {
        console.log(slotId, user.id);
        try {
            const result = await reserveSlot(slotId, user.id);
            console.log(user.id);
            if (result.error) {
                alert(result.error);
            } else {
                alert('Slot reserved successfully!');
                // Optionally, refresh the slots to show the updated reservation status
            }
        } catch (error) {
            console.error("Reservation error:", error.message);
            alert("Failed to reserve the slot.");
        }
    };

    if (!psychologist) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{psychologist.system_user.name} {psychologist.system_user.surname} {psychologist.system_user.patronymic}</h2>
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