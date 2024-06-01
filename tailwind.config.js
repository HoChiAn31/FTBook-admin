/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                blue: '#009FE5',
                blue1: '#1178F2',
                blueHover: '#71c5ebb3',
                blue1Hover: '#1178f2b3',
                orange: '#F16754',
                red: '#ff0000',
                green: '#3CB878',
                grayArrow: '#858380',
                grayhover: '#e8e6e5',
                category1: '#93CFFF',
                category2: '#FF9C8C',
                category3: '#FF649A',
                category4: '#D3A77F',
                category5: '#00C9AC',
                category6: '#009FE5',
            },
            animation: {
                fadeInOut: 'fadeInOut 3s ease-in-out forwards',
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
    important: true,
};
