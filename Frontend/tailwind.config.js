/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0F172A',
        },
        nexora: {
          bg: '#EEF5FD',
          card: '#FFFFFF',
          border: 'rgba(255, 255, 255, 0.85)',
          muted: '#64748B',
          dark: '#0B0F19',
          accent: '#2563EB',
          glow: '#38BDF8',
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F3EFFF',
          200: '#E9E2FE',
          300: '#D6C8FD',
          400: '#BBA4FB',
          500: '#9E77F6',
          600: '#8551EE',
          700: '#713AD5',
          800: '#5E2FB3',
          900: '#4E2891',
        },
        tealbrand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.07), 0 4px 10px -2px rgba(15, 23, 42, 0.03)',
        'soft-hover': '0 16px 36px -6px rgba(15, 23, 42, 0.09), 0 6px 14px -3px rgba(15, 23, 42, 0.04)',
        'nexora-card': '0 10px 30px -5px rgba(37, 99, 235, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'nexora-hover': '0 20px 40px -8px rgba(37, 99, 235, 0.12), 0 8px 20px -4px rgba(15, 23, 42, 0.05)',
        'nexora-glow': '0 0 50px -10px rgba(59, 130, 246, 0.3)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
