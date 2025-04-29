/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Segoe UI"', 'Roboto', 'sans-serif'], // match default UI
        },
      },
    },
    plugins: [],
  }
  