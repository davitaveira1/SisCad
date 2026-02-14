/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // === Paleta Verde ===
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },

        // === Cores Semânticas ===
        primary: {
          light: '#4ade80',   // green-400
          DEFAULT: '#22c55e',   // green-500
          dark: '#16a34a',   // green-600
        },
        secondary: {
          light: '#f8fafc',   // slate-50
          DEFAULT: '#f1f5f9',   // slate-100
          dark: '#e2e8f0',   // slate-200
        },
        accent: {
          light: '#86efac',   // green-300
          DEFAULT: '#4ade80',   // green-400
          dark: '#22c55e',   // green-500
        },

        // Backgrounds (tema claro/branco)
        background: {
          DEFAULT: '#ffffff',
          card: '#f8fafc',
          subtle: '#f1f5f9',
          hover: '#e2e8f0',
        },

        // Superfícies
        surface: {
          DEFAULT: '#ffffff',
          light: '#f8fafc',
          border: '#e2e8f0',
        },

        // Texto
        content: {
          DEFAULT: '#0f172a',   // slate-900
          secondary: '#475569',   // slate-600
          muted: '#94a3b8',   // slate-400
          inverse: '#ffffff',   // branco
        },

        // Estados
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
}
