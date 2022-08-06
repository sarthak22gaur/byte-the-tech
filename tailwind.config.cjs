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
