/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '480px',
      // => @media (min-width: 480px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'sm':'800px',
       // => @media (min-width: 800px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... },
      
    },
  },
  plugins: [],
}
