/**
 * Reglas de validación del login (WCAG 3.3.1 identificación de errores /
 * 3.3.4 prevención de errores). Devuelven la CLAVE i18n del error, no el texto,
 * para que el mensaje respete el idioma activo.
 */

const CODE_PATTERN = /^(U?\d{6,9})$/i

export interface LoginValues {
  code: string
  password: string
  acceptedTerms: boolean
}

export interface LoginErrors {
  code?: string
  password?: string
  terms?: string
}

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {}
  const code = values.code.trim()

  if (!code) {
    errors.code = 'errors.codeRequired'
  } else if (!CODE_PATTERN.test(code)) {
    errors.code = 'errors.codeFormat'
  }

  if (!values.password) {
    errors.password = 'errors.passwordRequired'
  } else if (values.password.length < 4) {
    errors.password = 'errors.passwordShort'
  }

  if (!values.acceptedTerms) {
    errors.terms = 'errors.termsRequired'
  }

  return errors
}

export function hasErrors(errors: LoginErrors): boolean {
  return Object.keys(errors).length > 0
}
