import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { LANGUAGE_STORAGE_KEY, type Language } from '../i18n'

type Theme = 'light' | 'dark'

export interface SessionUser {
  code: string
}

export interface ClaimedCoupon {
  offerId: string
  brandId: string
  brandName: string
  offerTitle: string
  claimedAt: number
  expiresInSeconds: number
}

const COLORBLIND_STORAGE_KEY = 'beneficios-utp:colorblind'
const FOCUSMODE_STORAGE_KEY = 'beneficios-utp:focusmode'
const FAVORITES_STORAGE_KEY = 'beneficios-utp:favorites'
const COUPONS_STORAGE_KEY = 'beneficios-utp:coupons'

/** Estado de un mensaje accesible visible (toast) — WCAG 4.1.3. */
export interface StatusMessage {
  id: number
  text: string
  tone: 'success' | 'error' | 'info'
}

interface AppContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  colorBlindMode: boolean
  toggleColorBlindMode: () => void
  focusMode: boolean
  toggleFocusMode: () => void
  favorites: Set<string>
  toggleFavorite: (offerId: string) => void
  claimedCoupons: ClaimedCoupon[]
  claimCoupon: (coupon: ClaimedCoupon) => void
  user: SessionUser | null
  login: (user: SessionUser) => void
  logout: () => void
  /** Anuncia un mensaje a lectores de pantalla (aria-live) y muestra un toast visual. */
  announce: (text: string, tone?: StatusMessage['tone']) => void
  /** Texto vivo para la región aria-live global. */
  liveMessage: string
  toast: StatusMessage | null
  dismissToast: () => void
}

const THEME_STORAGE_KEY = 'beneficios-utp:theme'

const AppContext = createContext<AppContextValue | null>(null)

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // Respeta la preferencia del sistema en el primer arranque.
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n: i18nInstance } = useTranslation()
  const [language, setLanguageState] = useState<Language>(i18n.language as Language)
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [colorBlindMode, setColorBlindMode] = useState(
    () => localStorage.getItem(COLORBLIND_STORAGE_KEY) === 'true',
  )
  const [focusMode, setFocusMode] = useState(
    () => localStorage.getItem(FOCUSMODE_STORAGE_KEY) === 'true',
  )
  const [favorites, setFavorites] = useState<Set<string>>(
    () => {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      return new Set(stored ? JSON.parse(stored) : [])
    },
  )
  const [claimedCoupons, setClaimedCoupons] = useState<ClaimedCoupon[]>(
    () => {
      const stored = localStorage.getItem(COUPONS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    },
  )
  const [user, setUser] = useState<SessionUser | null>(null)
  const [liveMessage, setLiveMessage] = useState('')
  const [toast, setToast] = useState<StatusMessage | null>(null)

  // WCAG 3.1.1 — el atributo lang del documento sigue al idioma activo.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // Modo oscuro real: alterna la clase .dark en <html> y persiste la elección.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // Modo daltónico: alterna la clase .colorblind en <html> y persiste la elección.
  useEffect(() => {
    document.documentElement.classList.toggle('colorblind', colorBlindMode)
    localStorage.setItem(COLORBLIND_STORAGE_KEY, colorBlindMode ? 'true' : 'false')
  }, [colorBlindMode])

  // Modo foco visible: alterna la clase .focus-mode en <html> y persiste la elección.
  useEffect(() => {
    document.documentElement.classList.toggle('focus-mode', focusMode)
    localStorage.setItem(FOCUSMODE_STORAGE_KEY, focusMode ? 'true' : 'false')
  }, [focusMode])

  const toggleColorBlindMode = useCallback(() => setColorBlindMode((prev) => !prev), [])
  const toggleFocusMode = useCallback(() => setFocusMode((prev) => !prev), [])

  const toggleFavorite = useCallback((offerId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(offerId)) {
        next.delete(offerId)
      } else {
        next.add(offerId)
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const claimCoupon = useCallback((coupon: ClaimedCoupon) => {
    setClaimedCoupons((prev) => {
      const next = prev.filter((c) => c.offerId !== coupon.offerId)
      next.push(coupon)
      localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const announce = useCallback<AppContextValue['announce']>((text, tone = 'info') => {
    // Reiniciar a '' primero fuerza a los lectores de pantalla a re-anunciar
    // aunque el texto sea idéntico al anterior.
    setLiveMessage('')
    window.requestAnimationFrame(() => setLiveMessage(text))
    setToast({ id: Date.now(), text, tone })
  }, [])

  const setLanguage = useCallback<AppContextValue['setLanguage']>(
    (lang) => {
      i18nInstance.changeLanguage(lang)
      setLanguageState(lang)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      // Anuncio de cambio de idioma en el NUEVO idioma (WCAG 4.1.3).
      announce(i18nInstance.getFixedT(lang)('language.changed'), 'info')
    },
    [i18nInstance, announce],
  )

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      announce(
        i18nInstance.t(next === 'dark' ? 'theme.changedDark' : 'theme.changedLight'),
        'info',
      )
      return next
    })
  }, [announce, i18nInstance])

  const login = useCallback((nextUser: SessionUser) => setUser(nextUser), [])
  const logout = useCallback(() => setUser(null), [])
  const dismissToast = useCallback(() => setToast(null), [])

  const value = useMemo<AppContextValue>(
    () => ({
      language,
      setLanguage,
      theme,
      toggleTheme,
      setTheme: setThemeState,
      colorBlindMode,
      toggleColorBlindMode,
      focusMode,
      toggleFocusMode,
      favorites,
      toggleFavorite,
      claimedCoupons,
      claimCoupon,
      user,
      login,
      logout,
      announce,
      liveMessage,
      toast,
      dismissToast,
    }),
    [language, setLanguage, theme, toggleTheme, colorBlindMode, toggleColorBlindMode, focusMode, toggleFocusMode, favorites, toggleFavorite, claimedCoupons, claimCoupon, user, login, logout, announce, liveMessage, toast, dismissToast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}
