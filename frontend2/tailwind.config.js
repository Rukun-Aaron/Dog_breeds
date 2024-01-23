/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    
    extend: {
      fontFamily: {
        'varela': ['Varela Round', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      screens: {
        'mid': '1375px',
        'lap-l': '1440px'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '9/16': '9 / 16',
      },

    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4ade80",

          "secondary": "#38bdf8",

          "accent": "#e11d48",

          "neutral": "#111827",

          "base-100": "#ffffff",

          "info": "#06b6d4",

          "success": "#34d399",

          "warning": "#fbbf24",

          "error": "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('tailwindcss-animated')],
}

