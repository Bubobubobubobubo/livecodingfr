const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts,svelte.md}"],

  theme: {
    extend: {},
  },

  plugins: [typography, daisyui],
};

module.exports = config;
