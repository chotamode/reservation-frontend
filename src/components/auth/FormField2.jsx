function FormField2({ id, label, type, value, onChange, placeholder }) {
    return (
        <div className="relative">
            <label className="" htmlFor={id}>
                {label}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="border-1 border-[#39442B] appearance-none rounded-[25px] h-14 w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-[#39442B] text-lg px-10"
                required
            />
        </div>
    );
}

export default FormField2;