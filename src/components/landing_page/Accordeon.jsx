import {useState} from 'react';
import ArrowIcon from './../../assets/images/arrow_accordeon.svg?react';
import AccordeonPerson from './../../assets/images/accordeon_person.svg?react';

function Accordeon({contentElements}) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full space-y-4 bg-white rounded-3xl border-1 border-black p-28">
            <div className="flex flex-row h-16 items-end">
                <AccordeonPerson className="h-full"/>
                <h1 className="text-4xl font-bold">
                    ХОТИТЕ УЗНАТЬ БОЛЬШЕ О <span className="font-kodchasan">METOD</span>
                </h1>
            </div>
            {contentElements.map((element, index) => (
                <div key={index} className="bg-greenLight border-1 border-black rounded-3xl p-7">
                    <button
                        className="w-full text-left focus:outline-none flex justify-between items-center rounded-3xl"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h2 className="text-lg font-semibold">{element.title}</h2>
                        <ArrowIcon
                            className={`transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}/>
                    </button>
                    {openIndex === index && (
                        <div className="p-4">
                            <p>{element.text}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordeon;