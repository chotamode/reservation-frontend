import { useState } from 'react';

function FormField2({ id, label, type, value, onChange, placeholder, isTextarea  }) {

    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative">
            <label className="p-3" htmlFor={id}>
                {label}
            </label>
            {isTextarea ? (
                    <textarea
                        id={id}
                        className="w-full h-48 p-2 border rounded-lg"
                        placeholder={isFocused ? '' : placeholder}
                        value={value}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={onChange}
                    />
                ) : (
            <input
                placeholder={isFocused ? '' : placeholder}
                type={type}
                id={id}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
                className="border-1 border-[#39442B] appearance-none rounded-[25px] h-14 w-full py-2 my-1
                           text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-[#39442B] text-lg px-10"
                required
            />)}
        </div>
    );
}

export default FormField2;