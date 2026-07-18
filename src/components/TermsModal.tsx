import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface TermsModalProps {
  /** El disparador (el enlace "Términos y condiciones"). */
  trigger: ReactNode
}

/**
 * Modal de Términos y condiciones.
 * Radix Dialog aporta gratis lo exigido por WCAG 2.1.1 / 2.4.3:
 *  - Focus trap mientras está abierto.
 *  - Cierre con Esc y clic en el overlay.
 *  - Devuelve el foco al elemento que lo abrió al cerrarse.
 *  - role="dialog" + aria-modal + título/descripción asociados.
 */
export function TermsModal({ trigger }: TermsModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-line bg-canvas p-6 shadow-xl animate-fade-in-up focus:outline-none">
          <div className="mb-3 flex items-start justify-between gap-4">
            <Dialog.Title className="text-xl font-bold text-fg">{t('terms.title')}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t('terms.close')}
                className="touch-target -mr-2 -mt-2 inline-flex items-center justify-center rounded-lg text-fg-muted hover:bg-surface"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mb-2 text-base font-medium text-fg">
            {t('terms.intro')}
          </Dialog.Description>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1 text-base leading-relaxed text-fg-muted">
            {t('terms.body')}
          </div>

          <div className="mt-5">
            <Dialog.Close asChild>
              <button
                type="button"
                className="touch-target inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-lg font-bold text-primary-fg transition-all hover:brightness-95 active:scale-[.98]"
              >
                {t('terms.accept')}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
