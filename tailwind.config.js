/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary is now a warm, light orange palette used across the app
        primary: {
          50: '#fff6ec',
          100: '#ffedd6',
          200: '#ffd9ad',
          300: '#ffc77f',
          400: '#ffb655',
          500: '#ff9f29',
          600: '#d67d00',
          700: '#a85f00',
          800: '#754100',
          900: '#3f2300',
        },
        accent: {
          50: '#fff4e6',
          100: '#ffe4bf',
          200: '#ffcf8f',
          300: '#ffb85c',
          400: '#ff9f29',
          500: '#f18302',
          600: '#c66600',
          700: '#9d5100',
          800: '#733b00',
          900: '#4a2600',
        },
      },
      boxShadow: {
        soft: '0 14px 38px rgba(128, 63, 0, 0.08)',
        glow: '0 0 0 12px rgba(255, 159, 41, 0.08)',
      },
    },
  },
  plugins: [],
}

