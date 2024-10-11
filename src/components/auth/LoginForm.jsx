import { useState } from 'react';
import FormField from './FormField.jsx';
import { login } from '../../utils/auth.js';
import useAuth from '../../hooks/useAuth.js';
import AuthButton from "./AuthButton.jsx";
import eye from '../../assets/images/eye.svg';
import eyeOff from '../../assets/images/eye-off.svg';

function LoginForm({ onClose, onOpenRegister, onOpenPsychologistRegister }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { user, isPsychologist } = useAuth();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(formData);
            onClose();
            if (isPsychologist) {
                navigate(`/psychologist-profile/${user.id}`);
            } else {
                navigate('/profile');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded mx-44 gap-7 flex flex-col">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваша почта"
            />
            <FormField
                id="password"
                label="Пароль"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                rightButton={{
                    icon: <img src={showPassword ? eyeOff : eye} alt="eye" className={"w-6 h-6"} />,
                    onClick: () => setShowPassword(!showPassword)
                }}
            />
            <button className="flex justify-end text-[#39442B]">
                <p>Забыли пароль?</p>
            </button>
            <div className="flex flex-col gap-7 items-center justify-between">
                <AuthButton text="ВОЙТИ" onClick={handleSubmit} />
                <AuthButton text="ЗАРЕГИСТРИРОВАТЬСЯ" onClick={onOpenRegister} color="[#DBEAFE]" />
            </div>
        </form>
    );
}

export default LoginForm;