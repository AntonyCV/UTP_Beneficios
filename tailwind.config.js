/** @type {import('tailwindcss').Config} */
export default {
  // WCAG 1.4.3 / modo oscuro: theme por clase .dark en <html>, controlado por AppContext.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Todos los colores se resuelven vía variables CSS (ver index.css) para que el
      // cambio de tema claro/oscuro sea real (no una inversión) y con contraste verificado.
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        line: 'var(--color-line)',
        fg: 'var(--color-fg)',
        'fg-muted': 'var(--color-fg-muted)',
        brand: 'var(--color-brand)',
        'brand-strong': 'var(--color-brand-strong)',
        primary: 'var(--color-primary)',
        'primary-fg': 'var(--color-primary-fg)',
        accent: 'var(--color-accent)',
        focus: 'var(--color-focus)',
        // Estados con paleta segura para daltonismo (Wong/IBM). Siempre acompañados
        // de ícono + texto en la UI (WCAG 1.4.1), nunca solo color.
        success: 'var(--color-success)',
        'success-fg': 'var(--color-success-fg)',
        danger: 'var(--color-danger)',
        'danger-fg': 'var(--color-danger-fg)',
        info: 'var(--color-info)',
        'info-fg': 'var(--color-info-fg)',
      },
      minHeight: {
        touch: '44px', // WCAG 2.5.5: objetivo táctil mínimo
      },
      minWidth: {
        touch: '44px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'toast-in': 'toast-in 0.25s ease-out both',
        'scale-bounce': 'scale-bounce 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both',
      },
      keyframes: {
        'scale-bounce': {
          '0%':   { opacity: '0', transform: 'scale(0)' },
          '70%':  { opacity: '1', transform: 'scale(1.12)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
