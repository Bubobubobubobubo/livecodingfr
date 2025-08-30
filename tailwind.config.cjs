const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts,svelte.md}"],

  theme: {
    extend: {
      colors: {
        'theme': {
          'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
          'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          'bg-tertiary': 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
          'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
          'accent-primary': 'rgb(var(--color-accent-primary) / <alpha-value>)',
          'accent-secondary': 'rgb(var(--color-accent-secondary) / <alpha-value>)',
          'accent-tertiary': 'rgb(var(--color-accent-tertiary) / <alpha-value>)',
          'border-primary': 'rgb(var(--color-border-primary) / <alpha-value>)',
          'border-secondary': 'rgb(var(--color-border-secondary) / <alpha-value>)',
        }
      }
    },
  },

  plugins: [typography, daisyui],

  daisyui: {
    themes: false, // Disable DaisyUI themes to avoid conflicts
  },
};

module.exports = config;
