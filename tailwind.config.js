/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,json}",
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
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Outfit', 'sans-serif'],
        fredoka: ['Fredoka', 'Outfit', 'sans-serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 9vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(1.75rem, 6vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1.0625rem, 3.4vw, 1.25rem)', { lineHeight: '1.55' }],
        'caption': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.04em' }],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.4s ease-in-out',
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
