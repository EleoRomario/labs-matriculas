/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#9c555d',
          100: '#924b53',
          200: '#884149',
          300: '#7e373f',
          400: '#742d35',
          500: '#6a232b',
          600: '#601921',
          700: '#560f17',
          DEFAULT: '#560f17',
          800: '#4c050d',
          900: '#420003'
        },
        unsa: {
          50: '#9c555d',
          100: '#924b53',
          200: '#884149',
          300: '#7e373f',
          400: '#742d35',
          500: '#6a232b',
          600: '#601921',
          700: '#560f17',
          DEFAULT: '#560f17',
          800: '#4c050d',
          900: '#420003'
        }
      }
    }
  },
  plugins: []
})
