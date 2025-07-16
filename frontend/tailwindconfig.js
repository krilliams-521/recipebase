// tailwind.config.js
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F59E0B', // amber-500 (primary)
          dark: '#B45309', // amber-700
          light: '#FEF3C7', // amber-100
        },
        accent: {
          DEFAULT: '#F87171', // rose-400
          dark: '#B91C1C', // rose-700
          light: '#FEE2E2', // rose-100 
        },
        surface: '#FFFBF0', // soft warm background (custom)
        foreground: '#3F3F46', // neutral-700
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
