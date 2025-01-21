/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};

export default config;
