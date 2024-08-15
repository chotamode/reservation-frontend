import React from 'react';

function PsychologistsTable({ psychologists, toggleActivation }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">ID</th>
          <th className="py-2">Name</th>
          <th className="py-2">Email</th>
          <th className="py-2">Activated</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {psychologists.map(psych => (
          <tr key={psych.id}>
            <td className="py-2">{psych.id}</td>
            <td className="py-2">{psych.system_users.name}</td>
            <td className="py-2">{psych.system_users.email}</td>
            <td className="py-2">{psych.activated ? 'Yes' : 'No'}</td>
            <td className="py-2">
              <button
                onClick={() => toggleActivation(psych.id, psych.activated)}
                className={`py-2 px-4 rounded ${psych.activated ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {psych.activated ? 'Deactivate' : 'Activate'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PsychologistsTable;