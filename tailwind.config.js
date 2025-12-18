/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1a2a4e',
        'dark-purple': '#2d1b4e',
        'accent-blue': '#2563eb',
        'accent-purple': '#7c3aed',
        'text-light': '#e5e7eb',
        'text-bright': '#f0f4ff',
        'github-dark-blue': '#2F81F7',
      },
    },
  },
  plugins: [],
}
