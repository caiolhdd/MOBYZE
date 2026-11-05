/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['"Manrope Variable"', "Manrope", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        ink: { DEFAULT: "#030711", raised: "#050b16", panel: "#07111f" }
      },
      borderRadius: { control: "0.5rem", surface: "0.75rem" }
    }
  },
  plugins: []
};
