import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import useFetchFreeSlots from '../hooks/slot/useFetchFreeSlots';
import useReserveSlot from '../hooks/slot/useReserveSlot';
import useAuth from '../hooks/useAuth';
import FormField2 from "./auth/FormField2.jsx";

function AppointmentWindow({ psychologistId, onSlotSelect, onClose }) {
    const { user } = useAuth();
    const { freeSlots, error: slotsError, loading: slotsLoading } = useFetchFreeSlots(psychologistId);
    const { reserveSlot, error: reserveError, loading: reserveLoading } = useReserveSlot();
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const slotsForDate = freeSlots.filter(slot => slot.time.startsWith(formattedDate));
            setAvailableSlots(slotsForDate);
        }
    }, [selectedDate, freeSlots]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSlotSelect = async (slotId, customerId) => {
        await onSlotSelect(slotId, customerId);
        onClose();
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            if (formattedDate === selectedDate?.toISOString().split('T')[0]) {
                return 'react-calendar__tile--selected';
            }
            const slotsForDate = freeSlots.filter(slot => slot.time.startsWith(formattedDate));
            if (slotsForDate.length > 0) {
                return 'react-calendar__tile--bg-black';
            } else {
                return 'react-calendar__tile--bg-gray-300';
            }
        }
        return null;
    };

    if (slotsLoading) return <div>Loading...</div>;
    if (slotsError) return <div>Error: {slotsError}</div>;

    return (

            <div className="flex flex-col md:flex-row py-4 md:py-8 w-full justify-between  ">
                    <div className="flex flex-row w-full md:w-[600px]">

                        <div className="flex w-full md:w-1/2 flex-col">
                            <h2 className="mb-2 ml-2 font-bold text-lg">
                                Календарь
                            </h2>
                            <div className="">
                                <Calendar
                                    onChange={handleDateChange}
                                    tileClassName={tileClassName}
                                />
                            </div>
                        </div>


                        <div className="flex flex-col w-full md:w-1/2">

                            <h2 className="text-xl font-bold mb-2">Свободное время</h2>

                            <div className="border-1 rounded-lg p-4">
                                {/*<h2 className="text-xl font-bold mb-4">Available Slots on {selectedDate?.toISOString().split('T')[0]}</h2>*/}
                                <ul className="h-60 md:h-80">
                                    {availableSlots.length > 0 ? (
                                        availableSlots.map((slot) => (
                                            <li key={slot.id} className="mb-2">

                                                <button
                                                    className="w-full p-3 text-left bg-[#D3DBA8] hover:border-1 border-[#646A46] rounded-md"
                                                    onClick={() => handleSlotSelect(slot.id, user.id)}
                                                    disabled={reserveLoading}
                                                >

                                                     <span className="text-left font-inter">
                                                        {new Date(slot.time).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                     </span>

                                                    <span className="ml-1 text-start font-inter">
                                                        {new Date(slot.time).toLocaleTimeString([], { hour12: true }).split(' ')[1]}
                                                    </span>

                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p>Нет свободных мест в этот день</p>
                                    )}
                                </ul>
                                {reserveError && <p>Error: {reserveError}</p>}
                            </div>
                        </div>
                    </div>


                <div className="flex flex-col w-full md:w-1/2">

                    <div className="flex flex-col gap-6 max-w-full md:max-w-[445px]">

                        <div className="flex flex-col ">

                            <h1 className="ml-6 mb-3 font-semibold text-xl">Выберите тему сессии</h1>

                            <FormField2
                                type="text"
                                name="theme"
                                isCustomInput={true}
                                className="border-1 p-2  w-full"/>

                        </div>

                        <div className="flex flex-col ">

                            <h1 className="ml-6 mb-3 font-semibold text-xl">Заметки по желанию</h1>
                            <FormField2
                                type="text"
                                name="notes"
                                isTextarea={true}
                                className="border  rounded p-2 w-full"
                            />

                        </div>

                    </div>

                    <div className="flex w-full h-10 justify-center mt-4">
                        <button
                            className="bg-[#D3DBA8] w-full md:w-80 rounded-xl"
                            onClick={onClose}
                        >
                            Записаться
                        </button>
                    </div>


                </div>
            </div>

    );
}

export default AppointmentWindow;