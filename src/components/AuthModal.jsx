// src/components/AuthModal.jsx
import { useState } from 'react';
import Modal from './Modal.jsx';
import LoginForm from './auth/LoginForm.jsx';
import RegistrationForm from './auth/RegistrationForm.jsx';
import PsychologistRegistrationForm from './auth/PsychologistRegistrationForm.jsx';

function AuthModal({ isOpen, onClose }) {
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isPsychologistRegisterOpen, setIsPsychologistRegisterOpen] = useState(false);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} header="Вход в личный кабинет">
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
        </>
    );
}

export default AuthModal;