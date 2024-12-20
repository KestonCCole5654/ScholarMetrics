/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif'], // Replace 'Roboto' with your font name
      },
    },
  },
  
  plugins: [],
}

