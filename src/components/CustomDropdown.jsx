import { useState } from 'react';
import PropTypes from 'prop-types';
import arrowIcon from '../assets/images/selector_arrow.svg';

function CustomDropdown({ options, selectedOptions, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempSelectedOptions, setTempSelectedOptions] = useState(selectedOptions);

    const handleCheckboxChange = (option) => {
        if (tempSelectedOptions.includes(option)) {
            setTempSelectedOptions(tempSelectedOptions.filter((item) => item !== option));
        } else {
            setTempSelectedOptions([...tempSelectedOptions, option]);
        }
    };

    const handleApply = () => {
        onChange(tempSelectedOptions);
        setIsOpen(false);
    };

    return (
        <div className="relative z-10 w-full">
            <button
                className="rounded-2xl p-2 px-4 drop-shadow-md w-full text-left bg-white border-gray-300 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                Тип терапии
                <img
                    src={arrowIcon}
                    alt="Arrow Icon"
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}
                />
            </button>
            {isOpen && (
                <div className="absolute bg-white border-gray-300 rounded-2xl mt-5 w-full px-6 pt-4">
                    {options.map((option) => (
                        <label key={option.id} className="flex items-center p-2 font-normal">
                            <input
                                type="checkbox"
                                value={option.id}
                                onChange={() => handleCheckboxChange(option.id)}
                                checked={tempSelectedOptions.includes(option.id)}
                                // className="mr-2 w-6 h-6 accent-[#D3DBA8] appearance-none border border-gray-400 rounded-md checked:bg-[#D3DBA8] checked:border-transparent"
                                className="mr-2 w-6 h-6 accent-[#D3DBA8]"
                            />
                            {option.name.ru}
                        </label>
                    ))}
                    <button
                        className="w-full bg-[#D3DBA8] text-black font-semibold p-2 rounded-full mb-8 mt-4"
                        onClick={handleApply}
                    >
                        Применить
                    </button>
                </div>
            )}
        </div>
    );
}

CustomDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.shape({
            en: PropTypes.string.isRequired,
            ru: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomDropdown;