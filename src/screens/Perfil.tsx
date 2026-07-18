import { Bell, ChevronDown, ChevronLeft, ChevronUp, Pencil, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Switch } from '../components/Switch'
import type { ClaimedCoupon } from '../context/AppContext'
import { useApp } from '../context/AppContext'
import { SUPPORTED_LANGUAGES } from '../i18n'

function useRemaining(startingCoupons: ClaimedCoupon[]) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return startingCoupons.map((c) => ({
    ...c,
    remaining: Math.floor((c.claimedAt + c.expiresInSeconds * 1000 - now) / 1000),
  }))
}

function Divider() {
  return <hr className="border-line" />
}

interface ReadonlyFieldProps {
  label: string
  value: string
  masked?: boolean
}

function ReadonlyField({ label, value, masked }: ReadonlyFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-fg-muted">{label}</span>
      <div className="rounded-xl border border-line bg-surface px-4 py-3">
        <span className="text-base text-fg">{masked ? '•'.repeat(10) : value}</span>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  if (seconds <= 0) return 'Expirado'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function CouponCard({ coupon }: { coupon: ClaimedCoupon & { remaining: number } }) {
  const expired = coupon.remaining <= 0
  return (
    <div
      className={`rounded-xl border p-4 ${expired ? 'border-fg-muted/30 bg-surface opacity-60' : 'border-line bg-surface'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-fg">{coupon.brandName}</p>
          <p className="text-xs text-fg-muted">{coupon.offerTitle}</p>
        </div>
        <span className={`shrink-0 text-xs font-bold ${expired ? 'text-fg-muted' : 'text-primary'}`}>
          {expired ? 'Expirado' : formatTime(coupon.remaining)}
        </span>
      </div>
    </div>
  )
}

function NotificationPanel({
  open,
  onClose,
  coupons,
}: {
  open: boolean
  onClose: () => void
  coupons: (ClaimedCoupon & { remaining: number })[]
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      panelRef.current?.focus()
    }
  }, [open])

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden="true" />}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('profile.notification')}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-canvas shadow-xl transition-transform duration-300 focus:outline-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-base font-bold text-fg">Notificaciones</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('terms.close')}
              className="touch-target rounded-lg p-1 text-fg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {coupons.map((cp) => (
                <CouponCard key={cp.offerId} coupon={cp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Perfil() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    user,
    language,
    setLanguage,
    colorBlindMode,
    toggleColorBlindMode,
    focusMode,
    toggleFocusMode,
    claimedCoupons,
    announce,
  } = useApp()
  const [langOpen, setLangOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const coupons = useRemaining(claimedCoupons)
  const activeCount = coupons.filter((c) => c.remaining > 0).length

  function handleComingSoon() {
    announce(t('home.comingSoon'), 'info')
  }

  function handleColorBlindToggle() {
    toggleColorBlindMode()
    announce(
      colorBlindMode ? t('profile.colorBlindDisabled') : t('profile.colorBlindEnabled'),
      'info',
    )
  }

  function handleFocusToggle() {
    toggleFocusMode()
    announce(focusMode ? t('profile.focusDisabled') : t('profile.focusEnabled'), 'info')
  }

  return (
    <>
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} coupons={coupons} />

      <div className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            aria-label={t('profile.back')}
            className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="flex-1 text-center text-base font-bold text-fg">
            {t('profile.title')}
          </h1>
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            aria-label={t('profile.notification')}
            className="touch-target inline-flex items-center justify-center rounded-full bg-primary p-1.5 text-primary-fg"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center py-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-strong">
                <User className="h-14 w-14 text-fg-muted" aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={handleComingSoon}
                aria-label={t('profile.editAvatar')}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-info text-white shadow"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 pb-4">
            <span className="text-sm font-medium text-fg" aria-hidden="true">
              {t('profile.colorBlindMode')}:
            </span>
            <Switch
              checked={colorBlindMode}
              onChange={handleColorBlindToggle}
              label={t('profile.colorBlindMode')}
            />
          </div>

          <div className="flex items-center justify-between px-5 pb-4">
            <span className="text-sm font-medium text-fg" aria-hidden="true">
              {t('profile.focusMode')}:
            </span>
            <Switch
              checked={focusMode}
              onChange={handleFocusToggle}
              label={t('profile.focusMode')}
            />
          </div>

          <div className="flex flex-col gap-6 px-5 pb-8">
            <Divider />

            <section aria-labelledby="section-personal">
              <h2 id="section-personal" className="fm mb-4 text-lg font-bold text-fg">
                {t('profile.personalData')}
              </h2>
              <div className="flex flex-col gap-3">
                <ReadonlyField
                  label={t('profile.institutionalEmail')}
                  value={user?.code ?? 'u22244804'}
                />
                <ReadonlyField label={t('profile.password')} value="" masked />
                <button
                  type="button"
                  onClick={() => window.open('https://contrasena.utp.edu.pe/Recuperacion/OlvideMiClave.aspx', '_blank')}
                  className="self-end text-sm font-semibold text-primary underline underline-offset-2"
                >
                  {t('profile.changePassword')}
                </button>
              </div>
            </section>

            <Divider />

            <section aria-labelledby="section-address">
              <h2 id="section-address" className="fm mb-4 text-lg font-bold text-fg">
                Direcciones registradas
              </h2>
              <div className="flex flex-col gap-3">
                <ReadonlyField label="Dirección 1" value="Av. Universitaria 1234" />
                <ReadonlyField label="Dirección 2" value="Calle Los Olivos 567" />
                <ReadonlyField label="Ciudad" value="Lima" />
                <ReadonlyField label="País" value="Perú" />
              </div>
            </section>

            <Divider />

            <section aria-labelledby="section-coupons">
              <h2 id="section-coupons" className="fm mb-4 text-lg font-bold text-fg">
                Cupones reclamados
              </h2>
              <div className="flex flex-col gap-3">
                {coupons.map((cp) => (
                  <CouponCard key={cp.offerId} coupon={cp} />
                ))}
              </div>
            </section>

            <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
              <span className="text-sm text-fg-muted">Cupones activos:</span>
              <span className="text-base font-bold text-primary">{activeCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
              <span className="text-sm text-fg-muted">Cupones usados en total:</span>
              <span className="text-base font-bold text-fg">{coupons.length}</span>
            </div>

            <Divider />

            <section aria-labelledby="section-language">
              <h2 id="section-language" className="fm mb-1 text-lg font-bold text-fg">
                {t('profile.languageChange')}
              </h2>
              <p className="mb-3 text-sm text-fg-muted">{t('profile.selectedLanguage')}</p>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((o) => !o)}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  className="touch-target flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-base font-semibold text-fg"
                >
                  <span>{t(`language.${language}`)}</span>
                  {langOpen ? (
                    <ChevronUp className="h-5 w-5 text-fg-muted" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-fg-muted" aria-hidden="true" />
                  )}
                </button>

                {langOpen && (
                  <ul
                    role="listbox"
                    aria-label={t('profile.selectedLanguage')}
                    className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
                  >
                    {SUPPORTED_LANGUAGES.filter((l) => l !== language).map((lang) => (
                      <li key={lang} role="option" aria-selected={false}>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage(lang)
                            setLangOpen(false)
                          }}
                          className="touch-target w-full px-4 py-3 text-left text-base text-fg hover:bg-surface-strong"
                        >
                          {t(`language.${lang}`)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
