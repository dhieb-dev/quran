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
        main: "var(--color-main)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        third: "var(--color-third)",
        fourth: "var(--color-fourth)",
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
          "0%": { opacity: "0" },
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
