import { ClipboardList, Edit2, Heart, MapPin, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { BRANDS } from '../lib/mockBrands'

/**
 * Pantalla de detalle de marca: lista de ofertas de un establecimiento.
 * Ruta: /marca/:brandId  (ej. /marca/bembos)
 * Fiel a la captura de Figma: header con logo, ubicación, tarjetas de oferta horizontales.
 */
export function BrandDetail() {
  const { brandId } = useParams<{ brandId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { favorites, toggleFavorite, announce } = useApp()

  const brand = brandId ? BRANDS[brandId] : null

  if (!brand) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-fg-muted">
        {t('placeholder.genericBody')}
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t('placeholder.back')}
          className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
        >
          {/* Flecha atrás */}
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo de marca */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: brand.logoUrl ? undefined : brand.accent }}
        >
          {brand.logoUrl ? (
            <img src={brand.logoUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-base font-bold text-white" aria-hidden="true">
              {brand.name.slice(0, 1)}
            </span>
          )}
        </div>

        <h1 className="flex-1 text-base font-bold text-fg">{brand.name}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* Sección "Ofertas cerca de tu zona" */}
        <section aria-labelledby="nearby-title" className="mt-5">
          <h2
            id="nearby-title"
            className="mb-3 flex items-center gap-1 text-base font-bold text-brand"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {t('brandDetail.offersNearYou')}
          </h2>

          <div className="flex items-stretch gap-2 rounded-xl border border-line bg-surface p-3">
            {/* Bloque de ubicación */}
            <div className="flex flex-1 items-start gap-2">
              <button
                type="button"
                onClick={() => announce(t('home.comingSoon'), 'info')}
                aria-label={t('brandDetail.editLocation')}
                className="touch-target mt-0.5 shrink-0"
              >
                <Edit2 className="h-4 w-4 text-fg-muted" aria-hidden="true" />
              </button>
              <div>
                <p className="text-sm text-fg-muted">{t('brandDetail.location')}</p>
                {t(`brands.${brand.id}.location`).split('\n').map((line, i) => (
                  <p key={i} className="text-sm font-medium text-fg">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Botón agregar ubicación */}
            <button
              type="button"
              onClick={() => announce(t('home.comingSoon'), 'info')}
              aria-label={t('brandDetail.addLocation')}
              className="touch-target flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-line text-fg"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Sección "Descuentos y beneficios" */}
        <section aria-labelledby="discounts-title" className="mt-6">
          <h2
            id="discounts-title"
            className="mb-4 text-base font-bold text-brand"
          >
            {t('brandDetail.discountsTitle')}
          </h2>

          <ul className="flex flex-col gap-4" role="list">
            {brand.offers.map((offer) => (
              <li key={offer.id}>
                <article className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="flex gap-3 p-3">
                    {/* Imagen de la oferta */}
                    <div
                      className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                      style={{ backgroundColor: brand.accent + '22' }}
                      role="img"
                      aria-label={t(`brands.${brand.id}.offers.${offer.id}.imageAlt`)}
                    >
                      {offer.imageUrl ? (
                        <img
                          src={offer.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span
                          className="flex h-full w-full items-center justify-center text-3xl font-black"
                          style={{ color: brand.accent }}
                          aria-hidden="true"
                        >
                          {brand.name.slice(0, 1)}
                        </span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col gap-1.5">
                      <p className="text-sm font-semibold leading-snug text-fg line-clamp-3">
                        {t(`brands.${brand.id}.offers.${offer.id}.title`)}
                      </p>

                      {/* Precio + descuento */}
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-extrabold text-primary">
                          S/ {offer.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-fg-muted line-through">
                          S/ {offer.originalPrice.toFixed(2)}
                        </span>
                        <span className="rounded-full bg-brand px-1.5 py-0.5 text-xs font-bold text-white">
                          -{offer.discountPercent}% {t('brandDetail.discount')}
                        </span>
                      </div>

                      {/* Favorito + Canjear ahora */}
                      <div className="mt-auto flex items-center gap-2 self-end">
                        <button
                          type="button"
                          onClick={() => {
                            toggleFavorite(offer.id)
                            announce(
                              favorites.has(offer.id)
                                ? t('brandDetail.removedFav')
                                : t('brandDetail.addedFav'),
                              'info',
                            )
                          }}
                          aria-label={
                            favorites.has(offer.id)
                              ? t('brandDetail.removeFav')
                              : t('brandDetail.addFav')
                          }
                          className="touch-target flex items-center justify-center rounded-lg border border-danger p-1.5 text-danger"
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.has(offer.id) ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/descuento/${offer.id}`)}
                          className="fm touch-target flex items-center gap-1.5 rounded-lg border border-success px-3 py-1.5 text-sm font-semibold text-success"
                        >
                          <ClipboardList className="h-4 w-4" aria-hidden="true" />
                          {t('brandDetail.redeemNow')}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Oferta por días */}
                  {offer.expiresInDays !== undefined && (
                    <div className="flex items-center gap-1.5 border-t border-line px-3 py-2 text-sm text-brand">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        {t('brandDetail.expiresInDays', { days: offer.expiresInDays })}
                      </span>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
