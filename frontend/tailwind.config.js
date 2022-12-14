module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./UI/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: { xs: "450px" },
      colors: {
        main: "#FFFFFF",
        second: "rgb(249 250 251) ",
        "text-main": "rgb(0,0,0)",
        "text-second": "rgb(117 113 113)",
        "text-third": "rgb(156 163 175)",
        button: "#C0C0C0",
      },
      animation: { wiggle: "wiggle 1s ease-in-out infinite" },
    },
  },

  plugins: [],
};
