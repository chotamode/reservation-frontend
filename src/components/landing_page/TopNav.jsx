import { Link } from 'react-router-dom';
import Logo from './../../assets/images/logo.svg';
import LoginIcon from './../../assets/images/login.svg';

function TopNav() {
    return (
        <nav className="bg-white shadow-lg p-4 rounded-3xl flex items-center h-28 hidden md:flex">
            <div className="flex-grow flex items-center w-full justify-between text-sm p-9">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="" />
                </Link>
                <Link to="/select-psychologist" className="text-gray-700 hover:text-gray-900 mx-2">ВЫБРАТЬ ПСИХОЛОГА</Link>
                <Link to="/for-psychologists" className="text-gray-700 hover:text-gray-900 mx-2">ДЛЯ ПСИХОЛОГОВ</Link>
                <Link to="/for-business" className="text-gray-700 hover:text-gray-900 mx-2">ДЛЯ БИЗНЕСА</Link>
                <Link to="/gift-certificate" className="text-gray-700 hover:text-gray-900 mx-2">ПОДАРОЧНЫЙ СЕРТИФИКАТ</Link>
                <Link to="/login">
                    <img src={LoginIcon} alt="Login" className="" />
                </Link>
            </div>
        </nav>
    );
}

export default TopNav;