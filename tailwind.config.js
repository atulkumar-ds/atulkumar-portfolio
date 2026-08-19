/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080A0F',        // page background
        surface: '#0E1119',    // cards and panels
        raised: '#141924',     // hovered / raised panels
        line: '#1D2432',       // hairline borders
        text: '#E8EAF0',       // primary text
        muted: '#8B93A7',      // secondary text
        brass: '#E0B252',      // the single accent colour
        indigo: '#5B6BE1',     // used only inside faint gradients
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
