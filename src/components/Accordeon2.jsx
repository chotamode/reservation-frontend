import { useState } from 'react';
import ArrowIcon from './../assets/images/dropdown_arrow.svg?react';

function Accordeon2({ contentElements, header, className }) {
    const [openIndices, setOpenIndices] = useState([]);

    const toggleAccordion = (index) => {
        setOpenIndices((prevOpenIndices) =>
            prevOpenIndices.includes(index)
                ? prevOpenIndices.filter((i) => i !== index)
                : [...prevOpenIndices, index]);
    };

    return (
        <div className={`w-full space-y-6 bg-white rounded-3xl p-24 relative ${className} mb-32`}>
            <div className="flex flex-row h-16 items-end">
                <h1 className="text-4xl font-bold">
                    {header}
                </h1>
            </div>
            {contentElements.map((element, index) => (
                <div
                    key={index}
                    className={`rounded-3xl p-7 ${openIndices.includes(index) ? 'bg-[#E9EFC8]' : 'bg-[#DEECFF]'} drop-shadow-sm`}
                >
                    <button
                        className="w-full text-left focus:outline-none flex justify-between items-center rounded-3xl"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h2 className="text-lg font-semibold">{element.title}</h2>
                        <ArrowIcon
                            className={`transform transition-transform duration-300 ${openIndices.includes(index) ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    <div
                        className={`transition-all duration-700 ease-in-out overflow-hidden ${openIndices.includes(index) ? 'max-h-96' : 'max-h-0'}`}
                    >
                        <div className="pt-4">
                            <p>{element.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordeon2;