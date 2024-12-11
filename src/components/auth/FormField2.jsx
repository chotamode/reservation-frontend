import { useState } from 'react';

function FormField2({ id, label, type, value, onChange, placeholder, isCustomInput, isTextarea, min, max, error }) {

    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative">
            <label className="p-2 md:p-3 text-lg md:text-base" htmlFor={id}>
                {label}
            </label>
            {isTextarea ? (
                <textarea
                    id={id}
                    className={`w-full h-48 p-2 resize-none border rounded-lg focus:outline-none `}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}

                />
            ) : isCustomInput ? (
                <input
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-2 rounded-lg h-12 w-full p-2 text-gray-800 focus:outline-none`}
                   required
                />
            ) : (
                <input
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-1 border-[#39442B] appearance-none rounded-[25px] h-14 w-full py-2 my-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-[#39442B] text-lg px-10 ${error ? 'border-red-500' : ''}`}
                    required
                />
            )}
            {error && <p className="text-red-500 text-lg md:text-sm mt-1">{error}</p>}
        </div>
    );
}

export default FormField2;