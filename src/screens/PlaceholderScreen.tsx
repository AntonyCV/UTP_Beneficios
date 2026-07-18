import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface PlaceholderScreenProps {
  titleKey: string
  icon: ReactNode
}

export function PlaceholderScreen({ titleKey, icon }: PlaceholderScreenProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col px-5">
      <header className="flex items-center gap-2 py-4">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label={t('placeholder.back')}
          className="touch-target inline-flex items-center justify-center rounded-lg text-fg hover:bg-surface"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-lg font-bold text-fg">{t(titleKey)}</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-fg-muted">
          {icon}
        </div>
        <p className="max-w-xs text-balance text-fg-muted">{t('placeholder.genericBody')}</p>
      </div>
    </main>
  )
}
