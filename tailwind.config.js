/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Refined Midnight & Cyan Design System
        midnight: '#080D17',         // Primary dark canvas
        surface: '#0D1422',          // Secondary canvas / panel base
        elevated: '#111B2B',         // Elevated card surface
        border: '#1E293B',           // Subtle blue-gray border
        'border-subtle': '#162235',  // Very low-contrast border
        'border-active': 'rgba(34, 211, 238, 0.4)', // Cyan border on hover/focus

        text: '#F1F5F9',             // Primary high-contrast text
        secondary: '#9CA9BC',        // Secondary readable text
        muted: '#68778D',            // Muted labels & captions

        // Accents
        cyan: {
          DEFAULT: '#22D3EE',        // Primary active accent
          hover: '#06B6D4',
          subtle: 'rgba(34, 211, 238, 0.08)',
          glow: 'rgba(34, 211, 238, 0.2)',
        },
        blue: {
          DEFAULT: '#60A5FA',        // Secondary accent for diagrams/highlights
          hover: '#3B82F6',
          subtle: 'rgba(96, 165, 250, 0.08)',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
}
