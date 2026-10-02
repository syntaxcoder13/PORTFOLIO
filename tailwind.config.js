/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Newsreader"', '"Playfair Display"', '"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"Newsreader"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        studio: {
          pink: '#FF4767',
          rose: '#FF6584',
          lightpink: '#FFE5EC',
          softblue: '#4361EE',
          dark: '#111827',
          gray: '#4B5563',
          card: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
};
