import { useCallback, useRef, useState } from 'react'

const SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, lang = 'es-PE') => {
    if (!SUPPORTED) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.92
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }, [])

  const stop = useCallback(() => {
    if (!SUPPORTED) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  return { supported: SUPPORTED, speaking, speak, stop }
}
