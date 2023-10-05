/** @type {import('tailwindcss').Config} */

const { colors } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.blue,
          900: "#13131A",
          800: "#16161F",
          700: "#1C1C27",
          600: "#22222F",
          500: "#3B3B54",
          400: "#7F7F98",
          300: "#ABABC4",
          200: "#BFBFDA",
          100: "#FAFAFA",
        },
        "blue-light": "#8FB2F5",
      },
    },
  },
  plugins: [],
};
