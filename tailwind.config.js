/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e6efff',
          200: '#c9ddff',
          300: '#9dc2ff',
          400: '#6b9dff',
          500: '#3a78ff',
          600: '#1f5ae6',
          700: '#1a48b8',
          800: '#173b8f',
          900: '#152f6f'
        }
      }
    }
  },
  plugins: []
};
