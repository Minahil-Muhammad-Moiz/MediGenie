/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black1: "#09090b",
        blue1: '#22d3ee',
        grey1: "#171717;",
        lightText: '#d4d4d4',
      },
      fontFamily: {
        poppins: ['Poppins-Medium'],
        poppinsBold: ['Poppins-Bold'],
        poppinsRegular: ['Poppins-Regular'],
        poppinsSemiBold: ['Poppins-SemiBold'],
      },
    },
  },
  plugins: [],
}
