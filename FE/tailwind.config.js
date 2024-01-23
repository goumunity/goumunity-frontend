// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      daeam: ['"DAEAM_LEE_TAE_JOON"', "cursive"],
      her: ['"Her-Gilwonok"', "cursive"],
      paci: ['"Pacifico"', "cursive"],
      dove: ['"Dovemayo_wild"', "cursive"],
    },
    colors: {
      'bg': '#faedcd',
      'entrance': '#B7B7A4',
      'yellow': '#fefae0',
      'button': '#DDBEA9',
      'gray': '#e5e7eb',
      'bright': '#FFFCF5',
    },
  },
  plugins: [],
};
