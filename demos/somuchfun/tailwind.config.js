/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slime:  '#A8E847',
        pink:   '#FF2EC1',
        blue:   '#1E90FF',
        yellow: '#FFD700',
      },
      fontFamily: {
        display: ['"Bowlby One SC"', 'sans-serif'],
        body:    ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
