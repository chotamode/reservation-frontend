import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import config from '../config.js';

function RegisterPsychologistPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    password: '',
    tg_username: '',
    phone: '',
    experience: '',
    specializations: []
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

  const handleSpecializationsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      specializations: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${config.backendUrl}/user/signup-psychologist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to register psychologist');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register as Psychologist</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <FormField id="name" label="Name" type="text" value={formData.name} onChange={handleChange} />
        <FormField id="surname" label="Surname" type="text" value={formData.surname} onChange={handleChange} />
        <FormField id="patronymic" label="Patronymic" type="text" value={formData.patronymic} onChange={handleChange} />
        <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <FormField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
        <FormField id="tg_username" label="Telegram Username" type="text" value={formData.tg_username} onChange={handleChange} />
        <FormField id="phone" label="Phone" type="text" value={formData.phone} onChange={handleChange} />
        <FormField id="experience" label="Experience" type="number" value={formData.experience} onChange={handleChange} />
        <div className="mb-4">
          <label className="block text-gray-700">Specializations</label>
          <select multiple id="specializations" value={formData.specializations} onChange={handleSpecializationsChange} className="w-full px-3 py-2 border rounded">
            <option value="Depression">Depression</option>
            <option value="Burnout">Burnout</option>
          {/*    TODO: add more*/}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPsychologistPage;