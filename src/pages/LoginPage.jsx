import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";
import FormField from '../components/FormField.jsx';
import { login } from '../utils/auth.js';
import useAuth from '../hooks/useAuth.js';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, isPsychologist } = useAuth(); // Retrieve user from useAuth

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Логин</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <FormField id="password" label="Пароль" type="password" value={formData.password} onChange={handleChange} />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Войти
          </button>
          <Link
            to="/registration"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;