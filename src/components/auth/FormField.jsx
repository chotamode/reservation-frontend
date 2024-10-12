import PropTypes from 'prop-types';

function FormField({ id, label, type, value, onChange = () => {}, placeholder, rightButton, error }) {
    return (
        <div className="relative">
            <label className="hidden" htmlFor={id}>
                {label}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`border-1 border-[#39442B] appearance-none rounded-[25px] h-14 w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-[#39442B] text-lg px-10 ${error ? 'border-red-500' : ''}`}
                required
            />
            {rightButton && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={rightButton.onClick}
                >
                    {rightButton.icon}
                </button>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default FormField;