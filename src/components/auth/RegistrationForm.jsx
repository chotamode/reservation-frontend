import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField.jsx';
import { signup } from '../../utils/auth.js';
import AuthButton from "./AuthButton.jsx";

function RegistrationForm({ onClose, onOpenLogin }) {
    const [formData, setFormData] = useState({
        name: '', surname: '', patronymic: '', email: '', tg_username: '', phone: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name) {
            setError('Имя обязательно');
            return;
        }
        if (!formData.surname) {
            setError('Фамилия обязательна');
            return;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Неверный формат email');
            return;
        }
        if (!formData.phone || !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
            setError('Неверный формат телефона');
            return;
        }
        if (!formData.password) {
            setError('Пароль обязателен');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        if(formData.name.length < 2) {
            setError('Имя должно содержать не менее 2 символов');
            return;
        }
        if(formData.surname.length < 2) {
            setError('Фамилия должна содержать не менее 2 символов');
            return;
        }
        if(formData.patronymic.length < 2) {
            setError('Отчество должно содержать не менее 2 символов');
            return;
        }
        if(formData.password.length < 6) {
            setError('Пароль должен содержать не менее 6 символов');
            return;
        }

        try {
            await signup(formData);
            onClose();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded mx-4 sm:mx-8 md:mx-44 gap-7 flex flex-col">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-2 justify-between w-full">
                <FormField id="name" label="Имя" type="text" value={formData.name} onChange={handleChange}
                           placeholder={"Ваше имя"} required />
                <FormField id="surname" label="Фамилия" type="text" value={formData.surname} onChange={handleChange}
                           placeholder={"Фамилия"} required />
                <FormField id="patronymic" label="Отчество" type="text" value={formData.patronymic}
                           onChange={handleChange} placeholder={"Отчество"} />
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-10 gap-y-2 sm:gap-y-7"}>
                <FormField id="birth_date" label="Дата рождения" type="date" value={formData.birth_date}
                           onChange={handleChange} placeholder={"Дата рождения"} required />
                <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange}
                           placeholder={"Ваша почта"} required />
                <FormField id="tg_username" label="Telegram username" type="text" value={formData.tg_username}
                           onChange={handleChange} placeholder={"Ваш никнейм в Telegram"} />
                <FormField id="phone" label="Телефон" type="text" value={formData.phone} onChange={handleChange}
                           placeholder={"Ваш номер телефона"} required />
                <FormField id="password" label="Пароль" type="password" value={formData.password}
                           onChange={handleChange} placeholder={"Пароль"} required />
                <FormField id="confirmPassword" label="Подтвердите пароль" type="password"
                           value={formData.confirmPassword} onChange={handleChange} placeholder={"Подтвердите пароль"} required />
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
                <input type="checkbox" id="terms" name="terms" value="terms" className="checkbox-circle" required />
                <label htmlFor="terms" className="text-[#39442B] text-lg">Я ознакомлен с Политикой конфиденциальности и даю согласие на обработку персональных данных</label>
            </div>

            <div className="flex flex-col gap-2 md:gap-7 items-center justify-between">
                <AuthButton text="ЗАРЕГИСТРИРОВАТЬСЯ" onClick={handleSubmit} color="[#DBEAFE]" />
                <AuthButton text="ВОЙТИ" onClick={onOpenLogin} />
            </div>
        </form>
    );
}

export default RegistrationForm;