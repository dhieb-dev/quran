/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["index.html", "./src/**/**.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      animation: {
        "softVision": "opacity 0.5s linear"
      },
    },
  },
  plugins: [],
}

