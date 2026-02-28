/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bvg: {
          yellow: '#FFD500',
          dark: '#0F0F0F',
          gray: '#1C1C1C',
          muted: '#2A2A2A',
          border: '#2E2E2E',
          text: '#F0F0F0',
          sub: '#888888',
          green: '#00C896',
          red: '#FF4B4B',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          orange: '#F97316',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
