import { useState } from "react";
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import useFetchPsychologists from "../hooks/psychologist/useFetchPsychologists.js";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal.jsx";
import useAuth from "../hooks/useAuth.js";
import CustomDropdown from "../components/CustomDropdown.jsx";

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
                    {psychologist.mini_description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                    {psychologist.therapy_type.map((practice, index) => (
                        <span key={index} className="rounded-lg bg-[#D3DBA8] p-1 px-2 text-xs">
                            {practice}
                        </span>
                    ))}
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

    const handleCheckboxChange = (practice) => {
        setSelectedPractices((prevSelectedPractices) =>
            prevSelectedPractices.includes(practice)
                ? prevSelectedPractices.filter((p) => p !== practice)
                : [...prevSelectedPractices, practice]
        );
    };

    const filteredPsychologists = psychologists.filter((psychologist) =>
        selectedPractices.length === 0 ||
        psychologist.therapy_type.some((practice) => selectedPractices.includes(practice))
    );

    return (
        <div>
            <TopNav />
            <div className="flex flex-col gap-5 my-9">
                <h1 className="font-semibold font-[#39442B]">
                    Идеальный специалист для вас:
                </h1>
                {/* Custom dropdown with checkboxes */}
                <CustomDropdown
                    options={["CBT", "psychoanalysis", "gestalt", "humanistic"]}
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
                        <PsychologistCard2 key={psychologist.name} psychologist={psychologist} />
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

export default ChoosePsychologist;