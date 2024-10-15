import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


// Определяем схему валидации с помощью Zod
const initialFormSchema = z.object({
    name: z.string().min(1, 'Имя обязательно'),
    surname: z.string().min(1, 'Фамилия обязательна'),
    patronymic: z.string().min(1, 'Отчество!!!'),
    email: z.string().email('Некорректный email'),
    phone: z.string().min(1, 'Телефон обязателен'),

});

const PreRegistrationForm = ({ onNext }) => {
    // Используем react-hook-form для управления формой
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(initialFormSchema),
    });

    // Функция отправки формы
    const onSubmit = (data) => {
        // Передаем данные в основную форму через prop `onNext`
        onNext(data);
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-row justify-around">
                <div className="border-1 rounded-xl">
                    <input id="name" {...register('name')} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="surname">Surname:</label>
                    <input id="surname" {...register('surname')} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="patronymic">Patronymic:</label>
                    <input id="patronymic" {...register('patronymic')} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

            </div>


            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" {...register('email')} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>



            <div>
                <label htmlFor="phone">Phone:</label>
                <input id="phone" {...register('phone')} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <button type="submit">Next</button>
        </form>
    );
};

export default PreRegistrationForm;