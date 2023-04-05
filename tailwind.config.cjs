/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#4B56D2",
        bodyBackground: "#f3fafc",
        lightestBlue: "#EEFAFF",
      },
    },
  },
  plugins: [],
};
