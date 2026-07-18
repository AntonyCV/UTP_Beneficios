import { Mic, Search, Square } from 'lucide-react'
import { useId, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { BRAND_SHORTCUTS } from '../lib/mockDiscounts'

interface BrandEntry { id: string; name: string }
const ALL_BRAND_NAMES: BrandEntry[] = [...BRAND_SHORTCUTS]
const EXTRA_BRANDS: BrandEntry[] = [
  { id: 'latacona', name: 'La Tacona' },
  { id: 'gmo', name: 'GMO' },
]
for (const b of EXTRA_BRANDS) {
  if (!ALL_BRAND_NAMES.some((x) => x.id === b.id)) ALL_BRAND_NAMES.push(b)
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

function bestBrandMatch(input: string): { id: string; name: string } | null {
  const normalized = input.toLowerCase().replace(/[^a-záéíóúñü0-9\s]/g, '').trim()
  if (!normalized) return null
  let best: { id: string; name: string; ratio: number } | null = null
  for (const brand of BRAND_SHORTCUTS) {
    const brandName = brand.name.toLowerCase()
    const dist = levenshtein(normalized, brandName)
    const maxLen = Math.max(normalized.length, brandName.length)
    const ratio = maxLen === 0 ? 0 : 1 - dist / maxLen
    if (ratio > 0.55 && (!best || ratio > best.ratio)) {
      best = { id: brand.id, name: brand.name, ratio }
    }
  }
  return best ? { id: best.id, name: best.name } : null
}

export function SearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { announce } = useApp()
  const [value, setValue] = useState('')
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [finalText, setFinalText] = useState('')
  const recognitionRef = useRef<any>(null)
  const inputId = useId()

  const SpeechRecognition =
    (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/beneficios?q=${encodeURIComponent(q)}` : '/beneficios')
  }

  function stopListening(cancel = false) {
    if (recognitionRef.current) {
      if (cancel) recognitionRef.current.abort()
      else recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setListening(false)
    if (!cancel) setInterim('')
  }

  function doNavigate(text: string) {
    const clean = text.replace(/\.+$/, '').trim()
    setValue(clean)
    if (!clean) {
      announce(t('home.voiceNoResults'), 'info')
      navigate('/beneficios')
      return
    }
    const match = bestBrandMatch(clean)
    if (match) {
      navigate(`/marca/${match.id}`)
    } else {
      announce(t('home.voiceNoResults'), 'info')
      navigate(`/beneficios?q=${encodeURIComponent(clean)}`)
    }
  }

  function startListening() {
    const recognition = new SpeechRecognition()
    recognition.lang = 'es-PE'
    recognition.interimResults = true
    recognition.continuous = false

    let hasResult = false

    recognition.onresult = (event: any) => {
      hasResult = true
      let final = ''
      let interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          final += result[0].transcript
        } else {
          interimText += result[0].transcript
        }
      }
      if (final) {
        const clean = final.replace(/\.+$/, '').trim()
        setFinalText(clean)
        setInterim('')
        setListening(false)
        setTimeout(() => doNavigate(clean), 1200)
        return
      }
      setInterim(interimText)
    }

    recognition.onend = () => {
      if (!hasResult) {
        setListening(false)
        setInterim('')
        announce(t('home.voiceNoResults'), 'info')
        navigate('/beneficios')
      }
    }

    recognition.onerror = () => {
      setListening(false)
      setInterim('')
      announce(t('home.voiceNoResults'), 'error')
      navigate('/beneficios')
    }

    recognitionRef.current = recognition
    setFinalText('')
    setInterim('')
    setListening(true)
    recognition.start()
  }

  function handleVoice() {
    if (!SpeechRecognition) return
    if (listening) {
      stopListening(true)
    } else {
      startListening()
    }
  }

  const showOverlay = listening || finalText

  return (
    <>
      <form onSubmit={handleSubmit} role="search" className="w-full">
        <label htmlFor={inputId} className="sr-only">
          {t('home.searchLabel')}
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3">
          <button
            type="submit"
            aria-label={t('home.searchLabel')}
            className="shrink-0 text-fg-muted"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <input
            id={inputId}
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('home.searchPlaceholder')}
            className="min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-muted focus:outline-none"
          />
          {SpeechRecognition && (
            <button
              type="button"
              onClick={handleVoice}
              aria-label={listening ? 'Detener grabación' : 'Buscar por voz'}
              className={`shrink-0 ${listening ? 'text-primary animate-pulse' : 'text-fg-muted'}`}
            >
              {listening ? <Square className="h-5 w-5" aria-hidden="true" /> : <Mic className="h-5 w-5" aria-hidden="true" />}
            </button>
          )}
        </div>
      </form>

      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60"
          onClick={() => { stopListening(true); setFinalText('') }}
          role="dialog"
          aria-modal="true"
          aria-label="Escuchando"
        >
          <div className="relative flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex items-center justify-center">
              {listening && (
                <>
                  <span className="absolute h-28 w-28 animate-ping rounded-full bg-primary/30" />
                  <span className="absolute h-24 w-24 animate-pulse rounded-full bg-primary/20" />
                </>
              )}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-fg shadow-lg">
                <Mic className="h-9 w-9" aria-hidden="true" />
              </div>
            </div>

            {(interim || finalText) && (
              <p className="max-w-xs text-balance text-center text-lg font-medium text-white">
                {finalText || interim}
              </p>
            )}

            {listening && (
              <button
                type="button"
                onClick={() => { stopListening(true); setFinalText('') }}
                aria-label="Detener grabación"
                className="touch-target mt-4 rounded-full bg-white/20 px-8 py-2 text-sm font-semibold text-white backdrop-blur-sm"
              >
                Tocar para detener
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
