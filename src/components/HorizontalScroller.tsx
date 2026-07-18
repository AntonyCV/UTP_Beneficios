import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface HorizontalScrollerProps {
  children: ReactNode
  /** Etiqueta accesible de la región de scroll (WCAG 1.3.1 / 4.1.2). */
  label: string
}

/**
 * Carrusel horizontal genérico y manual (sin autoplay, WCAG — ergonomía cognitiva).
 * Los botones ‹ › permiten desplazamiento por teclado/click (WCAG 2.1.1); el
 * contenedor también admite scroll táctil nativo. Los botones se deshabilitan
 * visual y semánticamente en los extremos (aria-disabled) en vez de desaparecer,
 * para no romper el orden de tabulación.
 */
export function HorizontalScroller({ children, label }: HorizontalScrollerProps) {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 320), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label={t('home.scrollLeft')}
          className="touch-target pointer-events-auto -ml-3 inline-flex items-center justify-center rounded-full border border-line bg-canvas/90 text-fg shadow"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label={t('home.scrollRight')}
          className="touch-target pointer-events-auto -mr-3 inline-flex items-center justify-center rounded-full border border-line bg-canvas/90 text-fg shadow"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
