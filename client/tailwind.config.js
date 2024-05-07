/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "background-header": "url('images/bg-header.jpg')",
            },
            fontFamily: {
                sans: ["Marcellus", "sans-serif"],
            },
            height: {
                screen: "100dvh",
            },
            colors: {
                "base-darb-dark-brown": "#514837",
                "base-bone": "#D0CABC",
                "base-feldgrau": "#596564",
                "base-khaki": "#BAAA91",
                "base-dark-olive": "#2B291C",
            },
        },
    },
    plugins: [],
};
