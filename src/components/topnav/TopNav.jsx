import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import LoginIcon from '../../assets/images/login.svg';
import BusinessIcon from '../../assets/images/business/business_chubzik.svg';
import Modal from '../Modal.jsx';
import LoginForm from '../auth/LoginForm.jsx';
import RegistrationForm from '../auth/RegistrationForm.jsx';
import PsychologistRegistrationForm from '../auth/PsychologistRegistrationForm.jsx';
import useAuth from '../../hooks/useAuth.js';

function TopNav() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isPsychologistRegisterOpen, setIsPsychologistRegisterOpen] = useState(false);
    const { user, isPsychologist } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (user) {
            if (isPsychologist) {
                navigate(`/psychologist-profile/${user.id}`);
            } else {
                navigate('/profile');
            }
        } else {
            setIsLoginOpen(true);
        }
    };

    return (
        <nav className="bg-white shadow-lg p-4 rounded-3xl flex items-center h-28 hidden md:flex">
            <div className="flex-grow flex items-center w-full justify-between text-sm p-9">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="" />
                </Link>
                <Link to="/select-psychologist" className="text-gray-700 hover:text-gray-900 mx-2">ВЫБРАТЬ ПСИХОЛОГА</Link>
                <Link to="/for-psychologists" className="text-gray-700 hover:text-gray-900 mx-2">ДЛЯ ПСИХОЛОГОВ</Link>
                <Link to="/for-business" className="text-gray-700 hover:text-gray-900 mx-2">ДЛЯ БИЗНЕСА</Link>
                <Link to="/FAQ" className="text-gray-700 hover:text-gray-900 mx-2">ВОПРОС-ОТВЕТ</Link>
                <Link to="/gift-certificate" className="text-gray-700 hover:text-gray-900 mx-2">ПОДАРОЧНЫЙ СЕРТИФИКАТ</Link>
                <img
                    src={user ? BusinessIcon : LoginIcon}
                    alt="Login"
                    className="cursor-pointer w-14 h-14"
                    onClick={handleLoginClick}
                />
            </div>
            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} header="Вход в личный кабинет">
                <LoginForm
                    onClose={() => setIsLoginOpen(false)}
                    onOpenRegister={() => {
                        setIsLoginOpen(false);
                        setIsRegisterOpen(true);
                    }}
                    onOpenPsychologistRegister={() => {
                        setIsLoginOpen(false);
                        setIsPsychologistRegisterOpen(true);
                    }}
                />
            </Modal>
            <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} header={"Регистрация"}>
                <RegistrationForm
                    onClose={() => setIsRegisterOpen(false)}
                    onOpenLogin={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                    }}
                />
            </Modal>
            <Modal isOpen={isPsychologistRegisterOpen} onClose={() => setIsPsychologistRegisterOpen(false)} header={"Регистрация для психолога"}>
                <PsychologistRegistrationForm onClose={() => setIsPsychologistRegisterOpen(false)} />
            </Modal>
        </nav>
    );
}

export default TopNav;