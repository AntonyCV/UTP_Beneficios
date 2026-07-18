import { AlertCircle } from 'lucide-react'
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** Ícono decorativo al inicio del campo (aria-hidden). */
  leadingIcon?: ReactNode
  /** Botón/acción al final (ej. mostrar/ocultar contraseña). */
  trailing?: ReactNode
  helperText?: ReactNode
  error?: string | null
}

/**
 * Campo de texto accesible y reutilizable.
 *  - <label> asociado por id (WCAG 1.3.1 / 4.1.2).
 *  - Ayuda y error enlazados por aria-describedby; aria-invalid en error.
 *  - El error se muestra con ÍCONO + TEXTO, no solo color rojo (WCAG 1.4.1).
 *  - El contenedor crece con el contenido (sin ancho fijo) para es/en/qu (i18n).
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, leadingIcon, trailing, helperText, error, id, className = '', ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`
  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className="text-base font-medium text-fg-muted">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
          error
            ? 'border-danger ring-1 ring-danger'
            : 'border-line focus-within:border-focus'
        } bg-surface`}
      >
        {leadingIcon && (
          <span className="shrink-0 text-fg-muted" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`min-w-0 flex-1 bg-transparent text-lg text-fg placeholder:text-fg-muted/80 focus:outline-none ${className}`}
          {...rest}
        />
        {trailing && <span className="shrink-0">{trailing}</span>}
      </div>

      {helperText && (
        <p id={helperId} className="text-sm text-fg-muted">
          {helperText}
        </p>
      )}

      {error && (
        // role="alert" hace que el lector de pantalla lo anuncie al aparecer (WCAG 4.1.3).
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
})
