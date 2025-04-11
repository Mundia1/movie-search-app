/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        kenya: {
          black: '#1A1A1A', // Adjusted from pure black for better contrast
          red: '#FF0000',
          green: '#008000',
          white: '#F5F5F5', // Adjusted from pure white for softer look
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-in-out',
        'slide-up': 'slide-up 0.6s ease-in-out',
        'gradient': 'gradient 10s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'soft-dark': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};