import { Loader2 } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'ghost-on-brand'
  loading?: boolean
  loadingLabel?: string
  children: ReactNode
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  // CTA principal: rojo en claro / amarillo en oscuro (tokens que flipan por tema).
  primary:
    'bg-primary text-primary-fg font-bold shadow-sm hover:brightness-95 active:scale-[.98]',
  ghost:
    'bg-transparent text-fg border border-line hover:bg-surface font-medium',
  'ghost-on-brand':
    'bg-transparent text-white border border-white/80 hover:bg-white/10 font-semibold',
}

/**
 * Botón base. Garantiza:
 *  - Área táctil >= 44px (WCAG 2.5.5) vía .touch-target.
 *  - Foco visible global (WCAG 2.4.7).
 *  - Estado de carga con spinner + texto (no solo animación) y aria-busy (WCAG 4.1.3).
 *  - Transición de "presionado" suave (respeta prefers-reduced-motion).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading = false, loadingLabel, children, className = '', disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={`touch-target inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-70 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
    </button>
  )
})
