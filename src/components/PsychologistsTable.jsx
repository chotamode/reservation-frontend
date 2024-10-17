import React from 'react';
import PropTypes from 'prop-types';

function PsychologistsTable({ psychologists, toggleActivation }) {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          <th className="py-2 border">ID</th>
          <th className="py-2 border">Name</th>
          <th className="py-2 border">Experience</th>
          <th className="py-2 border">Session Cost</th>
          <th className="py-2 border">Activated</th>
          <th className="py-2 border">Biography</th>
          <th className="py-2 border">Mini Description</th>
          <th className="py-2 border">Specialist Type</th>
          <th className="py-2 border">Therapy Types</th>
          <th className="py-2 border">Client Types</th>
          <th className="py-2 border">Education</th>
          <th className="py-2 border">Work Experience</th>
          <th className="py-2 border">Courses</th>
          <th className="py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(psychologists).map(psych => (
          <tr key={psych.id}>
            <td className="py-2 border">{psych.id}</td>
            <td className="py-2 border">{psych.system_users?.name || ''} {psych.system_users?.surname || ''}</td>
            <td className="py-2 border">{psych.experience || ''}</td>
            <td className="py-2 border">{psych.session_cost || ''}</td>
            <td className="py-2 border">{psych.activated ? 'Yes' : 'No'}</td>
            <td className="py-2 border whitespace-pre-wrap">{psych.biography || ''}</td>
            <td className="py-2 border">{psych.mini_description || ''}</td>
            <td className="py-2 border">{psych.specialist_type || ''}</td>
            <td className="py-2 border">{psych.therapy_type?.join(', ') || ''}</td>
            <td className="py-2 border">{psych.client_types?.join(', ') || ''}</td>
            <td className="py-2 border">
              {psych.education?.map(edu => (
                <div key={edu.id} className="mb-2">
                  <p>University: {edu.university}</p>
                  <p>Degree: {edu.degree}</p>
                  <p>Graduation Date: {edu.graduation_date}</p>
                </div>
              )) || ''}
            </td>
            <td className="py-2 border">
              {psych.work_expirience?.map(exp => (
                <div key={exp.id} className="mb-2">
                  <p>Position: {exp.position}</p>
                  <p>Organization: {exp.organization}</p>
                  <p>Duration: {exp.duration} years</p>
                </div>
              )) || ''}
            </td>
            <td className="py-2 border">
              {psych.cources?.map(course => (
                <div key={course.id} className="mb-2">
                  <p>Position: {course.position}</p>
                  <p>Organization: {course.organization}</p>
                  <p>Duration: {course.duration} years</p>
                </div>
              )) || ''}
            </td>
            <td className="py-2 border">
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

PsychologistsTable.propTypes = {
  psychologists: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    experience: PropTypes.number,
    session_cost: PropTypes.number,
    activated: PropTypes.bool,
    biography: PropTypes.string,
    mini_description: PropTypes.string,
    specialist_type: PropTypes.string,
    therapy_type: PropTypes.arrayOf(PropTypes.string),
    client_types: PropTypes.arrayOf(PropTypes.string),
    system_users: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
    education: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      degree: PropTypes.string,
      university: PropTypes.string,
      graduation_date: PropTypes.string,
    })),
    work_expirience: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.string,
      organization: PropTypes.string,
      duration: PropTypes.number,
    })),
    cources: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.string,
      organization: PropTypes.string,
      duration: PropTypes.number,
    })),
  })).isRequired,
  toggleActivation: PropTypes.func.isRequired,
};

export default PsychologistsTable;