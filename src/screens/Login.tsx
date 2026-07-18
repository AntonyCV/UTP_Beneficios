import { Eye, EyeOff, KeyRound, User } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { LanguageSelector } from '../components/LanguageSelector'
import { TermsModal } from '../components/TermsModal'
import { TextField } from '../components/TextField'
import { ThemeToggle } from '../components/ThemeToggle'
import { UtpLogo } from '../components/UtpLogo'
import { useApp } from '../context/AppContext'
import { hasErrors, validateLogin, type LoginErrors } from '../lib/validation'

/**
 * Pantalla de inicio de sesión (login simulado contra el Context, sin backend).
 *
 * Criterios de accesibilidad cubiertos:
 *  - 1.1.1  logo con aria-label; íconos decorativos aria-hidden; ojo con aria-label textual.
 *  - 1.4.1  errores con ícono + texto (no solo color); paleta color-safe.
 *  - 2.1.1  formulario 100% operable por teclado; orden de tab lógico.
 *  - 2.4.7  foco visible global.
 *  - 3.3.1  errores identificados y asociados a cada campo (aria-describedby / role=alert).
 *  - 3.3.4  el botón está siempre habilitado y, al pulsar, revela y explica los errores
 *           (mejor para lectores de pantalla que un botón deshabilitado sin causa visible).
 *  - 4.1.3  éxito/error anunciados por aria-live + toast.
 */
export function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, announce } = useApp()

  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const codeRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)

  function focusFirstError(nextErrors: LoginErrors) {
    if (nextErrors.code) codeRef.current?.focus()
    else if (nextErrors.password) passwordRef.current?.focus()
    else if (nextErrors.terms) termsRef.current?.focus()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validateLogin({ code, password, acceptedTerms })
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      // Anuncia que hay errores y lleva el foco al primero (WCAG 3.3.1 / 2.4.3).
      announce(t('errors.summaryTitle'), 'error')
      focusFirstError(nextErrors)
      return
    }

    // Login simulado: pequeña espera para mostrar el estado de carga accesible.
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    login({ code: code.trim() })
    setSubmitting(false)
    announce(t('login.successMessage'), 'success')
    navigate('/home')
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10">
      <header className="flex items-center justify-between gap-2 py-4">
        <LanguageSelector />
        <ThemeToggle />
      </header>

      <div className="flex flex-1 flex-col items-center animate-fade-in">
        <UtpLogo alt={t('login.logoAlt')} className="h-32 w-auto" />

        <h1 className="mt-4 text-balance text-center text-xl font-bold text-fg">
          {t('login.tagline')}
        </h1>

        {/* noValidate: usamos validación propia y accesible, no la nativa del navegador */}
        <form onSubmit={handleSubmit} noValidate className="mt-8 flex w-full flex-col gap-5">
          <TextField
            ref={codeRef}
            label={t('login.codeLabel')}
            placeholder={t('login.codePlaceholder')}
            leadingIcon={<User className="h-5 w-5" />}
            helperText={t('login.codeHelper')}
            error={errors.code ? t(errors.code) : null}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="text"
            autoComplete="username"
            autoCapitalize="characters"
            enterKeyHint="next"
          />

          <TextField
            ref={passwordRef}
            label={t('login.passwordLabel')}
            placeholder={t('login.passwordPlaceholder')}
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<KeyRound className="h-5 w-5" />}
            error={errors.password ? t(errors.password) : null}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            enterKeyHint="go"
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                className="touch-target inline-flex items-center justify-center rounded-lg text-fg-muted hover:bg-surface-strong"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            }
          />

          {/* Términos: checkbox obligatorio (WCAG 3.3.4). El enlace abre el modal accesible. */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <input
                ref={termsRef}
                id="accept-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked)
                  if (e.target.checked) setErrors((prev) => ({ ...prev, terms: undefined }))
                }}
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? 'terms-error' : undefined}
                className="h-5 w-5 shrink-0 accent-primary"
              />
              <label htmlFor="accept-terms" className="text-base text-fg">
                {t('login.termsPrefix')}{' '}
                <TermsModal
                  trigger={
                    <button
                      type="button"
                      className="touch-target inline font-bold text-info underline underline-offset-2 hover:no-underline"
                    >
                      {t('login.termsLink')}
                    </button>
                  }
                />
              </label>
            </div>
            {errors.terms && (
              <p id="terms-error" role="alert" className="pl-9 text-sm font-medium text-danger">
                {t(errors.terms)}
              </p>
            )}
          </div>

          <Button type="submit" loading={submitting} loadingLabel={t('login.submitting')}>
            {t('login.submit')}
          </Button>
        </form>
      </div>
    </main>
  )
}
