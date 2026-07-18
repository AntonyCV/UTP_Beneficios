import type { ComponentType } from 'react'

interface FilterChipProps {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  label: string
  onClick: () => void
  /** Indica que hay filtros activos — cambia el estilo visual. */
  active?: boolean
}

/**
 * Chip de filtro. Cuando active=true muestra fondo de marca para indicar
 * que hay selección aplicada — nunca solo color, siempre con texto (WCAG 1.4.1).
 */
export function FilterChip({ icon: Icon, label, onClick, active }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`touch-target inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-fg'
          : 'border-line bg-surface text-fg'
      }`}
    >
      <span>{label}</span>
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  )
}
