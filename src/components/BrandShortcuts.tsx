import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { BRANDS } from '../lib/mockBrands'
import { BRAND_SHORTCUTS } from '../lib/mockDiscounts'
import { HorizontalScroller } from './HorizontalScroller'

/** Accesos directos a marcas (carrusel manual de logos redondos). */
export function BrandShortcuts() {
  const { t } = useTranslation()
  const { announce } = useApp()
  const navigate = useNavigate()

  return (
    <HorizontalScroller label={t('home.brandsLabel')}>
      {BRAND_SHORTCUTS.map((brand) => (
        <button
          key={brand.id}
          type="button"
          onClick={() => {
            if (BRANDS[brand.id]) {
              navigate(`/marca/${brand.id}`)
            } else {
              announce(t('home.comingSoon'), 'info')
            }
          }}
          className="flex w-16 shrink-0 snap-start flex-col items-center gap-1.5"
        >
          <span
            role="img"
            aria-label={brand.name}
            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full"
            style={{ backgroundColor: brand.logoUrl ? undefined : brand.accent }}
          >
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-white" aria-hidden="true">
                {brand.name.slice(0, 1)}
              </span>
            )}
          </span>
          <span className="max-w-full truncate text-xs font-medium text-fg">{brand.name}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => navigate('/beneficios')}
        className="flex w-16 shrink-0 snap-start flex-col items-center gap-1.5"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-line text-fg-muted">
          <MoreHorizontal className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="max-w-full truncate text-xs font-medium text-fg">{t('home.seeMore')}</span>
      </button>
    </HorizontalScroller>
  )
}