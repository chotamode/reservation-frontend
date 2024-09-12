// src/pages/PsychologistInfoPage.jsx
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Footer from "../components/footer/Footer.jsx";
import TopNav from "../components/topnav/TopNav.jsx";
import useFetchFreeSlots from '../hooks/slot/useFetchFreeSlots';
import useFetchPsychologistDetails from '../hooks/psychologist/useFetchPsychologistDetails';
import Slot from '../components/Slot';
import useReserveSlot from "../hooks/slot/useReserveSlot.js";
import useAuth from "../hooks/useAuth.js";

function PsychologistInfoPage() {
    const { id } = useParams();
    const { freeSlots, error: slotsError, loading: slotsLoading } = useFetchFreeSlots(id);
    const { psychologist, error: psychologistError, loading: psychologistLoading } = useFetchPsychologistDetails(id);
    const { reserveSlot, error: reserveError } = useReserveSlot();
    const [reservationError, setReservationError] = useState(null);
    // const {user, isPsychologist, isAdmin} = useAuth();

    const handleReserve = async (slotId) => {
        try {
            await reserveSlot(slotId, 'd6a4ecdf-d874-4278-9615-b73e3c686e59');
            // Update the free slots state
            // setFreeSlots(freeSlots.filter(slot => slot.id !== slotId));
        } catch (error) {
            setReservationError(error.message);
        }
    };

    const handleCancel = (slotId) => {
        // Implement cancellation logic here
    };

    if (psychologistLoading || slotsLoading) return <div>Loading...</div>;
    if (psychologistError) return <div>Error: {psychologistError}</div>;
    if (slotsError) return <div>Error: {slotsError}</div>;

    if (!psychologist) return <div>Error: Psychologist not found</div>;

    return (
        <div>
            <TopNav />
            <div className="grid grid-cols-4 gap-4 my-4 rounded-3xl font-raleway items-center h-full">
                <div className="bg-white rounded-3xl col-span-1 h-full mx-auto flex flex-col font-roboto items-center w-full justify-center">
                    <img src={psychologist.system_users.image} alt="psychologist" className="w-40 h-40 object-cover rounded-t-3xl filter grayscale" />
                    <h1 className="text-3xl font-bold">
                        {psychologist.system_users.name} {psychologist.system_users.surname} {psychologist.system_users.patronymic}
                    </h1>
                    <h3 className="text-xl font-normal text-[#4B5563]">Психолог</h3>
                    <div className="my-16">
                        <p>{psychologist.system_users.email}</p>
                        <p>{psychologist.system_users.tg_username}</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl col-span-3 h-full gap-4 p-9 flex flex-col font-roboto">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Биография</h2>
                        <p className="text-lg font-normal text-[#374151]">
                            {psychologist.system_users.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Свободные слоты</h2>
                        <ul>
                            {freeSlots.map(slot => (
                                <Slot
                                    key={slot.id}
                                    id={slot.id}
                                    time={slot.time}
                                    onReserve={handleReserve}
                                    onCancel={handleCancel}
                                    reserved={false}
                                    psychologistId={id}
                                    userId="currentUserId" // Replace with actual user ID
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

PsychologistInfoPage.propTypes = {
    psychologist: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        surname: PropTypes.string,
        patronymic: PropTypes.string,
        email: PropTypes.string,
        telegram: PropTypes.string,
        description: PropTypes.string,
        specializations: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default PsychologistInfoPage;