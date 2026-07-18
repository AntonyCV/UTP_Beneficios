import * as Dialog from '@radix-ui/react-dialog'
import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { UtpLogo } from './UtpLogo'

interface LocationPermissionModalProps {
  open: boolean
  onDecide: (granted: boolean) => void
}

/**
 * Modal de permiso de ubicación SIMULADO (el proyecto no integra geolocalización
 * real). Se recrea el patrón visual de un diálogo nativo del sistema operativo,
 * pero implementado con nuestros estándares de accesibilidad:
 *  - Focus trap + cierre con Esc (Radix Dialog), algo que un diálogo de SO real
 *    no siempre ofrece, pero que WCAG 2.1.1 exige aquí.
 *  - Cada opción es un botón con texto claro (nunca solo ícono).
 *  - El resultado se anuncia por toast + aria-live al cerrarse (WCAG 4.1.3).
 */
export function LocationPermissionModal({ open, onDecide }: LocationPermissionModalProps) {
  const { t } = useTranslation()
  const { announce } = useApp()

  function decide(granted: boolean) {
    announce(t(granted ? 'locationModal.grantedMessage' : 'locationModal.deniedMessage'), 'info')
    onDecide(granted)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && decide(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 animate-fade-in" />
        <Dialog.Content
          onEscapeKeyDown={() => decide(false)}
          className="fixed left-1/2 top-1/2 z-50 w-[88vw] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-canvas p-5 text-center shadow-xl animate-fade-in-up focus:outline-none"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand p-1.5">
            <UtpLogo alt="" className="h-full w-full" onBrand />
          </div>

          <Dialog.Title className="text-base font-bold text-fg">
            {t('locationModal.title')}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-fg-muted">
            {t('locationModal.note')}
          </Dialog.Description>

          <div className="my-4 flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <span
                role="img"
                aria-label={t('locationModal.preciseAlt')}
                className="flex h-16 w-16 items-center justify-center rounded-xl bg-info"
              >
                <MapPin className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-fg">{t('locationModal.precise')}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span
                role="img"
                aria-label={t('locationModal.safeAlt')}
                className="flex h-16 w-16 items-center justify-center rounded-xl bg-fg-muted"
              >
                <MapPin className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-fg">{t('locationModal.safe')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => decide(true)}
              className="touch-target rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-fg"
            >
              {t('locationModal.whileUsing')}
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="touch-target rounded-xl border border-line px-4 py-3 text-sm font-semibold text-fg"
            >
              {t('locationModal.once')}
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className="touch-target rounded-xl px-4 py-3 text-sm font-semibold text-danger"
            >
              {t('locationModal.deny')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
