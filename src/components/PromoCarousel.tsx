import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PROMO_SLIDES } from '../lib/mockDiscounts'
import { PromoImage } from './PromoImage'

/**
 * Carrusel de promociones. 100% MANUAL, sin autoplay ni auto-scroll (evita
 * sobrecarga sensorial / ergonomía TDAH, requisito explícito del proyecto).
 * Los indicadores de posición son botones reales (no solo puntos decorativos)
 * con aria-current en el activo; el slide actual se anuncia en un texto oculto
 * (WCAG 4.1.3) sin usar aria-live para no interrumpir la navegación.
 * Al presionar un slide navega a la oferta específica de la marca.
 */
export function PromoCarousel() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const total = PROMO_SLIDES.length
  const slide = PROMO_SLIDES[index]

  function go(next: number) {
    setIndex((next + total) % total)
  }

  return (
    <div className="relative" aria-roledescription="carousel" aria-label={t('home.promoLabel')}>
      <div
        role="button"
        tabIndex={0}
        aria-label={t('home.promoSlideOf', { n: index + 1, total }) + ' — ' + t(`deals.${slide.dealId}.brand`) + ' — ' + t('home.promoViewOffer')}
        className="relative h-44 w-full overflow-hidden rounded-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => { if (slide.offerId) navigate(`/descuento/${slide.offerId}`) }}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && slide.offerId) { e.preventDefault(); navigate(`/descuento/${slide.offerId}`) } }}
      >
        <PromoImage
          alt=""
          icon={slide.icon}
          accent={slide.accent}
          imageUrl={slide.imageUrl}
          className="h-full w-full pointer-events-none"
        />

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(index - 1) }}
          aria-label={t('home.promoPrev')}
          className="touch-target absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/40 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(index + 1) }}
          aria-label={t('home.promoNext')}
          className="touch-target absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/40 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {PROMO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-current={i === index ? 'true' : undefined}
            aria-label={t('home.promoGoTo', { n: i + 1 })}
            className="touch-target flex items-center justify-center"
          >
            <span
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-primary' : 'w-2.5 bg-line'
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
