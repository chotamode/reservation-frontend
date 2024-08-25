import { useState } from 'react';
import PsychologistCard from './PsychologistCard';

function Carousel({ psychologists }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % psychologists.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + psychologists.length) % psychologists.length);
    };

    return (
        <div className="bg-white border-1 border-black w-full h-full flex flex-col items-center justify-center p-14">
            <div className="flex justify-between w-full mb-4">
                <h1>Мы поможем вам выбрать специалиста:</h1>
                <div className="flex justify-center">
                    <button onClick={handlePrev} className="bg-greenLight w-6 h-6 rounded-full mx-1">{'<'}</button>
                    <button onClick={handleNext} className="bg-greenLight w-6 h-6 rounded-full mx-1">{'>'}</button>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <PsychologistCard psychologist={psychologists[currentIndex]} />
            </div>
        </div>
    );
}

export default Carousel;