import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface MapBrand {
  id: string
  name: string
  lat: number
  lng: number
  category: string
}

const MAP_BRANDS: MapBrand[] = [
  { id: 'bembos', name: 'Bembos', lat: -12.0464, lng: -77.0428, category: 'alimentos' },
  { id: 'entel', name: 'Entel', lat: -12.0621, lng: -77.0365, category: 'tecnologia' },
  { id: 'eset', name: 'Eset', lat: -12.0673, lng: -77.0337, category: 'tecnologia' },
  { id: 'icpna', name: 'ICPNA', lat: -12.1064, lng: -77.0300, category: 'educacionIdiomas' },
  { id: 'latacona', name: 'La Tacona', lat: -12.0432, lng: -77.0521, category: 'alimentos' },
  { id: 'kfc', name: 'KFC', lat: -12.0464, lng: -77.0428, category: 'alimentos' },
  { id: 'smartfit', name: 'Smart Fit', lat: -12.0432, lng: -77.0521, category: 'saludDeporte' },
  { id: 'oeschle', name: 'Oeschle', lat: -12.0464, lng: -77.0428, category: 'modaEstilo' },
  { id: 'gmo', name: 'GMO', lat: -12.0673, lng: -77.0337, category: 'tecnologia' },
  { id: 'cineplanet', name: 'Cineplanet', lat: -12.0621, lng: -77.0365, category: 'entretenimiento' },
  { id: 'pizzahut', name: 'Pizza Hut', lat: -12.0621, lng: -77.0365, category: 'alimentos' },
  { id: 'rallykart', name: 'Rally Kart', lat: -12.0432, lng: -77.0521, category: 'entretenimiento' },
]

export function MapScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [-12.0621, -77.0365],
        zoom: 13,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      MAP_BRANDS.forEach((brand) => {
        const marker = L.marker([brand.lat, brand.lng])
          .addTo(map)
          .bindPopup(`<strong>${brand.name}</strong>`)
        marker.on('click', () => navigate(`/marca/${brand.id}`))
      })

      mapInstanceRef.current = map
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [navigate])

  return (
    <main className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t('placeholder.back')}
          className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-fg">{t('nav.map')}</h1>
        <div className="h-10 w-10" aria-hidden="true" />
      </header>
      <div ref={mapRef} className="flex-1" />
    </main>
  )
}
