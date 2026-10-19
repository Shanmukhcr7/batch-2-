import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          royal: "#3B82F6",
          "royal-hover": "#2563EB",
          hyacinth: "#8B5CF6",
          "hyacinth-hover": "#7C3AED",
          blackberry: "#171B3A",
          "blackberry-light": "#212754",
          jet: "#08090D",
          "jet-surface": "#0F111A",
          "jet-card": "#121522",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "var(--font-outfit)",
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-glow": "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "brand-dark-gradient": "linear-gradient(180deg, #171B3A 0%, #08090D 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 8s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(40px)" },
          "100%": { opacity: "0.8", filter: "blur(60px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
