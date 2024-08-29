/** @type {import('tailwindcss').Config} */ module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            borderWidth: {
                '1': '1px',
            },
            colors: {
                greenLight: '#D3DBA8',
                greenDark: '#39442B',
            },
            backgroundImage: {
                'custom-bg': "url('/src/assets/images/background.png')",
            },
            fontFamily: {
                sans: ['Raleway', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                kodchasan: ['Kodchasan', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            height: {
                '26rem': '25.7rem',
                'custom-440': '27.5rem',
                'custom-783': '48.9rem',
            },
            maxHeight: {
                '26rem': '25.7rem',
            },
        },
    },
    plugins: [],
}