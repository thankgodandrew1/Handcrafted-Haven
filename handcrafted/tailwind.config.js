/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    'tailwind.config.{js,cjs,mjs,ts}'
  ],
  theme: {
    screens: {
      sm: '560px',
      md: '900px',
      xmd: '1100px',
      lg: '1280px',
      xl: '1440px',
    },
    colors: {
      primary: '#4CAF50', // Green
      secondary: '#2196F3', // Blue
      accent: '#FFC107', // Yellow
      background: '#F5F5F5', // Light Gray
      text: '#333333', // Dark Gray
      highlight: '#FF5722', // Orange
      success: '#8BC34A', // Light Green
      error: '#FF5252', // Red
      link: '#00BCD4', // Cyan
      muted: '#9E9E9E', // Medium 
      black: '#000000', // black 
      white: '#ffffff',
      pink: ' #ed64a6',
    },
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '70': '0.7',
      '80': '0.8',
      '100': '1',
    },
    fontFamily: {
      body: ['Roboto', 'Helvetica', 'Arial'],
      heading: ['Montserrat', 'sans-serif', 'serif'],
    },
    boxShadow: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    extend: {
      spacing: {
          px: '1px',
          0: '0',
          0.5: '0.125rem',
          1: '0.25rem',
          1.5: '0.375rem',
          2: '0.5rem',
          2.5: '0.625rem',
          3: '0.75rem',
          3.5: '0.875rem',
          4: '1rem',
          5: '1.25rem',
          6: '1.5rem',
          7: '1.75rem',
          8: '2rem',
          9: '2.25rem',
          10: '2.5rem',
          11: '2.75rem',
          12: '3rem',
      },
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
        '4xl': '2rem',

      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionDelay: {
        '2000': '2000ms',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      zIndex: {
        '100': '100',
      },
    }
  },
}