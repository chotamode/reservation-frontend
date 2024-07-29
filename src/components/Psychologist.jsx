import PropTypes from 'prop-types';

function Psychologist({ psychologist }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-bold">{psychologist.system_user.name} {psychologist.system_user.surname}</h3>
      <p>Patronymic: {psychologist.system_user.patronymic}</p>
      <p>Email: {psychologist.system_user.email}</p>
      <p>Experience: {psychologist.experience} years</p>
    </div>
  );
}

Psychologist.propTypes = {
  psychologist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
};

export default Psychologist;