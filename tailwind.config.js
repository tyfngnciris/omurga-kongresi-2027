/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2F8",
          100: "#D6E0EE",
          400: "#3E5C8A",
          600: "#28457A",
          700: "#1F3864",
          800: "#182A4C",
          900: "#101D34",
        },
        teal: {
          50: "#E7F7F6",
          100: "#C7EDEA",
          400: "#45BAB6",
          500: "#2CA6A4",
          600: "#238885",
          700: "#1C6A68",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
