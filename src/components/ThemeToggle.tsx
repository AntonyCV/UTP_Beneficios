import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'

interface ThemeToggleProps {
  onBrand?: boolean
}

/**
 * Toggle de modo claro/oscuro. Botón con ícono + aria-label textual (WCAG 1.1.1),
 * estado comunicado por aria-pressed (no solo por color, WCAG 1.4.1), área táctil
 * de 44px (WCAG 2.5.5) y foco visible heredado del estilo global (WCAG 2.4.7).
 * El cambio se anuncia por aria-live desde el Context (WCAG 4.1.3).
 */
export function ThemeToggle({ onBrand = false }: ThemeToggleProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useApp()
  const isDark = theme === 'dark'

  const color = onBrand ? 'text-white border-white/70 bg-white/10' : 'text-fg border-line bg-surface'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      title={isDark ? t('theme.toLight') : t('theme.toDark')}
      className={`touch-target inline-flex items-center justify-center gap-2 rounded-lg border ${color} px-3 py-2 text-sm font-medium transition-colors`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="hidden sm:inline">{isDark ? t('theme.light') : t('theme.dark')}</span>
    </button>
  )
}
