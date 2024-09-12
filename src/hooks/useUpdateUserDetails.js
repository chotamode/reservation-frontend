// src/hooks/useUpdateUserDetails.js
import { useState } from 'react';
import config from '../config.js';

const useUpdateUserDetails = (id) => {
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

  const updateUserDetails = async (updatedDetails) => {
    try {
      const response = await fetch(`${config.backendUrl}/user/update-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedDetails)
      });
      if (!response.ok) throw new Error('Failed to update user details');
      alert('User details updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return { userDetails, setUserDetails, loading, error, fetchUserDetails, updateUserDetails };
};

export default useUpdateUserDetails;