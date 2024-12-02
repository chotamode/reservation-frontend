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
        <div className="w-[75rem] space-y-4 bg-white rounded-3xl border-black pt-16 pb-20 px-20 relative">
            <div className="flex mb-8 flex-row h-16 items-end">
                <AccordeonPerson className="h-full" />
                <h1 className="text-xl ml-4 font-medium">
                    {header}
                </h1>
            </div>
            {contentElements.map((element, index) => (
                <div key={index} className="bg-greenLight border-black rounded-3xl">
                    <button
                        className="w-full h-full text-left focus:outline-none flex justify-between items-center rounded-3xl p-7"
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
                        <div className="px-7 pb-10">
                            <p>{element.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordeon;