import PropTypes from 'prop-types';

function Psychologist({ psychologist }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-bold">{psychologist.system_users.name} {psychologist.system_users.surname}</h3>
      <p>Patronymic: {psychologist.system_users.patronymic}</p>
      <p>Email: {psychologist.system_users.email}</p>
      <p>Experience: {psychologist.experience} years</p>
    </div>
  );
}

Psychologist.propTypes = {
  psychologist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    contact: PropTypes.string.isRequired,
    system_users: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      patronymic: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

Psychologist.defaultProps = {
  psychologist: {
    system_users: {
      name: '',
      surname: '',
      patronymic: '',
      email: '',
    },
  },
};

export default Psychologist;