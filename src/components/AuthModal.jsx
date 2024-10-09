// src/components/AuthModal.jsx
import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import LoginForm from './auth/LoginForm.jsx';
import RegistrationForm from './auth/RegistrationForm.jsx';
import PsychologistRegistrationForm from './auth/PsychologistRegistrationForm.jsx';

function AuthModal({ isOpen, onClose }) {
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isPsychologistRegisterOpen, setIsPsychologistRegisterOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsLoginOpen(true);
            setIsRegisterOpen(false);
            setIsPsychologistRegisterOpen(false);
        }
    }, [isOpen]);

    // Добавляем класс отступа сверху, если открыта форма для психологов
    const modalClass = isPsychologistRegisterOpen ? 'mt-20' : '';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            header="Вход в личный кабинет"
            marginRegForm={modalClass}  // Передаем класс для отступа
        >
            {isLoginOpen && (
                <LoginForm
                    onClose={onClose}
                    onOpenRegister={() => {
                        setIsLoginOpen(false);
                        setIsRegisterOpen(true);
                    }}
                    onOpenPsychologistRegister={() => {
                        setIsLoginOpen(false);
                        setIsPsychologistRegisterOpen(true);
                    }}
                />
            )}
            {isRegisterOpen && (
                <RegistrationForm
                    onClose={onClose}
                    onOpenLogin={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                    }}
                />
            )}
            {isPsychologistRegisterOpen && (
                <PsychologistRegistrationForm onClose={onClose} />
            )}
        </Modal>
    );
}

export default AuthModal;