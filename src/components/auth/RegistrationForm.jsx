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

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            await signup(formData);
            onClose();
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded mx-44 gap-7 flex flex-col">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-row gap-2 justify-between w-full">
                <FormField id="name" label="Имя" type="text" value={formData.name} onChange={handleChange}
                           placeholder={"Ваше имя"}/>
                <FormField id="surname" label="Фамилия" type="text" value={formData.surname} onChange={handleChange}
                           placeholder={"Фамилия"}/>
                <FormField id="patronymic" label="Отчество" type="text" value={formData.patronymic}
                           onChange={handleChange} placeholder={"Отчество"}/>
            </div>
            <div className={"grid grid-cols-2 gap-x-10 gap-y-7"}>
                <FormField id="birth_date" label="Дата рождения" type="date" value={formData.birth_date}
                           onChange={handleChange} placeholder={"Дата рождения"}/>
                <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange}
                           placeholder={"Ваша почта"}/>
                <FormField id="tg_username" label="Telegram username" type="text" value={formData.tg_username}
                           onChange={handleChange} placeholder={"Ваш никнейм в Telegram"}/>
                <FormField id="phone" label="Телефон" type="text" value={formData.phone} onChange={handleChange}
                           placeholder={"Ваш номер телефона"}/>
                <FormField id="password" label="Пароль" type="password" value={formData.password}
                           onChange={handleChange}
                           placeholder={"Пароль"}/>
                <FormField id="confirmPassword" label="Подтвердите пароль" type="password"
                           value={formData.confirmPassword}
                           onChange={handleChange} placeholder={"Подтвердите пароль"}/>
            </div>

            {/*Check box with big checkcirkle on the left*/}
            <div className="flex flex-row gap-2 items-center justify-center">
                <input type="checkbox" id="terms" name="terms" value="terms" className="checkbox-circle"/>
                <label htmlFor="terms" className="text-[#39442B] text-lg">Я ознакомлен с Политикой конфиденциальности и даю согласие на обработку персональных данных</label>
            </div>

            <div className="flex flex-col gap-7 items-center justify-between">
                <AuthButton text="ЗАРЕГИСТРИРОВАТЬСЯ" onClick={handleSubmit} color="[#DBEAFE]"/>
                <AuthButton text="ВОЙТИ" onClick={onOpenLogin}/>
            </div>
        </form>
    );
}

export default RegistrationForm;