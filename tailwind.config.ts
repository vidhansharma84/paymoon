import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { DEFAULT: '#f4f4ff', dim: '#aab0d6' },
        moon: {
          50:  '#fff7d6',
          100: '#ffeaa3',
          300: '#ffd86b',
          400: '#ffb238',
          500: '#ff8a3d',
          700: '#c45cff',
          900: '#0d1230',
          950: '#07091a',
        },
      },
      backgroundImage: {
        'grad-moon': 'linear-gradient(135deg, #ffd86b 0%, #ff8a3d 50%, #c45cff 100%)',
      },
      boxShadow: {
        glow: '0 10px 30px -10px rgba(255,138,61,.6), inset 0 1px 0 rgba(255,255,255,.4)',
        card: '0 30px 80px -20px rgba(0,0,0,.6)',
      },
      animation: {
        'pulse-soft': 'pulseSoft 1.6s ease infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'orbit': 'orbit 30s linear infinite',
      },
      keyframes: {
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        twinkle:   { '0%,100%': { opacity: '.25', transform: 'scale(.9)' }, '50%': { opacity: '1', transform: 'scale(1.4)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(30px)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        orbit:     { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
};
export default config;
