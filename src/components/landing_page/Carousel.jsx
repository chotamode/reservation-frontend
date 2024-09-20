import { useState } from 'react';
import PsychologistCard from './PsychologistCard';
import PaginationArrow from '../../assets/images/pagination_arrow.svg?react';

function Carousel({ psychologists }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % psychologists.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + psychologists.length) % psychologists.length);
    };

    const getVisiblePsychologists = () => {
        const visiblePsychologists = [];
        for (let i = 0; i < 3; i++) {
            visiblePsychologists.push(psychologists[(currentIndex + i) % psychologists.length]);
        }
        return visiblePsychologists;
    };

    return (
        <div
            className="bg-white rounded-3xl border-black w-full h-full flex flex-col items-center justify-center p-14">
            <div className="flex justify-between w-full mb-4 items-center">
                <h1 className="font-semibold font-raleway">
                    Мы поможем вам выбрать специалиста:
                </h1>
                <div className="flex justify-center gap-5">
                    <button onClick={handlePrev}
                            className="w-12 h-12 border-1 border-black rounded-lg mx-1 flex items-center justify-center">
                        <PaginationArrow/>
                    </button>
                    <button onClick={handleNext}
                            className="w-12 h-12 border-1 border-black rounded-lg mx-1 flex items-center justify-center">
                        <PaginationArrow className="transform rotate-180"/>
                    </button>
                </div>
            </div>
            <div className="w-full h-[31.625rem] flex space-x-6 mb-32 mt-16">
                {getVisiblePsychologists().map((psychologist, index) => (
                    <PsychologistCard key={index} psychologist={psychologist}/>
                ))}
            </div>
        </div>
    );
}

export default Carousel;