/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "VT323",
        secondary: "Poppins",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: {
          100: "#121212",
          200: "#282828",
          300: "#3f3f3f",
          400: "#575757",
          500: "#717171",
          600: "#8b8b8b",
        },
        primary_dark: {
          100: "#382bf0",
          200: "#5e43f3",
          300: "#7a5af5",
          400: "#9171f8",
          500: "#a688fa",
          600: "#ba9ffb",
        },
        mixed_dark: {
          100: "#302178",
          200: "#493787",
          300: "#604d96",
          400: "#7764a4",
          500: "#8d7db3",
          600: "#a395c2",
        },
      },
    },
  },
  plugins: [],
};
