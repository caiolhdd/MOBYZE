/** @type {import('tailwindcss').Config} */
export default {
  // Site da Mobyze. O CHIQ CELL tem config próprio (tailwind.chiqcell.config.js) para os temas não se misturarem.
  content: ["./index.html", "./src/**/*.{ts,tsx}", "!./src/chiqcell/**"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        navy: "var(--navy)",
        "navy-2": "var(--navy-2)",
        cream: "var(--cream)",
        "cream-2": "var(--cream-2)",
        steel: "var(--steel)",
        "muted-navy": "var(--muted-on-navy)",
        "muted-cream": "var(--muted-on-cream)",
        line: "var(--line)"
      },
      fontFamily: {
        sans: ['"Montserrat Variable"', "Montserrat", "system-ui", "sans-serif"]
      },
      fontSize: {
        /* escala 1.25 sobre 16px; os dois degraus do topo usam clamp() */
        "display": ["clamp(2.4rem, 5.4vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "title": ["clamp(1.9rem, 3.6vw, 3.05rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "lead": ["1.25rem", { lineHeight: "1.55" }],
        "body": ["1.0625rem", { lineHeight: "1.65" }],
        "meta": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.1em" }]
      },
      maxWidth: { page: "1200px", prose: "65ch" }
    }
  },
  plugins: []
};
