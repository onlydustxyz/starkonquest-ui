const colors = require("tailwindcss/colors");

const customColor = {
  "space-dark-blue": "#0D0814",
  "space-blue": "#0E0D2E",
  "space-blue-disabled": "#AABCD2",
  "mid-blue": "#0009BC",
  "light-blue": "#00FFE4",
  "off-white": "#E3DAD4",
  "light-purple": "#EBDDFF",
  orange: "#FF9000",
  "space-purple": "#AE00FF",
  black: "#000000",
  nickel: "#666666",
  snow: "#F4F4F4",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: ["animate-flicker2", "animate-flicker3", "animate-flicker4", "animate-dust-color"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        ...customColor,
      },
      animation: {
        flicker2: "flicker 2s linear infinite",
        flicker3: "flicker 3s linear infinite",
        flicker4: "flicker 4s linear infinite",
        "dust-color": "dust-color 4s linear infinite",
      },
      keyframes: {
        flicker: {
          "10%": { opacity: 1 },
          "35%": { opacity: 0.8 },
          "60%": { opacity: 0.7 },
          "75%": { opacity: 0.7 },
          "90%": { opacity: 1 },
        },
        "dust-color": {
          "0%": {
            "background-color": "#00ffe4",
            "box-shadow": "0px 0px 2px 2px #00ffe4, 0px 0px 7px 4px #00ffe4, 0px 0px 20px 5px #00ffe4",
          },
          "33%": {
            "background-color": "#ff9000",
            "box-shadow": "0px 0px 2px 2px #ff9000, 0px 0px 7px 4px #ff9000, 0px 0px 20px 5px #ff9000",
          },
          "67%": {
            "background-color": "#ae00ff",
            "box-shadow": "0px 0px 2px 2px #ae00ff, 0px 0px 7px 4px #ae00ff, 0px 0px 20px 5px #ae00ff",
          },
          "100%": {
            "background-color": "#00ffe4",
            "box-shadow": "0px 0px 2px 2px #00ffe4, 0px 0px 7px 4px #00ffe4, 0px 0px 20px 5px #00ffe4",
          },
        },
      },
    },
    boxShadow: {
      dust: "0px 0px 2px 2px #08f9ff, 0px 0px 7px 4px #08f9ff, 0px 0px 20px 5px #08f9ff",
    },
  },
  plugins: [],
};
