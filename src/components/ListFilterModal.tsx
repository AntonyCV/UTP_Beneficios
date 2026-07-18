import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface FilterItem {
  id: string
  labelKey: string
}

interface ListFilterModalProps {
  open: boolean
  onClose: () => void
  /** Devuelve el conjunto de ids seleccionados; vacío = "Todos". */
  onApply: (selected: Set<string>) => void
  title: string
  applyLabel: string
  closeLabel?: string
  items: FilterItem[]
  /** Clave i18n del ítem "Todos" (siempre primero). */
  allKey: string
  initialSelected?: Set<string>
}

/**
 * Modal de filtro reutilizable (ciudad / categoría). Radix Dialog garantiza
 * focus-trap, cierre con Esc y retorno de foco al cerrar (WCAG 2.1.1 / 2.4.3).
 * Checkboxes reales: etiqueta–input vinculados, navegables con teclado.
 */
export function ListFilterModal({
  open,
  onClose,
  onApply,
  title,
  applyLabel,
  closeLabel,
  items,
  allKey,
  initialSelected,
}: ListFilterModalProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<Set<string>>(initialSelected ?? new Set())

  function toggleItem(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function selectAll() {
    setSelected(new Set())
  }

  const isAll = selected.size === 0

  function handleApply() {
    onApply(selected)
    onClose()
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 animate-fade-in" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 top-16 z-50 mx-auto flex max-w-md flex-col overflow-hidden rounded-t-2xl bg-canvas shadow-xl animate-fade-in-up focus:outline-none"
          aria-describedby={undefined}
        >
          {/* Encabezado rojo de marca */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3">
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={closeLabel ?? t('terms.close')}
                className="touch-target inline-flex items-center justify-center rounded-lg text-primary-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
            <Dialog.Title className="flex-1 text-center text-base font-bold text-primary-fg">
              {title}
            </Dialog.Title>
            {/* Espaciador para centrar el título visualmente */}
            <div className="h-5 w-5" aria-hidden="true" />
          </div>

          {/* Lista scrollable */}
          <ul className="flex-1 overflow-y-auto divide-y divide-line" role="list">
            {/* Opción "Todos" */}
            <li>
              <label className="flex cursor-pointer items-center justify-between px-5 py-4 hover:bg-surface">
                <span className="text-base text-fg">{t(allKey)}</span>
                <input
                  type="checkbox"
                  checked={isAll}
                  onChange={selectAll}
                  className="h-5 w-5 cursor-pointer rounded accent-primary"
                  aria-label={t(allKey)}
                />
              </label>
            </li>
            {items.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-center justify-between px-5 py-4 hover:bg-surface">
                  <span className="text-base text-fg">{t(item.labelKey)}</span>
                  <input
                    type="checkbox"
                    checked={selected.has(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="h-5 w-5 cursor-pointer rounded accent-primary"
                    aria-label={t(item.labelKey)}
                  />
                </label>
              </li>
            ))}
          </ul>

          {/* Botón Aplicar fijo */}
          <div className="border-t border-line bg-canvas p-4">
            <button
              type="button"
              onClick={handleApply}
              className="touch-target w-full rounded-xl bg-primary py-3 text-base font-bold text-primary-fg"
            >
              {applyLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
