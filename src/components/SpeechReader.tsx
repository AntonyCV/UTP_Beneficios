import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReadMode } from '../hooks/useReadMode'
import { useSpeech } from '../hooks/useSpeech'

export function SpeechReader() {
  const { t } = useTranslation()
  const { supported, speak, stop } = useSpeech()
  const [active, setActive] = useState(false)
  useReadMode(active, speak, stop)

  useEffect(() => {
    document.documentElement.classList.toggle('read-mode', active)
  }, [active])

  if (!supported) return null

  return (
    <div className="fixed bottom-20 right-4 z-40 flex items-center gap-2 lg:bottom-4 lg:left-64">
      {active && (
        <span
          className="animate-fade-in rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-fg shadow"
          aria-live="polite"
        >
          {t('speechReader.active')}
        </span>
      )}
      <button
        type="button"
        data-read-toggle
        onClick={() => setActive((p) => !p)}
        aria-label={active ? t('speechReader.stop') : t('speechReader.label')}
        className={`touch-target flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
          active
            ? 'animate-pulse bg-primary text-primary-fg ring-2 ring-primary ring-offset-2'
            : 'bg-canvas text-fg ring-1 ring-line hover:bg-surface-strong'
        }`}
      >
        {active ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  )
}
