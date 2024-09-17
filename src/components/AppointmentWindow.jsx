import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import useFetchFreeSlots from '../hooks/slot/useFetchFreeSlots';
import useReserveSlot from '../hooks/slot/useReserveSlot';
import useAuth from '../hooks/useAuth';

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
        <div className="flex">
            <div className="w-1/2 p-4">
                <Calendar
                    onChange={handleDateChange}
                    tileClassName={tileClassName}
                />
            </div>
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-4">Available Slots on {selectedDate?.toISOString().split('T')[0]}</h2>
                <ul>
                    {availableSlots.length > 0 ? (
                        availableSlots.map((slot) => (
                            <li key={slot.id} className="mb-2 p-2 bg-green-200 rounded">
                                {new Date(slot.time).toLocaleTimeString()}
                                <button
                                    className="ml-4 p-2 bg-blue-500 text-white rounded"
                                    onClick={() => handleSlotSelect(slot.id, user.id)}
                                    disabled={reserveLoading}
                                >
                                    Select
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No available slots</p>
                    )}
                </ul>
                {reserveError && <p>Error: {reserveError}</p>}
                <button onClick={onClose} className="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
            </div>
        </div>
    );
}

export default AppointmentWindow;