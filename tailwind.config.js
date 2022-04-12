const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
      },
    },
  },
  plugins: [],
};
