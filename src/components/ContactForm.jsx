import React, { useState } from 'react';

function ContactForm({ onSubmit, loading, error }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        contactMethod: 'phone'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label>
                Имя:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="border rounded p-2 w-full" required />
            </label>
            <label>
                Емейл:
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded p-2 w-full" required />
            </label>
            <label>
                Телефон:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border rounded p-2 w-full" required />
            </label>
            <fieldset className="flex flex-col gap-2">
                <legend>Предпочтительный способ связи:</legend>
                <label>
                    <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={handleChange} />
                    Звонок
                </label>
                <label>
                    <input type="radio" name="contactMethod" value="email" checked={formData.contactMethod === 'email'} onChange={handleChange} />
                    Email
                </label>
                <label>
                    <input type="radio" name="contactMethod" value="whatsapp" checked={formData.contactMethod === 'whatsapp'} onChange={handleChange} />
                    WhatsApp
                </label>
            </fieldset>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="rounded-2xl bg-[#D3DBA8] w-full h-10 text-sm font-semibold mt-4" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить'}
            </button>
        </form>
    );
}

export default ContactForm;