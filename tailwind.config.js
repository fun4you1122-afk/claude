/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E4C76B',
        'gold-dark': '#A8892D',
        charcoal: '#1a1a1a',
        'charcoal-light': '#2a2a2a',
        'charcoal-medium': '#333333',
        sand: '#F5F0E8',
        'sand-dark': '#E8DFC8',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        arabic: ['Noto Kufi Arabic', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E4C76B 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
      },
    },
  },
  plugins: [],
}
