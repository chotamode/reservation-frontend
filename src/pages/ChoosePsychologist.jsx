import { useState } from "react";
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import useFetchPsychologists from "../hooks/psychologist/useFetchPsychologists.js";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal.jsx";
import useAuth from "../hooks/useAuth.js";
import CustomDropdown from "../components/CustomDropdown.jsx";
import { therapyTypes } from '../utils/constants/therapyTypes.js';

function PsychologistCard2({ psychologist }) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const defaultImage = "https://images.pexels.com/photos/4100672/pexels-photo-4100672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const handleButtonClick = () => {
        if (user) {
            navigate(`/psychologist-info/${psychologist.system_users.id}`);
        } else {
            setIsAuthModalOpen(true);
        }
    }

    const getTherapyTypeDetails = (typeId) => {
        return therapyTypes.find(type => type.id === typeId);
    };

    const truncateText = (text, limit) => {
        if (!text) return '';
        if (text.length <= limit) return text;

        // Обрезаем текст до предела
        const truncated = text.slice(0, limit);

        // Ищем последний пробел в обрезанной строке
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        // Если пробел найден, обрезаем до него, иначе возвращаем как есть
        return lastSpaceIndex > 0 ? `${truncated.slice(0, lastSpaceIndex)}...` : `${truncated}...`;
    };

    return (
        <div className="bg-white p-5 rounded-3xl font-roboto drop-shadow-md flex flex-col h-full mb-5">
            <div className="flex flex-col gap-7 flex-grow">
                <div className="flex flex-row gap-5 justify-start items-center">
                    <img src={psychologist.img || defaultImage} alt="Psychologist" className="rounded-full w-24 h-24 filter grayscale object-cover" />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">
                            {psychologist.system_users.name} {psychologist.system_users.surname}
                        </h1>
                        <p className="text-gray-500 text-md">
                            {psychologist.specialist_type}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700">
                    {truncateText(psychologist.mini_description, 300)}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                    {psychologist.therapy_type?.map((practice, index) => {
                        const therapyType = getTherapyTypeDetails(practice);
                        return (
                            <span key={index} className="rounded-lg p-1 px-2 text-xs"
                                style={{
                                    backgroundColor: therapyType ? therapyType.color : '#FFFFFF',
                                }}
                            >
                                {therapyType ? therapyType.name.ru : practice}
                            </span>
                        );
                    })}
                </div>
            </div>
            <button
                className="rounded-2xl bg-[#D3DBA8] w-full h-10 text-sm font-semibold mt-auto"
                onClick={handleButtonClick}
            >
                Записаться
            </button>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}

function ChoosePsychologist() {
    const { psychologists, loading, error } = useFetchPsychologists();
    const [selectedPractices, setSelectedPractices] = useState([]);

    const handleCheckboxChange = (selectedOptions) => {
        setSelectedPractices(selectedOptions);
        console.log(selectedOptions);
    };

    const filteredPsychologists = psychologists.filter(psychologist => {
        if (selectedPractices.length === 0) return true;
        return selectedPractices.some(practice => psychologist.therapy_type.includes(practice));
    });

    return (
        <div>
            <TopNav />
            <div className="flex flex-col gap-5 my-9">
                <h1 className="font-semibold font-[#39442B]">
                    Идеальный специалист для вас:
                </h1>
                <CustomDropdown
                    options={therapyTypes} // Use the English names from therapyTypes
                    selectedOptions={selectedPractices}
                    onChange={handleCheckboxChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    filteredPsychologists.map(psychologist => (
                        <PsychologistCard2 key={psychologist.system_users.id} psychologist={psychologist} />
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

export default ChoosePsychologist;