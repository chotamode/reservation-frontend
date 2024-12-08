import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField.jsx';
import { signup } from '../../utils/auth.js';
import AuthButton from "./AuthButton.jsx";

function RegistrationForm({ onClose, onOpenLogin }) {
    const [formData, setFormData] = useState({
        name: '', surname: '', patronymic: '', email: '', tg_username: '', phone: '', password: '', confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validation
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Имя обязательно';
        if (!formData.surname) newErrors.surname = 'Фамилия обязательна';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
        if (!formData.phone || !/^\+?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = 'Неверный формат телефона';
        if (!formData.password) newErrors.password = 'Пароль обязателен';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
        if (formData.name.length < 2) newErrors.name = 'Имя должно содержать не менее 2 символов';
        if (formData.surname.length < 2) newErrors.surname = 'Фамилия должна содержать не менее 2 символов';
        if (formData.patronymic.length < 2) newErrors.patronymic = 'Отчество должно содержать не менее 2 символов';
        if (formData.password.length < 6) newErrors.password = 'Пароль должен содержать не менее 6 символов';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await signup(formData);
            onClose();
            navigate('/');
        } catch (err) {
            setErrors({ form: err.message });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded mx-4 sm:mx-8 md:mx-44 gap-7 flex flex-col">
            {errors.form && <p className="text-red-500 text-center">{errors.form}</p>}
            <div className="flex flex-col sm:flex-row gap-2 justify-between w-full">
                <FormField id="name" label="Имя" type="text" value={formData.name} onChange={handleChange}
                           placeholder={"Ваше имя"} error={errors.name} required />
                <FormField id="surname" label="Фамилия" type="text" value={formData.surname} onChange={handleChange}
                           placeholder={"Фамилия"} error={errors.surname} required />
                <FormField id="patronymic" label="Отчество" type="text" value={formData.patronymic}
                           onChange={handleChange} placeholder={"Отчество"} error={errors.patronymic} />
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-10 gap-y-2 sm:gap-y-7"}>
                <FormField id="birth_date" label="Дата рождения" type="date" value={formData.birth_date}
                           onChange={handleChange} placeholder={"Дата рождения"} required
                />
                <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange}
                           placeholder={"Ваша почта"} error={errors.email} required />
                <FormField id="tg_username" label="Telegram username" type="text" value={formData.tg_username}
                           onChange={handleChange} placeholder={"Ваш никнейм в Telegram"} />
                <FormField id="phone" label="Телефон" type="text" value={formData.phone} onChange={handleChange}
                           placeholder={"Ваш номер телефона"} error={errors.phone} required />
                <FormField id="password" label="Пароль" type="password" value={formData.password}
                           onChange={handleChange} placeholder={"Пароль"} error={errors.password} required />
                <FormField id="confirmPassword" label="Подтвердите пароль" type="password"
                           value={formData.confirmPassword} onChange={handleChange} placeholder={"Подтвердите пароль"} error={errors.confirmPassword} required />
            </div>

            <div className="flex flex-col gap-2 md:gap-7 items-center justify-between">
                <AuthButton text="ЗАРЕГИСТРИРОВАТЬСЯ" onClick={handleSubmit} color="[#DBEAFE]" />
                <AuthButton text="ВОЙТИ" onClick={onOpenLogin} />
            </div>
        </form>
    );
}

export default RegistrationForm;