import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        racing: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
