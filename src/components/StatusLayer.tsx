import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'

/**
 * Capa global de mensajes de estado (WCAG 4.1.3):
 *  1. Región aria-live="polite" invisible: el lector de pantalla anuncia cada
 *     resultado de acción (login, error, cambio de idioma/tema).
 *  2. Toast visual con ÍCONO + TEXTO + color (redundancia multimodal, WCAG 1.4.1)
 *     usando paleta segura para daltonismo.
 * Sin autoplay agresivo: el toast se auto-cierra suave a los 5 s y es descartable.
 */
export function StatusLayer() {
  const { t } = useTranslation()
  const { liveMessage, toast, dismissToast } = useApp()

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(dismissToast, 5000)
    return () => window.clearTimeout(timer)
  }, [toast, dismissToast])

  const toneStyles = {
    success: { icon: CheckCircle2, cls: 'bg-success text-success-fg' },
    error: { icon: TriangleAlert, cls: 'bg-danger text-danger-fg' },
    info: { icon: Info, cls: 'bg-info text-info-fg' },
  } as const

  const active = toast ? toneStyles[toast.tone] : null
  const ToastIcon = active?.icon

  return (
    <>
      {/* Región viva: solo para tecnología de asistencia (no visible) */}
      <div aria-live="polite" role="status" className="sr-only">
        {liveMessage}
      </div>

      {toast && active && ToastIcon && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
          <div
            className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-xl px-4 py-3 shadow-lg animate-toast-in ${active.cls}`}
          >
            <ToastIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="flex-1 text-sm font-semibold">{toast.text}</p>
            <button
              type="button"
              onClick={dismissToast}
              aria-label={t('terms.close')}
              className="touch-target -my-1 -mr-2 inline-flex items-center justify-center rounded-lg hover:bg-black/10"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
