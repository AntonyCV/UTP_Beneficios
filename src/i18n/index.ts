import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './es.json'
import en from './en.json'
import qu from './qu.json'

export const SUPPORTED_LANGUAGES = ['es', 'en', 'qu'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'beneficios-utp:lang'

function getInitialLanguage(): Language {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
    return stored as Language
  }
  return 'es'
}

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    qu: { translation: qu },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
  returnNull: false,
})

export { STORAGE_KEY as LANGUAGE_STORAGE_KEY }
export default i18n
