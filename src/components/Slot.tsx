import PropTypes from 'prop-types';

interface SlotProps {
    time: string;
    onReserve: (time: string) => void;
    reserved: boolean;
}

const Slot: React.FC<SlotProps> = ({ time, onReserve, reserved }) => {
    return (
        <div className={`slot-container p-4 rounded-lg flex justify-between items-center ${reserved ? 'bg-gray-400' : 'bg-gray-100'}`}>
            <span className="text-gray-800">{time}</span>
            <button
                onClick={() => onReserve(time)}
                className="reserve-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={reserved}
            >
                {reserved ? 'Reserved' : 'Reserve'}
            </button>
        </div>
    );
};

Slot.propTypes = {
    time: PropTypes.string.isRequired,
    onReserve: PropTypes.func.isRequired,
    reserved: PropTypes.bool.isRequired,
};

export default Slot;