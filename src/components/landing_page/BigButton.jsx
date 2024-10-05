import PropTypes from 'prop-types';

function BigButton({ text, icon, onClick }) {
  return (
    <button className="rounded-custom-xl bg-greenLight border-greenDark border-solid border-1 drop-shadow-lg w-[75rem] h-44 flex items-center justify-center" onClick={onClick}>
      <p className="font-bold">
          {text}
      </p>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default BigButton;