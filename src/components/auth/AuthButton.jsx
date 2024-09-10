function AuthButton({ text, color, onClick, className }) {
    return (
        <button
            className={`tracking-widest font-bold font-inter bg-${color} text-black border-1 border-[#39442B] py-3 rounded-full w-full ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

AuthButton.defaultProps = {
    text: 'Click Me',
    color: '[#D3DBA8]',
    onClick: () => alert('Button clicked!')
};

export default AuthButton;