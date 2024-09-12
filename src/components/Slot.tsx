import { useState } from 'react';
import PropTypes from 'prop-types';
import useFreeSlots from '../hooks/slot/useFreeSlots';
import useRescheduleSession from '../hooks/useRescheduleSession';

interface SlotProps {
    id: string;
    time: string;
    onReserve: (id: string) => void;
    onCancel: (id: string) => void;
    reserved: boolean;
    psychologistId: string;
    userId: string;
}

const Slot: React.FC<SlotProps> = ({ id, time, onReserve, onCancel, reserved, psychologistId, userId }) => {
    const { freeSlots, error: freeSlotsError } = useFreeSlots(psychologistId);
    const { rescheduleSession, error: rescheduleError } = useRescheduleSession();
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const handleReschedule = () => {
        if (selectedSlotId) {
            rescheduleSession(id, selectedSlotId, userId);
        }
    };

    return (
        <div className={`slot-container p-4 rounded-lg flex justify-between items-center ${reserved ? 'bg-gray-400' : 'bg-gray-100'}`}>
            <span className="text-gray-800">{time}</span>
            <div className="flex space-x-2">
                <button
                    onClick={() => onReserve(id)}
                    className="reserve-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={reserved}
                >
                    {reserved ? 'Reserved' : 'Reserve'}
                </button>
                {reserved && (
                    <>
                        <button
                            onClick={() => onCancel(id)}
                            className="cancel-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <select
                            value={selectedSlotId}
                            onChange={(e) => setSelectedSlotId(e.target.value)}
                            className="reschedule-select bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                        >
                            <option value="">Select new time</option>
                            {freeSlots.map(slot => (
                                <option key={slot.id} value={slot.id}>{slot.time}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleReschedule}
                            className="reschedule-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Reschedule
                        </button>
                    </>
                )}
            </div>
            {(freeSlotsError || rescheduleError) && <div className="text-red-500">{freeSlotsError || rescheduleError}</div>}
        </div>
    );
};

Slot.propTypes = {
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    onReserve: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    reserved: PropTypes.bool.isRequired,
    psychologistId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};

export default Slot;