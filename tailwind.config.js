/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Includes all files in src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        highlight: "#CEFF00",
        lime: "#EDFF00" // custom color
      },
    },
  },
  plugins: [],
}
