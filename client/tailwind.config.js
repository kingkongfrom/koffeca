/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-header": "url('images/bg-header.jpg')",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
}

