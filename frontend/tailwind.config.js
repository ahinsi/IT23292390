/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#2C3E50',
          DEFAULT: '#3498DB',
          light: '#5DADE2',
        },
        background: '#ECF0F1',
        danger: '#E74C3C',
        success: '#27AE60',
        dark: '#34495E',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
