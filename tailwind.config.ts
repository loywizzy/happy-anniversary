import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        bob: "bob 4s ease-in-out infinite alternate"
      },
      backgroundImage: {
        "soft-rose":
          "radial-gradient(120% 120% at 50% 0%, rgba(255, 240, 245, 0.9) 0%, rgba(255, 250, 250, 0.95) 35%, #ffe4ec 100%)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        glow: {
          "0%, 100%": {
            opacity: "0.85",
            filter: "drop-shadow(0 0 12px rgba(244, 114, 182, 0.45))"
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 18px rgba(244, 114, 182, 0.65))"
          }
        },
        bob: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(4px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
