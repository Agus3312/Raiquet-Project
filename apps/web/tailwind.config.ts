import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: "#CFF0EA",
        teal: {
          medium: "#88C9C4",
          primary: "#3E9B94",
          dark: "#20666B",
          deep: "#0C3B45",
        },
        amber: "#F5A623",
      },
    },
  },
  plugins: [],
};

export default config;
