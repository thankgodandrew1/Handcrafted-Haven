/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
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
    },
    fontFamily: {
      body: ['Roboto', 'Helvetica', 'Arial'],
      heading: ['Montserrat', 'sans-serif', 'serif'],
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

      }
    }
  },
}