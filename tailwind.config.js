/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F0FAF9',
          dark: '#121A20',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E2A35',
        },
        primary: {
          light: '#3AA17E',
          dark: '#4DB792',
        },
        achievement: {
          light: '#FFC868',
          dark: '#FFD68A',
        },
        error: {
          light: '#E53E3E',
          dark: '#F56565',
        },
        text: {
          primary: {
            light: '#2D3748',
            dark: '#F7FAFC',
          },
          secondary: {
            light: '#A0AEC0',
            dark: '#CBD5E0',
          },
        },
      },
    },
  },
  plugins: [],
}
