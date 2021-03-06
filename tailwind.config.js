const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: '#ec004c',
      },
      opacity: {
        hover: '0.6',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '" "',
            },
            'code::after': {
              content: '" "',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
