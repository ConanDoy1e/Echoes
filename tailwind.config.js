/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif KR"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
