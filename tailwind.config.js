/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Peacock blues
        peacock: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        // Saffron
        saffron: {
          50: '#fff7e6',
          100: '#ffe7ba',
          200: '#ffd591',
          300: '#ffc069',
          400: '#ffa940',
          500: '#fa8c16',
          600: '#d46b08',
          700: '#ad4e00',
          800: '#873800',
          900: '#612500',
        },
        // Lotus pink
        lotus: {
          50: '#fff0f6',
          100: '#ffd6e7',
          200: '#ffadd2',
          300: '#ff85c0',
          400: '#f759ab',
          500: '#eb2f96',
          600: '#c41d7f',
          700: '#9e1068',
          800: '#780650',
          900: '#520339',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(24, 144, 255, 0.3)',
        'glow-saffron': '0 0 20px rgba(250, 140, 22, 0.3)',
        'glow-lotus': '0 0 20px rgba(235, 47, 150, 0.3)',
      },
    },
  },
  plugins: [],
}
