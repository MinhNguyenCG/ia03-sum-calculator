// Tailwind CSS Configuration
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#646cff",
          hover: "#535bf2",
          light: "#e0e2ff",
        },
      },
      borderRadius: {
        mdx: "12px",
      },
      boxShadow: {
        smx: "0 2px 4px rgba(0, 0, 0, 0.05)",
        mdx: "0 4px 12px rgba(0, 0, 0, 0.1)",
        lgx: "0 8px 24px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "var(--font-family)"],
        mono: ["ui-monospace", "SFMono-Regular", "var(--font-mono)"],
      },
    },
  },
  darkMode: ["class", "[data-theme='dark']"],
  plugins: [],
};
