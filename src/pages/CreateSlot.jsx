import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config.js';
import useAuth from "../hooks/useAuth.js";

function CreateSlot() {
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendUrl}/slot/create-slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ psychologistId: user.id, duration, time })
      });
      if (!response.ok) throw new Error('Failed to create slot');
      alert('Slot created successfully');
      navigate('/psychologist-profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Create Slot</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Duration (minutes)</label>
        <input type="number" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Duration" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input type="datetime-local" name="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Time" required />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create Slot</button>
    </form>
  );
}

export default CreateSlot;