interface SwitchProps {
  checked: boolean
  onChange: () => void
  label: string
}

/**
 * Interruptor accesible (role="switch"). Usa aria-checked (no solo color) y
 * mueve el thumb con una transición corta que respeta prefers-reduced-motion
 * (definido globalmente en index.css). Área táctil >= 44px (WCAG 2.5.5).
 */
export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`touch-target relative inline-flex w-14 shrink-0 items-center rounded-full border border-line p-1 transition-colors ${
        checked ? 'bg-primary' : 'bg-surface-strong'
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-canvas shadow transition-transform duration-150 ${
          checked ? 'translate-x-7' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />
    </button>
  )
}
