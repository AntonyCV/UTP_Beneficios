import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { SUPPORTED_LANGUAGES, type Language } from '../i18n'

interface LanguageSelectorProps {
  /** Variante clara para colocarlo sobre el fondo rojo del onboarding. */
  onBrand?: boolean
}

/**
 * Selector de idioma accesible. Se implementa con un <select> nativo por ser
 * 100% operable por teclado y anunciado correctamente por lectores de pantalla
 * (WCAG 2.1.1). El ícono se acompaña SIEMPRE de una etiqueta textual (no depende
 * del color, WCAG 1.4.1). Área táctil >= 44px (WCAG 2.5.5).
 */
export function LanguageSelector({ onBrand = false }: LanguageSelectorProps) {
  const { t } = useTranslation()
  const { language, setLanguage } = useApp()

  const textColor = onBrand ? 'text-white' : 'text-fg'
  const borderColor = onBrand ? 'border-white/70' : 'border-line'
  const bg = onBrand ? 'bg-white/10' : 'bg-surface'

  return (
    <label className={`inline-flex items-center gap-2 ${textColor}`}>
      <Languages className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{t('language.label')}</span>
      <select
        aria-label={t('language.label')}
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className={`touch-target cursor-pointer rounded-lg border ${borderColor} ${bg} ${textColor} px-3 py-2 text-sm font-medium focus:outline-none`}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng} value={lng} className="bg-canvas text-fg">
            {t(`language.${lng}`)}
          </option>
        ))}
      </select>
    </label>
  )
}
