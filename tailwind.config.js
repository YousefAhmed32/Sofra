/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8965a',
          light: '#e8b87a',
          dark: '#a8763a',
          hover: '#b8854a',
        },
        espresso: {
          DEFAULT: '#1a1008',
          mid: '#2a1c0e',
          light: '#3a2c1e',
        },
        cream: {
          DEFAULT: '#faf8f5',
          dark: '#f5f0e8',
          mid: '#ede8df',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        arabic: ['"Cairo"', '"Noto Sans Arabic"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeInUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 20px 40px rgba(0,0,0,0.12)',
        gold: '0 8px 24px rgba(200,150,90,0.35)',
      },
    },
  },
  plugins: [],
}
