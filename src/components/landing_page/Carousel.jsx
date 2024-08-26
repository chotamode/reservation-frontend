import { useState } from 'react';
import PsychologistCard from './PsychologistCard';

function Carousel({ psychologists }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % psychologists.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + psychologists.length) % psychologists.length);
    };

    const getVisiblePsychologists = () => {
        const visiblePsychologists = [];
        for (let i = 0; i < 3; i++) {
            visiblePsychologists.push(psychologists[(currentIndex + i) % psychologists.length]);
        }
        return visiblePsychologists;
    };

    return (
        <div className="bg-white border-1 rounded-3xl border-black w-full h-full flex flex-col items-center justify-center p-14">
            <div className="flex justify-between w-full mb-4">
                <h1>Мы поможем вам выбрать специалиста:</h1>
                <div className="flex justify-center">
                    <button onClick={handlePrev} className="bg-greenLight w-6 h-6 rounded-full mx-1">{'<'}</button>
                    <button onClick={handleNext} className="bg-greenLight w-6 h-6 rounded-full mx-1">{'>'}</button>
                </div>
            </div>
            <div className="w-full flex justify-center space-x-4">
                {getVisiblePsychologists().map((psychologist, index) => (
                    <PsychologistCard key={index} psychologist={psychologist} />
                ))}
            </div>
        </div>
    );
}

export default Carousel;