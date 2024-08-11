import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config.js';

function UpdateUserDetails() {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendUrl}/user/update-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userDetails)
      });
      if (!response.ok) throw new Error('Failed to update user details');
      alert('User details updated successfully');
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update</button>
    </form>
  );
}

export default UpdateUserDetails;