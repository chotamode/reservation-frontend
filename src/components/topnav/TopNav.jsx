// src/components/topnav/TopNav.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import LoginIcon from '../../assets/images/login.svg';
import BusinessIcon from '../../assets/images/business/business_chubzik.svg';
import AuthModal from '../AuthModal.jsx';
import useAuth from '../../hooks/useAuth.js';
import { FaBars } from 'react-icons/fa';
import Drawer from '../landing_page/Drawer.jsx';
import userIcon from "../../assets/images/user.svg"; // Импортируем Drawer

function TopNav() {
    const [isActivateModalOpen, setActivateModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, isPsychologist, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (user) {
            if (isPsychologist) {
                navigate(`/psychologist-profile/${user.id}`);
                setIsDropdownOpen(!isDropdownOpen);
            } else {
                navigate('/profile');
                setIsDropdownOpen(!isDropdownOpen);
            }
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoutClick = () =>{
        logout();
        navigate('/');
    }

    const handleActivateCertificateClick = () => {
        setActivateModalOpen(true);
    };

    const handleProfileClick = () => {
        navigate(`/update-user/${user.id}`);
    };

    return (
        <>
            {/* Навигация для ПК */}
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
                    {isDropdownOpen && (
                        <div className="absolute left-auto right-0  flex flex-row mt-2 bg-white border rounded-lg shadow-lg justify-end">
                            {/*<button onClick={() => navigate('/profile')}*/}
                            {/*        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Мой*/}
                            {/*    Профиль*/}
                            {/*</button>*/}
                            {/*<button onClick={() => navigate('/activate-certificate')}*/}
                            {/*        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Активировать*/}
                            {/*    сертификат*/}
                            {/*</button>*/}
                            {/*<button onClick={handleLogoutClick}*/}
                            {/*        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout*/}
                            {/*</button>*/}
                            <button className={"rounded-2xl bg-red-500 text-white px-7 h-10 md:font-bold"}
                                    onClick={handleLogoutClick}>
                                Logout
                            </button>

                            <button
                                className="rounded-3xl bg-[#E9EFC8] p-2 "
                                onClick={handleActivateCertificateClick}
                            >
                                Активировать сертификат
                            </button>
                            <button className={"rounded-2xl bg-[#E5E7EB] px-7 h-10 flex items-center"}
                                    onClick={handleProfileClick}>
                                Мой профиль
                                <img src={userIcon} alt="User Icon" className="ml-2 h-6 w-6"/>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Мобильная навигация */}
            <nav className="bg-white shadow-lg p-2 rounded-2xl flex items-center h-16 md:hidden relative">
                <div className="flex-grow flex items-center pl-2 justify-between">
                    <button onClick={toggleMenu} className="text-[#586E1D]">
                        <FaBars size={28}/>
                    </button>
                    <img
                        src={user ? BusinessIcon : LoginIcon}
                        alt="Login"
                        className="cursor-pointer w-9 h-9 pr-1"
                        onClick={handleLoginClick}
                    />
                    {isDropdownOpen && (
                        <div className={"absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg flex flex-col items-end p-2"}>
                            <button className={"rounded-2xl bg-red-500 text-white px-7 h-10 md:font-bold"}
                                    onClick={handleLogoutClick}>
                                Logout
                            </button>

                            <button
                                className="rounded-3xl bg-[#E9EFC8] p-2 "
                                onClick={handleActivateCertificateClick}
                            >
                                Активировать сертификат
                            </button>
                            <button className={"rounded-2xl bg-[#E5E7EB] px-7 h-10 flex items-center"}
                                    onClick={handleProfileClick}>
                                Мой профиль
                                <img src={userIcon} alt="User Icon" className="ml-2 h-6 w-6"/>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Drawer для мобильной версии */}
            <Drawer isOpen={isMenuOpen} toggleDrawer={toggleMenu}/>

            {/* Модальное окно авторизации */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}/>
        </>
    );
}

export default TopNav;
