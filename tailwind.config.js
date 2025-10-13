/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   // app directory
    "./src/pages/**/*.{js,ts,jsx,tsx}", // pages directory (if any)
    "./src/components/**/*.{js,ts,jsx,tsx}", // components directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
