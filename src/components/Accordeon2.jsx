import { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowIcon from './../assets/images/dropdown_arrow.svg?react';

function Accordeon2({ contentElements, header, className }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`w-full space-y-6 bg-white rounded-3xl p-6 sm:p-12 md:p-24 relative  ${className} mb-32`}>
            <div className="flex flex-row h-12 items-end pt-40 sm:pt-12 md:pt-24">
                <h1 className="text-4xl font-bold">
                    {header}
                </h1>
            </div>
            {contentElements.map((element, index) => (
                <div
                    key={index}
                    className={`rounded-3xl p-7 ${openIndex === index ? 'bg-[#E9EFC8]' : 'bg-[#DEECFF]'} drop-shadow-sm`}
                >
                    <button
                        className="w-full text-left focus:outline-none flex justify-between items-center rounded-3xl"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h2 className="text-lg font-semibold">{element.title}</h2>
                        <ArrowIcon
                            className={`transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    <div
                        className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
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

Accordeon2.propTypes = {
    contentElements: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    header: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Accordeon2;