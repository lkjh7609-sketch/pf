/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          light: '#F5F1E8',
          DEFAULT: '#E8DCC4',
          dark: '#D4C4A8',
        },
      },
    },
  },
  plugins: [],
}
