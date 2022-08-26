/** @type {import('tailwindcss').Config} */

const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      maxWidth: {
        'mw': '1440px',
      },
      // fontFamily: {
      //   'sans': ['Fira Sans Condensed', ...fontFamily.sans],
      //   'serif': ['Fira Sans Condensed', ...fontFamily.serif],
      // },
      colors: {

        // Primary text colors
        'primary-dark': "#0e1e2e",
        'primary-light': "#313e50",

        // Secondary text colors
        'secondary-dark': "#D9DBF1",
        'secondary-light': "#0e1315",

        //Primary hover colors
        'dark-hover': "#0e131f",
        'light-hover': "#47a8bd25",

        //Primary active colors
        'dark-active': "#0e1e2e",
        'light-active': "#f5f5f5",
        
        // Accent colors
        'accent-light': "#f50057",
        'accent-dark': "#731dd8",

        //Accent hover colors
        'accent-dark-hover': "#0e1e2e",
        'accent-light-hover': "#f5f5f5",

        //Primary background colors
        'primary-dark-bg': "#0f172a",
        'primary-light-bg': "#fff",

        //Secondary background colors
        'secondary-dark-bg': "#0e131f",
        'secondary-light-bg': "#47A8BD",

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
