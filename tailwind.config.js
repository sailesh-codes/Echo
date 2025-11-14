/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#19D4FE',
          50: '#e6fbff',
          100: '#b3f2ff',
          200: '#80e9ff',
          300: '#4de0ff',
          400: '#19D4FE',
          500: '#00b8e6',
          600: '#0090b3',
          700: '#006880',
          800: '#00404d',
          900: '#00181d',
        },
        background: {
          DEFAULT: '#000000',
          lighter: '#0a0a0a',
          light: '#111111',
          dark: '#000000',
        },
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(25, 212, 254, 0.4)',
        'glow-md': '0 0 20px -3px rgba(25, 212, 254, 0.6)',
        'glow-lg': '0 0 25px -3px rgba(25, 212, 254, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
