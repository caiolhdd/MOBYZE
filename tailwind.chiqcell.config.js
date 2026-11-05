/** @type {import('tailwindcss').Config} */
export default {
  // Config exclusivo do CHIQ CELL, usado via @config em src/chiqcell/styles.css.
  content: ["./src/chiqcell/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["Manrope", "sans-serif"] } } },
  plugins: []
};
