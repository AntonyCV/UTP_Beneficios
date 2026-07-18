import { CheckCircle2, MapPin, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { findOffer } from '../lib/mockBrands'
import * as Dialog from '@radix-ui/react-dialog'

type Tab = 'details' | 'locations' | null

function formatTime(sec: number) {
  const h = Math.floor(sec / 3600).toString().padStart(2, '0')
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0')
  const s = (sec % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function SuccessOverlay({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2600)
    return () => clearTimeout(id)
  }, [onDone])

  const DOTS = [
    'top-10 left-16', 'top-14 right-14', 'top-6 left-1/2',
    'bottom-16 left-10', 'bottom-10 right-16', 'top-1/3 left-4', 'top-1/3 right-4',
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="relative mx-6 flex flex-col items-center gap-5 rounded-3xl bg-canvas px-10 py-12 shadow-2xl">
        {DOTS.map((pos, i) => (
          <span
            key={i}
            className={`absolute h-3 w-3 rounded-full bg-brand/30 animate-scale-bounce ${pos}`}
            style={{ animationDelay: `${i * 60}ms` }}
            aria-hidden="true"
          />
        ))}
        <div className="flex h-24 w-24 animate-scale-bounce items-center justify-center rounded-full bg-brand shadow-lg">
          <CheckCircle2 className="h-14 w-14 text-white" aria-hidden="true" />
        </div>
        <p className="text-center text-base font-bold text-fg">{message}</p>
      </div>
    </div>
  )
}

/**
 * Pantalla de detalle de una oferta. Incluye:
 * - Hero image + info de descuento
 * - Botón Generar cupón → modal de confirmación → overlay animado → estado "creado"
 * - Tabs inline "Ver detalles" / "Ver locales" con contenido expandible
 * - Caja de estado del cupón (no creado / creado + countdown)
 */
export function DealDetail() {
  const { offerId } = useParams<{ offerId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { claimedCoupons, claimCoupon, announce } = useApp()

  const result = offerId ? findOffer(offerId) : null
  const existingClaim = result ? claimedCoupons.find((c) => c.offerId === result.offer.id) : null

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [couponGenerated, setCouponGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>(null)

  const COUPON_SECONDS = 2 * 3600
  const isClaimed = couponGenerated || !!existingClaim

  const endRef = useRef(0)
  const [remaining, setRemaining] = useState(() => {
    if (existingClaim) {
      return Math.max(0, Math.floor((existingClaim.claimedAt + existingClaim.expiresInSeconds * 1000 - Date.now()) / 1000))
    }
    return 0
  })

  useEffect(() => {
    if (!isClaimed) {
      endRef.current = 0
      setRemaining(0)
      return
    }
    if (endRef.current === 0) {
      if (existingClaim) {
        endRef.current = existingClaim.claimedAt + existingClaim.expiresInSeconds * 1000
      } else {
        endRef.current = Date.now() + COUPON_SECONDS * 1000
      }
    }
    const update = () => setRemaining(Math.max(0, Math.floor((endRef.current - Date.now()) / 1000)))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [isClaimed])

  const generateBtnRef = useRef<HTMLButtonElement>(null)

  function handleConfirm() {
    setConfirmOpen(false)
    setShowSuccess(true)
  }

  function handleSuccessDone() {
    setShowSuccess(false)
    setCouponGenerated(true)
    claimCoupon({
      offerId: result!.offer.id,
      brandId: result!.brand.id,
      brandName: result!.brand.name,
      offerTitle: t(`brands.${result!.brand.id}.offers.${result!.offer.id}.title`),
      claimedAt: Date.now(),
      expiresInSeconds: COUPON_SECONDS,
    })
    announce(t('dealDetail.couponEnabled'), 'success')
  }

  function toggleTab(tab: Tab) {
    setActiveTab((prev) => (prev === tab ? null : tab))
  }

  if (!result) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-fg-muted">
        {t('placeholder.genericBody')}
      </div>
    )
  }

  const { brand, offer } = result

  return (
    <>
      <div className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label={t('placeholder.back')}
            className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-base font-bold text-fg">
            {t(`brands.${brand.id}.categoryTitle`)}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Hero */}
          <div
            className="flex h-56 w-full items-center justify-center overflow-hidden"
            style={{ backgroundColor: brand.accent + '18' }}
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
              <span className="text-6xl font-black" style={{ color: brand.accent }} aria-hidden="true">
                {brand.name.slice(0, 1)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 px-5 pb-8 pt-5">
            {/* Info */}
            <div>
              <p className="text-sm text-fg-muted">{brand.name}</p>
              <h2 className="mt-1 text-2xl font-extrabold text-fg">
                {offer.discountPercent}% {t('dealDetail.discountPercent')}
              </h2>
              <p className="mt-2 text-sm text-fg-muted">{t(`brands.${brand.id}.offers.${offer.id}.description`)}</p>
            </div>

            {/* CTA principal */}
            <button
              ref={generateBtnRef}
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={isClaimed}
              aria-disabled={isClaimed}
              className="fm touch-target w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-fg disabled:opacity-50"
            >
              {isClaimed ? t('dealDetail.couponAlreadyGenerated') : t('dealDetail.generateCoupon')}
            </button>

            {/* Tabs "Ver detalles" / "Ver locales" */}
            <div
              role="tablist"
              aria-label={t('dealDetail.infoTabs')}
              className="flex gap-3"
            >
              <button
                role="tab"
                type="button"
                aria-selected={activeTab === 'details'}
                aria-controls="tab-details"
                onClick={() => toggleTab('details')}
                className={`touch-target flex-1 rounded-2xl border-2 py-3 text-sm font-semibold transition-colors ${activeTab === 'details'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-line bg-surface text-fg'
                  }`}
              >
                {t('dealDetail.viewDetails')}
              </button>
              <button
                role="tab"
                type="button"
                aria-selected={activeTab === 'locations'}
                aria-controls="tab-locations"
                onClick={() => toggleTab('locations')}
                className={`touch-target flex-1 rounded-2xl border-2 py-3 text-sm font-semibold transition-colors ${activeTab === 'locations'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-line bg-surface text-fg'
                  }`}
              >
                {t('dealDetail.viewLocations')}
              </button>
            </div>

            {/* Contenido del tab "Ver detalles" */}
            {activeTab === 'details' && (
              <div
                id="tab-details"
                role="tabpanel"
                className="rounded-2xl bg-surface p-4"
              >
                <h3 className="mb-3 font-bold text-fg">{t('dealDetail.conditionsTitle')}</h3>
                <ul className="flex flex-col gap-2">
                  {brand.detailsTerms.map((_, i) => (
                    <li key={i} className="flex gap-2 text-sm text-fg-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" aria-hidden="true" />
                      {t(`brands.${brand.id}.detailsTerms.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contenido del tab "Ver locales" */}
            {activeTab === 'locations' && (
              <div id="tab-locations" role="tabpanel">
                <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line overflow-hidden">
                  {brand.locations.map((loc) => (
                    <li key={loc.name} className="flex items-center gap-3 bg-surface px-4 py-3">
                      <div className="flex-1">
                        <p className="font-semibold text-fg">{loc.name}</p>
                        <p className="text-sm text-fg-muted">{loc.address}</p>
                        <p className="text-sm text-fg-muted">{loc.city}</p>
                      </div>
                      {/* Iconos de acción */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          aria-label={t('dealDetail.callLabel', { name: loc.name })}
                          onClick={() => announce(t('home.comingSoon'), 'info')}
                          className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-brand text-brand"
                        >
                          <Phone className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label={t('dealDetail.mapLabel', { name: loc.name })}
                          onClick={() => announce(t('home.comingSoon'), 'info')}
                          className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-brand text-brand"
                        >
                          <MapPin className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Caja de estado del cupón */}
            <div
              className={`fm rounded-2xl border-2 border-dashed p-4 text-center ${isClaimed
                  ? 'border-success bg-success/10'
                  : 'border-brand/40 bg-brand/5'
                }`}
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="mb-3 text-xs text-fg-muted">{t('dealDetail.couponSection')}</p>

              {isClaimed ? (
                <>
                  <p className="text-xl font-extrabold tracking-widest text-success">
                    {offer.couponCode}
                  </p>
                  <div className="my-3 flex items-center justify-center gap-4">
                    <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
                    <div
                      role="timer"
                      aria-live="off"
                      className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-bold text-fg"
                      aria-label={t('dealDetail.expiresIn', { time: formatTime(remaining) })}
                    >
                      {t('dealDetail.expiresIn', { time: formatTime(remaining) })}
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-success">{t('dealDetail.readyToUse')}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-extrabold text-brand">{t('dealDetail.noCodeTitle')}</p>
                  <div className="my-3 flex items-center justify-center gap-4">
                    <X className="h-8 w-8 text-brand" aria-hidden="true" />
                    <div className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-bold text-fg">
                      00:00:00
                    </div>
                    <X className="h-8 w-8 text-brand" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-fg-muted">{t('dealDetail.noCodeSubtitle')}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 animate-fade-in" />
          <Dialog.Content
            className="fixed inset-x-6 top-1/2 z-50 -translate-y-1/2 overflow-hidden rounded-2xl bg-canvas shadow-2xl animate-scale-bounce focus:outline-none"
            aria-describedby="confirm-body"
          >
            <div className="bg-primary px-5 py-4 text-center">
              <Dialog.Title className="text-base font-bold text-primary-fg">
                {t('dealDetail.confirmTitle')}
              </Dialog.Title>
            </div>
            <div className="px-6 py-6">
              <p id="confirm-body" className="text-center text-sm text-fg">
                {t('dealDetail.confirmQuestion')}
              </p>
              <div className="mt-6 flex gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="touch-target flex-1 rounded-xl border border-line bg-surface py-3 text-sm font-semibold text-fg"
                  >
                    {t('dealDetail.confirmCancel')}
                  </button>
                </Dialog.Close>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="touch-target flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-fg"
                >
                  {t('dealDetail.confirmAccept')}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showSuccess && (
        <SuccessOverlay message={t('dealDetail.couponEnabled')} onDone={handleSuccessDone} />
      )}
    </>
  )
}
