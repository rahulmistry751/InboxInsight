import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        backgroundAccent1: "var(--background-accent-1)",
        backgroundAccent2: "var(--background-accent-2)",
        // border
        neutralLight: "var(--neutral-light)",
        // text
        neutralMedium: "var(--neutral-medium)",
      },
    },
  },
  plugins: [],
};
export default config;
