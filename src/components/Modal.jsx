import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Cross from '../assets/images/cross.svg';

function Modal({isOpen, onClose, children, header}) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div
                className="bg-white p-6 rounded-3xl border-1 border-black relative w-full max-w-[400px] md:max-w-[1200px] mx-auto py-10 px-5 sm:px-10 md:px-20 sm:py-10 md:py-14 max-h-[90vh] md:max-h-full">
                <div className={"flex flex-row justify-between items-center mb-12"}>
                    <h1 className={"text-2xl text-[#39442B] font-bold ml-0"}>
                        {header}
                    </h1>
                    <button onClick={onClose} className=" text-gray-500 hover:text-gray-700">
                        <img src={Cross} alt="cross" className={"w-4 h-4 sm:w-5 sm:h-5"}/>
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;