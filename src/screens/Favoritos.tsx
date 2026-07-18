import { ChevronLeft, Heart, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { findOffer } from '../lib/mockBrands'

export function Favoritos() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { favorites, toggleFavorite, announce } = useApp()

  const offers = [...favorites]
    .map((id) => findOffer(id))
    .filter((r): r is NonNullable<typeof r> => r !== null)

  function handleToggle(offerId: string, brand: string) {
    toggleFavorite(offerId)
    announce(`${brand} ${t('favoritos.removed')}`, 'info')
  }

  return (
    <main className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label={t('placeholder.back')}
          className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-fg">
          {t('nav.benefits')}
        </h1>
        <div className="h-10 w-10" aria-hidden="true" />
      </header>

      <div className="flex flex-col gap-4 px-4 pt-4">
        {offers.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-fg-muted">
            <ShoppingBag className="h-16 w-16" aria-hidden="true" />
            <p className="text-sm">{t('favoritos.empty')}</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3" role="list">
            {offers.map(({ brand, offer }) => (
              <li key={offer.id}>
                <article className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
                  <button
                    type="button"
                    onClick={() => handleToggle(offer.id, brand.name)}
                    aria-label={`${t('favoritos.remove')} ${brand.name}`}
                    className="touch-target shrink-0 rounded-full p-1.5 text-danger hover:bg-danger/10"
                  >
                    <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/descuento/${offer.id}`)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt="" className="h-full w-full object-contain p-1" />
                      ) : (
                        <span className="text-xl font-black text-fg-muted" aria-hidden="true">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-fg">{brand.name}</p>
                      <p className="text-xs text-fg-muted line-clamp-2">
                        {t(`brands.${brand.id}.offers.${offer.id}.title`)}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        S/ {offer.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
