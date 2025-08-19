/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        cartoon: ['"Comic Neue"', 'Quicksand', 'cursive'],
      },
      colors: {
        bubbleBlue: '#581b1bff',
        softPink: '#fddde6',
        mintyGreen: '#b8f2e6',
        sunnyYellow: '#fff8a6',
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
};