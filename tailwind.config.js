/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {"backgroundItem": "url('./static/images/bg-pattern.png')"},
    },
  },
  plugins: [],
}