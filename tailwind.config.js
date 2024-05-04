/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                red: '#ff0000',
            },
            animation: {
                fadeInOut: 'fadeInOut 3s ease-in-out forwards', // Thiết lập duration là 3 giây và sử dụng ease-in-out easing
            },
            keyframes: {
                fadeInOut: {
                    '0%': { opacity: 0 },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
            },
        },
    },
    plugins: [require('tailwindcss'), require('autoprefixer')],
};
