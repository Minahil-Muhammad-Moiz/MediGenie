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
        primary: "#09090b",
        secondary: '#22d3ee',
        tertiary: "#171717;",
        light: '#d4d4d4',
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
