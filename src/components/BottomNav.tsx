import { Heart, Home as HomeIcon, MapPin, Menu, Search, User } from 'lucide-react'
import { HeaderMenu } from './HeaderMenu'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const LOCATION_PROMPT_KEY = 'beneficios-utp:location-prompt-shown'

interface BottomNavProps {
  onRequestMap: () => void
}

function mobileItemClass(active: boolean) {
  return `touch-target flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium ${
    active ? 'font-bold text-brand' : 'text-fg-muted'
  }`
}

function desktopItemClass(active: boolean) {
  return `touch-target flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base transition-colors hover:bg-surface ${
    active ? 'font-bold text-fg' : 'font-medium text-fg-muted'
  }`
}

export function BottomNav({ onRequestMap }: BottomNavProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  function handleMapClick() {
    const alreadyPrompted = localStorage.getItem(LOCATION_PROMPT_KEY) === 'true'
    if (alreadyPrompted) {
      navigate('/mapa')
    } else {
      onRequestMap()
    }
  }

  const items = [
    { label: t('nav.home'),      icon: HomeIcon, path: '/home',       onClick: () => navigate('/home') },
    { label: t('nav.benefits'),  icon: Heart,    path: '/favoritos',  onClick: () => navigate('/favoritos') },
    { label: t('nav.profile'),   icon: User,     path: '/perfil',     onClick: () => navigate('/perfil'), isProfile: true },
    { label: t('nav.search'),    icon: Search,   path: '/beneficios', onClick: () => navigate('/beneficios') },
    { label: t('nav.map'),       icon: MapPin,   path: '/mapa',       onClick: handleMapClick },
  ]

  return (
    <>
      {/* Mobile: fixed bottom bar */}
      <nav
        aria-label={t('nav.home')}
        className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {items.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.path
          if (item.isProfile) {
            return (
              <div key={item.path} className="flex flex-1 items-center justify-center">
                <button
                  type="button"
                  onClick={item.onClick}
                  aria-label={item.label}
                  className={`touch-target -mt-4 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg ${active ? 'bg-brand text-white' : 'bg-fg text-canvas'}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            )
          }
          return (
            <button
              key={item.path}
              type="button"
              onClick={item.onClick}
              className={mobileItemClass(active)}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Desktop: fixed left sidebar (Instagram-style) */}
      <nav
        aria-label={t('nav.home')}
        className="fixed left-0 top-0 z-30 hidden h-dvh w-60 flex-col border-r border-line bg-canvas lg:flex"
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6 pt-4">
          <span className="text-xl font-extrabold tracking-tight text-fg">
            UTP Beneficios
          </span>
        </div>

        {/* Navigation items — centered vertically */}
        <div className="flex flex-1 flex-col justify-center gap-1 px-3">
          {items.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                type="button"
                onClick={item.onClick}
                className={desktopItemClass(active)}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${active ? 'stroke-[2.5]' : ''}`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Menu at bottom — opens the same HeaderMenu drawer on desktop */}
        <div className="border-t border-line px-3 py-3">
          <HeaderMenu
            trigger={
              <button
                type="button"
                className="touch-target flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-surface"
              >
                <Menu className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span>Más</span>
              </button>
            }
          />
        </div>
      </nav>
    </>
  )
}

export { LOCATION_PROMPT_KEY }
