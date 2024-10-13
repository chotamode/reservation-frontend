import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cross from '../assets/images/cross.svg';

function Modal({ isOpen, onClose, children, header, marginRegForm}) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const disableBodyScroll = () => {
            document.body.style.overflow = 'hidden';  // Отключаем прокрутку основной страницы
        };

        const enableBodyScroll = () => {
            document.body.style.overflow = '';  // Восстанавливаем прокрутку основной страницы
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            disableBodyScroll();
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            enableBodyScroll();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="bg-white p-6 rounded-3xl border-1 border-black relative w-full max-w-[90%] md:max-w-[1200px] mx-auto py-4 px-3 sm:px-10 md:px-20 sm:py-10 md:py-14 max-h-[90vh] md:max-h-full overflow-y-auto md:overflow-visible ${marginRegForm} ">
                <div className={"flex flex-row justify-between items-center mb-6 md:mb-12 "}>
                    <h1 className={"text-xl md:text-2xl text-[#39442B] font-bold ml-2"}>
                        {header}
                    </h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <img src={Cross} alt="cross" className={"w-5 h-5 sm:w-6 sm:h-6"}/>
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;