import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cross from '../assets/images/cross.svg';

function Modal({ isOpen, onClose, children, header }) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Отключаем скролл заднего фона
        } else {
            document.body.style.overflow = ''; // Включаем обратно скролл
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = ''; // Восстанавливаем скролл при размонтировании компонента
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl border-1 border-black relative w-[1200px] mx-auto py-14 px-20 max-h-full scrollbar-hide overflow-y-auto">
                <div className="flex flex-row justify-between items-center mb-12">
                    <h1 className="text-2xl text-[#39442B] font-bold ml-0">
                        {header}
                    </h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <img src={Cross} alt="cross" className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;