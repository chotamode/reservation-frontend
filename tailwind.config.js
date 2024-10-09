/** @type {import('tailwindcss').Config} */ module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            rotate: {
                '0': '0deg',
                '90': '90deg',
            },
            borderWidth: {
                '1': '1px',
            },
            borderRadius: {
                'custom-xl': '35px',
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
                montserrat: ['Montserrat' , 'sans-serif'],
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
    plugins: [
        function ({ addUtilities }) {
        addUtilities({
            '.scrollbar-hide': {
                '-ms-overflow-style': 'none', /* IE и Edge */
                'scrollbar-width': 'none', /* Firefox */
            },
            '.scrollbar-hide::-webkit-scrollbar': {
                'display': 'none', /* Chrome, Safari и Opera */
            },
        });
    },
    ],
}