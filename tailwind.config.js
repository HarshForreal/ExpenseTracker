/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRedDark: '#771D32',
        customRedLight: '#E65758',
      },
    },
  },
  plugins: [],
};
