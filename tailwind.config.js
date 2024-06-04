

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html" , "./src/**/*.{html,js,jsx,ts,tsx}",
  'node_modules/daisyui/dist/**/*.js',
  'node_modules/react-daisyui/dist/**/*.js',

],

  theme: {
 screens: {
   
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    
    
    extend: {
       screens:{
        'xs':{'min':'320px', 'max':'640px'}
      }
    },
  },
  plugins: [require("daisyui")],
}

