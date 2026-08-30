import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // User custom 4-color theme palette
        brand: {
          rose: '#F8B2B2',
          mauve: '#AF719D',
          violet: '#8B639B',
          indigo: '#403D88',
          // Extended shades matching the theme
          50: '#fcf7f9',
          100: '#faeef3',
          200: '#F8B2B2',
          300: '#e195b8',
          400: '#AF719D',
          500: '#8B639B',
          600: '#6e4c7d',
          700: '#543862',
          800: '#403D88',
          900: '#2d2b63',
          950: '#1a183b',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #403D88 0%, #8B639B 50%, #AF719D 100%)',
        'brand-gradient-light': 'linear-gradient(135deg, #8B639B 0%, #AF719D 50%, #F8B2B2 100%)',
        'brand-glow': 'radial-gradient(circle, rgba(139, 99, 155, 0.25) 0%, rgba(64, 61, 136, 0.05) 70%, transparent 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    typography,
  ],
};
