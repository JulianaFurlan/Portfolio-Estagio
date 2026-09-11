/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rosa: {
          50: '#fff0f6',
          100: '#ffe4ef',
          200: '#fccde0',
          300: '#f7b9d2',
          400: '#efa7c4',
          500: '#e592b4',
          600: '#d97fa5',
          700: '#ba376f',
          800: '#8d2a54',
          900: '#671e3d',
          950: '#431428',
          DEFAULT: '#efa7c4',
          light: '#ffe4ef',
          dark: '#d97fa5',
        },
        creme: {
          DEFAULT: '#fff9f7',
          soft: '#fffdfc',
        },
        tinta: {
          50: '#faf7f8',
          100: '#f3eef0',
          200: '#e6dde1',
          300: '#d1c1c8',
          400: '#a68d95',
          500: '#7d6670',
          600: '#5f4b54',
          700: '#4a3941',
          800: '#362731',
          900: '#241820',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Quicksand"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-rosa': 'linear-gradient(135deg, #ffe4ef 0%, #efa7c4 55%, #d97fa5 100%)',
        'gradient-rosa-soft': 'linear-gradient(135deg, #fff9f7 0%, #ffe4ef 100%)',
        'gradient-rosa-radial': 'radial-gradient(circle at 30% 20%, #ffe4ef 0%, #fff9f7 60%)',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(217, 127, 165, 0.18)',
        elevated: '0 20px 45px -12px rgba(150, 60, 100, 0.28)',
        glow: '0 0 0 1px rgba(239, 167, 196, 0.35), 0 8px 30px -6px rgba(239, 167, 196, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      transitionTimingFunction: {
        kawaii: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee 28s linear infinite reverse',
      },
    },
  },
  plugins: [],
};
