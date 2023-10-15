/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    extend: {
      darkBackground : '#1b1717'
    },
    fontFamily : {
      'assistant' : ['Assistant', 'sans-serif']
    }
  },
  plugins: [],
}