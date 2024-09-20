import { useState } from 'react';

function CustomDropdown({ options, selectedOptions, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCheckboxChange = (option) => {
        onChange(option);
    };

    return (
        <div className="relative z-10 w-full">
            <button
                className="rounded-full p-2 px-4 drop-shadow-md w-full text-left bg-white border-1 border-gray-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                Тип терапии
            </button>
            {isOpen && (
                <div className="absolute bg-white border-1 border-gray-300 rounded-xl mt-2 w-full">
                    {options.map((option) => (
                        <label key={option} className="flex items-center p-2">
                            <input
                                type="checkbox"
                                value={option}
                                onChange={() => handleCheckboxChange(option)}
                                checked={selectedOptions.includes(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;