/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/js/**/*.ts"],
  theme: {
    extend: {
      screens : {
        phone : {max: '640px'},
      },
      colors : {
        body : "#0D1117",
        gray : "#2D3133",
        "gray-txt" : "#c0c0c0",
        red : "#DD3D2C",
        "red-hover" : "#FF634E",
      },
      textColor : {
      }
    },
  },
  plugins: [],
}

