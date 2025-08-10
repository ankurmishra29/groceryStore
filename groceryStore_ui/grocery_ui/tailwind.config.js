/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html', './node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
      },
      backgroundColor: {
        body: '#ced4da',
        secondary: {
          100: '#d5d6db',
          200: '#acadb6',
          300: '#828592',
          400: '#595c6d',
          500: '#2f3349',
          600: '#25293c',
          700: '#1c1f2c',
          800: '#13141d',
          900: '#090a0f',
        },
        primary: {
          100: '#e3e1fc',
          200: '#c7c2f9',
          300: '#aba4f6',
          400: '#8f85f3',
          500: '#7367f0',
          600: '#5c52c0',
          700: '#453e90',
          800: '#2e2960',
          900: '#171530',
        },
      },
      colors: {
        container: 'rgba(225, 222, 245, 0.9)',
        bgColor: '#2F3349',
        textColor:'#7367f0'
      },
      borderColor:{
        color:'#7367f0'
      },
      animation: {
        spin: 'spin 2s linear infinite'
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
    },
  },
},
  plugins: [

    function ({ addBase, theme }) {
      addBase({
        body: { backgroundColor: theme('backgroundColor.body') },
      });
    },
  ],
};
