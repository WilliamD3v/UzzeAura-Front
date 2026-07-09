import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07111f',
        foreground: '#f8fafc',
        brand: {
          DEFAULT: '#14b8a6',
          dark: '#0f766e',
          light: '#99f6e4',
        },
      },
      boxShadow: {
        glow: '0 20px 70px rgba(20, 184, 166, 0.15)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(20,184,166,0.15), transparent 35%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'hero-grid': 'auto, 38px 38px, 38px 38px',
      },
    },
  },
  plugins: [],
}

export default config
