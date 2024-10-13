import { useState } from 'react';
import ArrowIcon from './../../assets/images/arrow_accordeon.svg?react';
import AccordeonPerson from './../../assets/images/accordeon_person.svg?react';

function Accordeon({ contentElements, header }) {
    const [openIndices, setOpenIndices] = useState([]);

    const toggleAccordion = (index) => {
        setOpenIndices((prevOpenIndices) =>
            prevOpenIndices.includes(index)
                ? prevOpenIndices.filter((i) => i !== index)
                : [...prevOpenIndices, index]
        );
    };

    return (
        <div className="w-full md:w-[73rem] space-y-4 bg-white rounded-3xl border-black p-6 md:p-24 relative">
            <div className="flex flex-row h-16 items-end">
                <AccordeonPerson className="h-full" />
                <h1 className="text-2xl md:text-4xl font-bold ml-4">
                    {header}
                </h1>
            </div>
            {contentElements.map((element, index) => (
                <div key={index} className="bg-greenLight border-black rounded-3xl w-full">
                    <button
                        className="w-full text-left focus:outline-none flex justify-between items-center rounded-3xl p-4 md:p-7"
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
                        <div className="px-4 md:px-7 pb-4 md:pb-10">
                            <p>{element.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordeon;