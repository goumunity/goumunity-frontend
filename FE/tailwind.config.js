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
    extend: {
    fontFamily: {
      daeam: ['"DAEAM_LEE_TAE_JOON"', "cursive"],
      her: ['"Her-Gilwonok"', "cursive"],
      paci: ['"Pacifico"', "cursive"],
      dove: ['"Dovemayo_wild"', "cursive"],
      main: ['"NanumGothic-Bold"', "cursive"]
    },
    colors: {
      'bg': '#faedcd',
      'entrance': '#B7B7A4',
      'yellow': '#fefae0',
      'button': '#DDBEA9',
      'grey': '#e5e7eb',
      'bright': '#FFFCF5',
      'back': 'rgba(0, 0, 0, 0.7)',
      'dirty': '#A5A58D',
    },
    transitionProperty: {
      'width': 'width',
      'opacity': 'opacity',
      'spacing': 'margin, padding',
      'display': 'display'
    },
    width: {
      '128': '768px',
      'post': '390px',
      'twitter': '600px'
    },
    height: {
      'chat': '620px',
    }
  }
    // spacing: {
    //   '128': '768px',
    // }
  //   extend: {
  //     backgroundColor: {
        
  //     },
  },
  plugins: [],
};