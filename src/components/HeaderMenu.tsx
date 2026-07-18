import * as Dialog from '@radix-ui/react-dialog'
import { LogOut, Menu, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { LanguageSelector } from './LanguageSelector'
import { ThemeToggle } from './ThemeToggle'

interface HeaderMenuProps {
  trigger?: ReactNode
}

export function HeaderMenu({ trigger }: HeaderMenuProps) {
  const { t } = useTranslation()
  const { logout, announce } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    announce(t('home.logout'), 'info')
    navigate('/login')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            aria-label={t('home.menuLabel')}
            className="touch-target inline-flex items-center justify-center rounded-lg text-fg hover:bg-surface"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col gap-6 bg-canvas p-5 shadow-xl animate-fade-in focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-fg">{t('home.menuTitle')}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t('terms.close')}
                className="touch-target inline-flex items-center justify-center rounded-lg text-fg-muted hover:bg-surface"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="touch-target mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-line px-4 py-3 text-sm font-bold text-danger"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            {t('home.logout')}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
