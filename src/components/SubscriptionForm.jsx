import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSubmitSubscription from '../hooks/useSubmitSubscription';

function SubscriptionForm({ psychologistId }) {
  const { user } = useAuth();
  const [ownerId, setOwnerId] = useState(user.id);
  const [totalCount, setTotalCount] = useState(0);
  const { submitSubscription, error } = useSubmitSubscription();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitSubscription({ psychologistId, ownerId, totalCount });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Owner ID</label>
        <input
          type="text"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Owner ID"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Count</label>
        <input
          type="number"
          value={totalCount}
          onChange={(e) => setTotalCount(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Total Count"
          required
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Buy Subscription</button>
    </form>
  );
}

export default SubscriptionForm;