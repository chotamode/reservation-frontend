import { useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal.jsx';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

function PsychologistCard({ psychologist }) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { image, specialist_type, mini_description } = psychologist;
    const { name } = psychologist.system_users;
    const defaultImage = "https://images.pexels.com/photos/4100672/pexels-photo-4100672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleNavigate = () => {
        if (user) {
            navigate(`/psychologist-info/${psychologist.id}`);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <div className="psychologist-card bg-[#DEECFF] rounded-3xl w-1/3 h-full flex flex-col min-h-full">
            <div className="w-full h-[35%]">
                <img src={image || defaultImage} alt="psychologist" className="w-full h-full object-cover rounded-t-3xl filter grayscale" />
            </div>

            <div className="psychologist-card__info w-full px-11 py-7 items-center flex flex-col gap-4 h-full">
                <p>{specialist_type}</p>
                <h3 className={"font-semibold text-2xl"}>
                    {name}
                </h3>
                <p>{mini_description}</p>
                <div className="w-full h-full flex flex-col justify-end">
                    <button onClick={handleNavigate} className="rounded-2xl border-1 border-[#6A704C] w-full font-bold text-xl py-2">
                        Записаться
                    </button>
                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}

export default PsychologistCard;