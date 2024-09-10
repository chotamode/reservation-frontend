import PropTypes from 'prop-types';

function BigButton({ text, icon, onClick }) {
  return (
    <button className="rounded-3xl bg-greenLight border-1 border-greenDark w-full h-full flex items-center justify-center" onClick={onClick}>
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