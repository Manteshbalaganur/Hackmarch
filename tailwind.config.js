/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1E3A8A',
        'medium-blue': '#3B82F6',
        'light-blue': '#BFDBFE',
        'hackathon-orange': '#F97316', // Vibrant color for hackathon vibe
        'success-green': '#10B981', // For success states
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Consistent font usage
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite', // Custom animation
      },
    },
  },
  plugins: [],
};