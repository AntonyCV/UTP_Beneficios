import { useEffect, useRef } from 'react'

const THROTTLE = 200

function isReadable(el: Element): boolean {
  const tag = el.tagName.toLowerCase()
  if (['script', 'style', 'noscript', 'template', 'svg', 'path', 'g', 'defs'].includes(tag)) return false
  if (el.closest('[aria-hidden]')) return false
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'a', 'button', 'label', 'th', 'td'].includes(tag)) return true
  if (tag === 'img') return el.hasAttribute('alt') && el.getAttribute('alt') !== ''
  const role = el.getAttribute('role')
  if (role === 'img' || role === 'button' || role === 'link' || role === 'tab' || role === 'menuitem') return true
  const text = (el.textContent || '').trim()
  if (!text || text.length > 120 || text.includes('\n')) return false
  return true
}

function findReadable(el: Element): Element | null {
  if (isReadable(el)) return el
  if (!el.parentElement || el.parentElement === document.body || el.parentElement === document.documentElement) return null
  return findReadable(el.parentElement)
}

function getElementText(el: Element): string {
  const role = el.getAttribute('role')
  if (role === 'img') return el.getAttribute('aria-label') || ''
  if (el.tagName === 'IMG') {
    const alt = el.getAttribute('alt')
    if (alt) return alt
  }
  const label = el.getAttribute('aria-label')
  if (label) return label
  return (el.textContent || '').trim()
}

export function useReadMode(
  active: boolean,
  speak: (text: string) => void,
  stop: () => void,
) {
  const lastTs = useRef(0)
  const speakRef = useRef(speak)
  const stopRef = useRef(stop)
  speakRef.current = speak
  stopRef.current = stop

  useEffect(() => {
    if (!active) return

    function onOver(e: Event) {
      if (e.type === 'mouseover') {
        const now = Date.now()
        if (now - lastTs.current < THROTTLE) return
      }
      const el = e.target as Element
      if (el.closest('[data-read-toggle]')) return
      const readable = findReadable(el)
      if (!readable) return
      const text = getElementText(readable)
      if (text) {
        stopRef.current()
        speakRef.current(text)
        lastTs.current = Date.now()
      }
    }

    document.addEventListener('mouseover', onOver, true)
    document.addEventListener('touchstart', onOver, { capture: true, passive: true })

    return () => {
      document.removeEventListener('mouseover', onOver, true)
      document.removeEventListener('touchstart', onOver, { capture: true } as any)
      stopRef.current()
    }
  }, [active])
}
