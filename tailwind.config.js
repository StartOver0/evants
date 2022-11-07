/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./components/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    
    extend: {
      animation: {
        l1: "big .6s ease-in-out alternate infinite",
        l2: "big .6s ease-in-out alternate .2s infinite",
        l3: "big .6s ease-in-out alternate .4s infinite",
      },
      keyframes: {
        big: {
          "100%": { transform: "scale(2)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-hyphens")],
};
