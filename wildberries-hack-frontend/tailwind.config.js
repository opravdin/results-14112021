module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        "outer": "0 2px 5px 1px rgb(64 60 67 / 16%)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
