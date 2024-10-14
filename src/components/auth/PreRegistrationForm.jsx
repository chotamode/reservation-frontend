import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Определяем схему валидации с помощью Zod
const initialFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

const InitialForm = ({ onNext }) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" {...register('name')} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" {...register('email')} />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button type="submit">Next</button>
        </form>
    );
};

export default InitialForm;