import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguageSelector } from '../components/LanguageSelector'
import { ThemeToggle } from '../components/ThemeToggle'
import { UtpLogo } from '../components/UtpLogo'

export function Onboarding() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="flex min-h-dvh flex-col bg-[#c8001a] text-white">
      <header className="flex items-center justify-between gap-2 p-4">
        <LanguageSelector onBrand />
        <ThemeToggle onBrand />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-10 text-center animate-fade-in-up">
        <UtpLogo alt={t('login.logoAlt')} className="h-40 w-auto" onBrand />

        <h1 className="max-w-md text-balance text-2xl font-bold leading-snug">
          {t('onboarding.welcome')}
        </h1>
        <p className="max-w-sm text-balance text-lg text-white/90">{t('onboarding.subtitle')}</p>

        <p className="mt-4 text-sm text-white/70 animate-pulse">
          {t('onboarding.redirecting') || 'Redirigiendo...'}
        </p>
      </div>
    </main>
  )
}
