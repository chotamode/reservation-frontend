import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Footer from "../components/footer/Footer.jsx";
import TopNav from "../components/topnav/TopNav.jsx";
import useFetchFreeSlots from '../hooks/slot/useFetchFreeSlots';
import useFetchPsychologistDetails from '../hooks/psychologist/useFetchPsychologistDetails';
import useFetchNearestSlots from '../hooks/slot/useFetchNearestSlots';
import useReserveSlot from "../hooks/slot/useReserveSlot.js";
import Modal from '../components/Modal';
import AppointmentWindow from '../components/AppointmentWindow';

const defaultImage = "https://images.pexels.com/photos/4100672/pexels-photo-4100672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function PsychologistInfoPage() {
    const { id } = useParams();
    const { freeSlots, error: slotsError, loading: slotsLoading } = useFetchFreeSlots(id);
    const { psychologist, error: psychologistError, loading: psychologistLoading } = useFetchPsychologistDetails(id);
    const { slots: nearestSlots, loading: nearestSlotsLoading, error: nearestSlotsError } = useFetchNearestSlots(id);
    const { reserveSlot } = useReserveSlot();
    const [reservationError, setReservationError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSlotSelect = async (slotId, customerId) => {
        try {
            await reserveSlot(slotId, customerId);
            setIsModalOpen(false);
        } catch (error) {
            setReservationError(error.message);
        }
    };

    if (psychologistLoading || slotsLoading || nearestSlotsLoading) return <div>Loading...</div>;
    if (psychologistError) return <div>Error: {psychologistError}</div>;
    if (slotsError) return <div>Error: {slotsError}</div>;
    if (nearestSlotsError) return <div>Error: {nearestSlotsError}</div>;

    if (!psychologist) return <div>Error: Psychologist not found</div>;

    return (
        <div >
            <TopNav />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4 my-4 pt-10 md:pt-0 rounded-3xl items-center h-full font-roboto">
                <div className="bg-white rounded-3xl col-span-1 h-full mx-auto flex flex-row md:flex-col font-roboto items-center w-full justify-center p-7 md:p-3 mb-1 md:mb-0">
                    <div className="flex flex-row md:flex-col items-center w-full">
                    <img src={psychologist.system_users.image || defaultImage} alt="psychologist" className="rounded-full w-24 h-24 md:w-40 md:h-40 filter grayscale object-cover mb-20 -mt-4 md:mt-0 " />
                    <div className={"ml-4 md:ml-0 mt-0 md:mt-4"}>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {psychologist.system_users.name} {psychologist.system_users.surname} {psychologist.system_users.patronymic}
                    </h1>
                    <h3 className="text-lg md:text-xl font-normal text-[#4B5563]">Психолог</h3>
                    <div className="my-8 md:my-16 text-left w-full">
                        <p>{psychologist.system_users.email}</p>
                        <p>{psychologist.system_users.tg_username}</p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-3xl col-span-3 h-full gap-3 p-5 md:p-9 flex flex-col font-roboto mt-10 md:pt-0">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Биография:</h2>
                        <p className="text-lg font-normal text-[#374151] bg-[#EDF2CF] border-[#EDF2CF] rounded-3xl p-3">
                            {psychologist.biography}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2">Специализации</h2>
                        <SpecializationPills specializations={psychologist.therapy_type} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2">Сертификаты</h2>
                        {psychologist.certificates && psychologist.certificates.length > 0 ? (
                            psychologist.certificates.map((certificate) => (
                                <p key={certificate} className="font-normal text-[#374151]">
                                    {certificate}
                                </p>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-3xl h-full gap-2 p-5 md:p-9 flex flex-col font-roboto mb-12 mt-14">
                <h2 className="text-xl font-bold mb-5 md:mb-2">Свободные временные интервалы:</h2>
                <div className={"flex flex-row justify-between items-center"}>
                    <div className={"flex flex-row gap-2"}>
                        {nearestSlots.map(slot => (
                            <FreeSlotPill key={slot.id} dateAndTime={slot.time}/>
                        ))}
                    </div>
                    <button className="rounded-xl bg-[#D3DBA8] font-bold py-3 px-24"
                            onClick={handleOpenModal}>
                        Записаться
                    </button>
                </div>

            </div>
            <Footer/>
            <Modal isOpen={isModalOpen} header="Выберите дату и время" onClose={handleCloseModal}>
                <AppointmentWindow psychologistId={id} onSlotSelect={handleSlotSelect} />
            </Modal>
        </div>
    );
}

function SpecializationPills({specializations}) {
    if (!Array.isArray(specializations)) {
        return null;
    }

    return (
        <div className="flex flex-row gap-2">
            {specializations.map((specialization, index) => (
                <span key={index} className="rounded-lg bg-[#DBEAFE] px-3 py-1">
                    <p className="font-semibold text-[#1E40AF]">
                        {specialization}
                    </p>
                </span>
            ))}
        </div>
    );
}

function FreeSlotPill({ dateAndTime }) {
    const date = new Date(dateAndTime);
    const weekDay = date.toLocaleString('ru', { weekday: 'long' });
    const time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
    return (
        <div className="rounded-lg bg-[#DBEAFE] px-3 py-1 h-fit">
            <p className="font-normal text-[#1E40AF]">
                {weekDay}, {time}
            </p>
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