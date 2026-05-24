module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
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
  plugins: [require('@tailwindcss/typography')],
};
