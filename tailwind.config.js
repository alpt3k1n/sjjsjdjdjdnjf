/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#667eea',
          end: '#764ba2',
        },
        secondary: {
          start: '#f093fb',
          end: '#f5576c',
        },
        accent: {
          start: '#4facfe',
          end: '#00f2fe',
        },
        dark: {
          bg1: '#1a1a2e',
          bg2: '#16213e',
          bg3: '#0f3460',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
