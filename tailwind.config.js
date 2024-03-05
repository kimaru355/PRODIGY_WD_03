/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dark": "#0f0428",
        "blue-light": "#301960",
        "cyan-1": "#86ddcd",
        "pink-1": "#dc9ede",
        "green-dark": "#405071",
        "green-light": "#30295c",
        "green-thick": "#72b6b2",
        "pink-light": "#4b306c",
        "pink-dark": "#6a4c85",
        "pink-thick": "#dc9ede",
      },
    },
  },
  plugins: [],
};
