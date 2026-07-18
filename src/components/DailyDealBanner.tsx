import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DailyDealBannerProps {
  onViewAll: () => void
}

const INITIAL_SECONDS = 22 * 3600 + 55 * 60 + 20

/**
 * Banner "Beneficio del día" con cuenta regresiva.
 * WCAG 4.1.3: usa role="timer" con aria-live="off" a propósito — un countdown
 * que se anuncia cada segundo sature a los lectores de pantalla (antipatrón
 * documentado en WAI-ARIA Authoring Practices). El texto sigue siendo legible
 * bajo demanda por el lector de pantalla; solo se evita el anuncio automático.
 */
export function DailyDealBanner({ onViewAll }: DailyDealBannerProps) {
  const { t } = useTranslation()
  const [seconds, setSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return (
    <div className="fm flex items-center justify-between gap-3 rounded-2xl bg-brand px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-bold">{t('home.dailyDeal')}</p>
          <p role="timer" aria-live="off" className="text-xs text-white/90">
            {t('home.dailyDealTimeLeft', { hours, minutes })}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="touch-target shrink-0 rounded-xl border border-white/80 px-3 py-2 text-sm font-bold text-white hover:bg-white/10"
      >
        {t('home.viewAll')}
      </button>
    </div>
  )
}
