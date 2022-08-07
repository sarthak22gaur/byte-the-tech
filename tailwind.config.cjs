/** @type {import('tailwindcss').Config} */

const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        2: "0 1px 3px 0 rgb(11 17 29 / 98%), 0 1px 2px 0 rgb(9 18 35 / 90%)",
      },
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        'primary-dark': "#0e1e2e",
        'primary-light': "#f5f5f5",
        'primary-dark-hover': "#0e1e2e",
        'primary-light-hover': "#f5f5f5",
        'primary-dark-active': "#0e1e2e",
        'primary-light-active': "#f5f5f5",
        'secondary-dark': "#0e1e2e",
        'secondary-light': "#f5f5f5",
        'secondary-dark-hover': "#0e1e2e",
        'secondary-light-hover': "#f5f5f5",
        'secondary-dark-active': "#0e1e2e",
      }

    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      boxShadow: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
