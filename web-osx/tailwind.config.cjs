/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    keyframes: {
      'shake-horizontal': {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-15px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(15px)' },
      },
    },
    animation: {
      'shake-horizontal': 'shake-horizontal 1s cubic-bezier(.36,.07,.19,.97) both',
    },
  },
  plugins: []
};