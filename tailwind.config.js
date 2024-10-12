/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {"backgroundItem": "url('./static/images/bg-pattern.png')"},
    },
  darkMode: "class",
  },
  plugins: [],
}
