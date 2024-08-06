import { useParams } from 'react-router-dom';
import useFetchPsychologist from '../hooks/useFetchPsychologist';
import useFetchSlots from '../hooks/useFetchSlots';

function PsychologistProfilePage() {
  const { id } = useParams();
  const { psychologist, error: psychologistError } = useFetchPsychologist(id);
  const { slots, error: slotsError } = useFetchSlots(id);

  if (psychologistError || slotsError) return <div>Error: {psychologistError || slotsError}</div>;
  if (!psychologist) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {psychologist.system_users.name} {psychologist.system_users.surname} {psychologist.system_users.patronymic}
      </h2>
      <p className="text-md text-gray-600">Specialization: {psychologist.specialization}</p>
      <p className="text-md text-gray-600">Experience: {psychologist.experience} years</p>
      <p className="text-md text-gray-600 mb-4">Contact: {psychologist.contact}</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Available Slots</h3>
      <div className="grid grid-cols-2 gap-4">
        {slots.map(slot => (
          <div key={slot.id} className="bg-gray-100 p-4 rounded shadow-md">
            <p>Time: {new Date(slot.time).toLocaleString()}</p>
            <p>Duration: {slot.duration} minutes</p>
            <p>Reserved By: {slot.reserved_by ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PsychologistProfilePage;