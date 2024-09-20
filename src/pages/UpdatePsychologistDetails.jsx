import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config.js';
import AvatarUploadForm from '../components/AvatarUploadForm';

function UpdatePsychologistDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    tg_username: ''
  });
  const [psychologistDetails, setPsychologistDetails] = useState({
    experience: '',
    specializations: []
  });
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await fetch(`${config.backendUrl}/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const userData = await userResponse.json();
        setUserDetails(userData);

        const psychologistResponse = await fetch(`${config.backendUrl}/psychologists/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const psychologistData = await psychologistResponse.json();
        setPsychologistDetails(psychologistData);

        const specializationsResponse = await fetch(`${config.backendUrl}/psychologists/specializations`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const specializationsData = await specializationsResponse.json();
        setAvailableSpecializations(specializationsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userDetails) {
      setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    } else {
      setPsychologistDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleSpecializationsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setPsychologistDetails((prevDetails) => ({ ...prevDetails, specializations: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendUrl}/user/update-psychologist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          experience: psychologistDetails.experience,
          specializations: psychologistDetails.specializations,
          system_users: userDetails
        })
      });
      if (!response.ok) throw new Error('Failed to update details');
      alert('Details updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">User Details</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Name" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Surname</label>
        <input type="text" name="surname" value={userDetails.surname} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Surname" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Patronymic</label>
        <input type="text" name="patronymic" value={userDetails.patronymic} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Patronymic" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" name="email" value={userDetails.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Email" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input type="text" name="phone" value={userDetails.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Phone" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Telegram Username</label>
        <input type="text" name="tg_username" value={userDetails.tg_username} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Telegram Username" />
      </div>

      <h3 className="text-xl font-semibold mb-4">Psychologist Details</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Experience</label>
        <input type="number" name="experience" value={psychologistDetails.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Experience" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Specializations</label>
        <select multiple name="specializations" value={psychologistDetails.specializations} onChange={handleSpecializationsChange} className="w-full px-3 py-2 border rounded">
          {availableSpecializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <AvatarUploadForm />

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update</button>
    </form>
  );
}

export default UpdatePsychologistDetails;