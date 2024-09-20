// src/components/topnav/TopNav.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import LoginIcon from '../../assets/images/login.svg';
import BusinessIcon from '../../assets/images/business/business_chubzik.svg';
import AuthModal from '../AuthModal.jsx';
import useAuth from '../../hooks/useAuth.js';

function TopNav() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
            setIsAuthModalOpen(true);
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
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </nav>
    );
}

export default TopNav;