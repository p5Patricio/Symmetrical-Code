/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#195fc1',
          dark: '#020408',
          light: '#F5F7FB',
          surface: '#070d14',
          border: 'rgba(25, 95, 193, 0.15)',
        },
        // Token-backed colors for new/rebuilt code — see design-spec.md.
        // Values follow CSS custom properties defined in src/index.css so they
        // respond to the dark/light theme automatically.
        ink: 'var(--bg)',
        surface: 'var(--surface)',
        raised: 'var(--raised)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        subtle: 'var(--subtle)',
        'on-brand': 'var(--on-brand)',
        accent: {
          blue: 'var(--brand-blue)',
          'blue-hover': 'var(--brand-blue-hover)',
          cyan: 'var(--brand-cyan)',
          deep: 'var(--brand-deep)',
        },
      },
      fontFamily: {
        syne: ['Syne Variable', 'Syne', 'Geist Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Syne Variable', 'Syne', 'Geist Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Geist Variable', 'Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['Geist Mono Variable', 'Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shine': 'shine 4s linear infinite',
      }
    },
  },
  plugins: [],
}