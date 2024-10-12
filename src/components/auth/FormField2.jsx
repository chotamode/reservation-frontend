import PropTypes from 'prop-types';

function FormField2({ id, label, type, value, onChange, placeholder, isTextarea, error }) {
    return (
        <div className="relative">
            <label className="p-3" htmlFor={id}>
                {label}
            </label>
            {isTextarea ? (
                <textarea
                    id={id}
                    className={`w-full h-48 p-2 border rounded-lg ${error ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-1 border-[#39442B] appearance-none rounded-[25px] h-14 w-full py-2 my-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-[#39442B] text-lg px-10 ${error ? 'border-red-500' : ''}`}
                    required
                />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

FormField2.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    isTextarea: PropTypes.bool,
    error: PropTypes.string,
};

export default FormField2;