import React from 'react';

// eslint-disable-next-line react/prop-types
function ProfilePage({ user, psychologists }) {
  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            {/* eslint-disable-next-line react/prop-types */}
          <p>Email: {user.email}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Available Psychologists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* eslint-disable-next-line react/prop-types */}
        {psychologists.map((psychologist) => (
          <div key={psychologist.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{psychologist.name}</h3>
            <p>Specialization: {psychologist.specialization}</p>
            <p>Experience: {psychologist.experience} years</p>
            <p>Contact: {psychologist.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;