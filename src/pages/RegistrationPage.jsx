import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from "../components/FormField.jsx";
import { signup } from '../utils/api.js';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <FormField id="name" label="Имя" type="text" value={formData.name} onChange={handleChange} />
        <FormField id="surname" label="Фамилия" type="text" value={formData.surname} onChange={handleChange} />
        <FormField id="patronymic" label="Отчество" type="text" value={formData.patronymic} onChange={handleChange} />
        <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <FormField id="password" label="Пароль" type="password" value={formData.password} onChange={handleChange} />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;