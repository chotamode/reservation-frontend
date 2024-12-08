import {Link} from "react-router-dom";

function Drawer({ isOpen, toggleDrawer }) {
    return (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="bg-white w-64 h-full p-4">
                <button onClick={toggleDrawer} className="text-black text-base mb-4">Close</button>
                <nav className="mt-4">
                    <Link to="/" className="block text-gray-700 hover:text-gray-900 my-2">Home</Link>
                    <Link to="/select-psychologist" className="block text-gray-700 hover:text-gray-900 my-2">ВЫБРАТЬ ПСИХОЛОГА</Link>
                    <Link to="/for-psychologists" className="block text-gray-700 hover:text-gray-900 my-2">ДЛЯ ПСИХОЛОГОВ</Link>
                    <Link to="/for-business" className="block text-gray-700 hover:text-gray-900 my-2">ДЛЯ БИЗНЕСА</Link>
                    <Link to="/gift-certificate" className="block text-gray-700 hover:text-gray-900 my-2">ПОДАРОЧНЫЙ СЕРТИФИКАТ</Link>
                    <Link to="/login" className="block text-gray-700 hover:text-gray-900 my-2 font-bold">Login</Link>
                </nav>
            </div>
        </div>
    );
}

export default Drawer;