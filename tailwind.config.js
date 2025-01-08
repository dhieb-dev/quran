/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
      animation: {
        scale: "scale 0.7s",
        opacity: "opacity 1s",
      },
      keyframes: {
        scale: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        opacity: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-dark-mode")(),
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "custom-properties": true,
      },
    }),
  ],
};
