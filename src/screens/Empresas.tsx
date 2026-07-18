import { ArrowUpDown, Filter, Search, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { FilterItem } from '../components/ListFilterModal'
import { ListFilterModal } from '../components/ListFilterModal'
import { useApp } from '../context/AppContext'
import { BRANDS } from '../lib/mockBrands'

interface GridBrand {
  id: string
  name: string
  accent: string
  logoUrl?: string
  hasDetail: boolean
  category: string
  isNew: boolean
  cities: string[]
}

const GRID_BRANDS: GridBrand[] = [
  { id: 'bembos', name: 'Bembos', accent: '#241a8f', logoUrl: '/img/Logos/bembos.png', hasDetail: true, category: 'alimentos', isNew: false, cities: ['lima', 'trujillo', 'arequipa'] },
  { id: 'entel', name: 'Entel', accent: '#1256b8', logoUrl: '/img/Logos/entel.png', hasDetail: false, category: 'tecnologia', isNew: false, cities: ['lima', 'arequipa', 'trujillo', 'chiclayo'] },
  { id: 'eset', name: 'Eset', accent: '#0b8f6b', logoUrl: '/img/Logos/eset.png', hasDetail: false, category: 'tecnologia', isNew: true, cities: ['lima'] },
  { id: 'icpna', name: 'ICPNA', accent: '#4a5568', logoUrl: '/img/Logos/icpna.png', hasDetail: false, category: 'educacionIdiomas', isNew: false, cities: ['lima', 'arequipa', 'trujillo'] },
  { id: 'latacona', name: 'La Tacona', accent: '#7c3a1e', logoUrl: '/img/Logos/latacona.png',hasDetail: false, category: 'alimentos', isNew: false, cities: ['lima'] },
  { id: 'kfc', name: 'KFC', accent: '#b3400b', logoUrl: '/img/Logos/kfc.png', hasDetail: false, category: 'alimentos', isNew: false, cities: ['lima', 'arequipa', 'trujillo', 'chiclayo'] },
  { id: 'smartfit', name: 'Smart Fit', accent: '#0b6b3a', logoUrl: '/img/Logos/smart-fit.png', hasDetail: false, category: 'saludDeporte', isNew: true, cities: ['lima', 'arequipa', 'trujillo'] },
  { id: 'oeschle', name: 'Oeschle', accent: '#b8000f', logoUrl: '/img/Logos/oechsle.png', hasDetail: false, category: 'modaEstilo', isNew: false, cities: ['lima', 'arequipa'] },
  { id: 'gmo', name: 'GMO', accent: '#2c3e50', logoUrl: '/img/Logos/gmo.png', hasDetail: false, category: 'tecnologia', isNew: true, cities: ['lima'] },
  { id: 'cineplanet', name: 'Cineplanet', accent: '#b8000f', logoUrl: '/img/Logos/cineplanet.png', hasDetail: false, category: 'entretenimiento', isNew: false, cities: ['lima', 'arequipa', 'trujillo'] },
  { id: 'pizzahut', name: 'Pizza Hut', accent: '#c0392b', logoUrl: '/img/Logos/pizzahut.png',hasDetail: false, category: 'alimentos', isNew: false, cities: ['lima', 'arequipa'] },
  { id: 'rallykart', name: 'Rally Kart', accent: '#b3400b', logoUrl: '/img/Logos/rallykart.png',hasDetail: false, category: 'entretenimiento', isNew: true, cities: ['lima'] },
]

const CATEGORIES: FilterItem[] = [
  { id: 'principales', labelKey: 'categoryFilter.principales' },
  { id: 'alimentos', labelKey: 'categoryFilter.alimentos' },
  { id: 'entretenimiento', labelKey: 'categoryFilter.entretenimiento' },
  { id: 'educacionIdiomas', labelKey: 'categoryFilter.educacionIdiomas' },
  { id: 'tecnologia', labelKey: 'categoryFilter.tecnologia' },
  { id: 'modaEstilo', labelKey: 'categoryFilter.modaEstilo' },
  { id: 'tiendasViajes', labelKey: 'categoryFilter.tiendasViajes' },
  { id: 'saludDeporte', labelKey: 'categoryFilter.saludDeporte' },
]

const CITY_ITEMS: FilterItem[] = [
  { id: 'chimbote',  labelKey: 'cityFilter.chimbote'  },
  { id: 'arequipa',  labelKey: 'cityFilter.arequipa'  },
  { id: 'ica',       labelKey: 'cityFilter.ica'       },
  { id: 'huancayo',  labelKey: 'cityFilter.huancayo'  },
  { id: 'trujillo',  labelKey: 'cityFilter.trujillo'  },
  { id: 'chiclayo',  labelKey: 'cityFilter.chiclayo'  },
  { id: 'lima',      labelKey: 'cityFilter.lima'      },
  { id: 'iquitos',   labelKey: 'cityFilter.iquitos'   },
  { id: 'piura',     labelKey: 'cityFilter.piura'     },
  { id: 'tacna',     labelKey: 'cityFilter.tacna'     },
  { id: 'pucallpa',  labelKey: 'cityFilter.pucallpa'  },
]

function parseParam(searchParams: URLSearchParams, key: string): Set<string> {
  const raw = searchParams.get(key)
  if (!raw) return new Set()
  return new Set(raw.split(',').filter(Boolean))
}

export function Empresas() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { announce } = useApp()

  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => parseParam(searchParams, 'category'))
  const [selectedCities, setSelectedCities] = useState<Set<string>>(() => parseParam(searchParams, 'city'))
  const [showNew, setShowNew] = useState(false)
  const [sortAZ, setSortAZ] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [cityModalOpen, setCityModalOpen] = useState(false)

  useEffect(() => {
    setSelectedCategories(parseParam(searchParams, 'category'))
    setSelectedCities(parseParam(searchParams, 'city'))
  }, [searchParams])

  function setFilterParams(key: string, values: Set<string>) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (values.size > 0) {
        next.set(key, [...values].join(','))
      } else {
        next.delete(key)
      }
      return next
    }, { replace: true })
  }

  function handleCategoryModalApply(selected: Set<string>) {
    setSelectedCategories(selected)
    setFilterParams('category', selected)
    if (selected.size > 0) {
      announce(t('categoryFilter.applied'), 'info')
    }
  }

  function handleCityModalApply(selected: Set<string>) {
    setSelectedCities(selected)
    setFilterParams('city', selected)
    if (selected.size > 0) {
      announce(t('cityFilter.applied'), 'info')
    }
  }

  const categoryShowAll = selectedCategories.size === 0
  const cityShowAll = selectedCities.size === 0

  const filtered = GRID_BRANDS
    .filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    .filter((b) => categoryShowAll || selectedCategories.has(b.category))
    .filter((b) => cityShowAll || b.cities.some((ct) => selectedCities.has(ct)))
    .filter((b) => !showNew || b.isNew)
    .sort((a, b) => sortAZ ? a.name.localeCompare(b.name) : 0)

  function handleBrandClick(brand: GridBrand) {
    if (brand.hasDetail || BRANDS[brand.id]) {
      navigate(`/marca/${brand.id}`)
    } else {
      announce(t('home.comingSoon'), 'info')
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col bg-canvas">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label={t('placeholder.back')}
          className="touch-target inline-flex items-center justify-center rounded-lg text-fg"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-fg">{t('empresas.title')}</h1>
        <div className="h-10 w-10" aria-hidden="true" />
      </header>

      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* Search + count */}
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-fg-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearchParams(e.target.value ? { q: e.target.value } : {}, { replace: true }) }}
              placeholder={t('home.searchPlaceholder')}
              aria-label={t('home.searchLabel')}
              className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-muted focus:outline-none"
            />
          </div>
          <span className="shrink-0 text-base font-bold text-fg">
            {filtered.length} {t('empresas.results')}
          </span>
        </div>

        {/* Sort/filter row */}
        <div className="flex items-center justify-end">
          <div className="fm flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              aria-pressed={showNew}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${showNew ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-surface text-fg'}`}
            >
              {t('empresas.sortNew')}
              <Sparkles className="h-3 w-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCityModalOpen(true)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${!cityShowAll ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-surface text-fg'}`}
            >
              {t('cityFilter.button')}
              <Filter className="h-3 w-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCategoryModalOpen(true)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${!categoryShowAll ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-surface text-fg'}`}
            >
              {t('categoryFilter.button')}
              <Filter className="h-3 w-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setSortAZ((p) => !p)}
              aria-pressed={sortAZ}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${sortAZ ? 'border-primary bg-primary/10 text-primary' : 'border-line bg-surface text-fg'
                }`}
            >
              {t('empresas.sortAZ')}
              <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Brand grid */}
        <ul
          className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          role="list"
          aria-label={t('empresas.brandsGrid')}
        >
          {filtered.map((brand) => (
            <li key={brand.id}>
              <button
                type="button"
                onClick={() => handleBrandClick(brand)}
                className="flex w-full flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-3 transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={brand.name}
              >
                <div
                  className="flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-white"
                  style={{ backgroundColor: brand.logoUrl ? undefined : brand.accent }}
                >
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-3xl font-black text-white" aria-hidden="true">
                      {brand.name.slice(0, 1)}
                    </span>
                  )}
                </div>
                <span className="fm w-full truncate text-center text-xs font-semibold text-fg">
                  {brand.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ListFilterModal
        open={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
        onApply={handleCityModalApply}
        title={t('cityFilter.title')}
        applyLabel={t('cityFilter.apply')}
        items={CITY_ITEMS}
        allKey="cityFilter.all"
        initialSelected={selectedCities}
      />

      <ListFilterModal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onApply={handleCategoryModalApply}
        title={t('categoryFilter.title')}
        applyLabel={t('categoryFilter.apply')}
        items={CATEGORIES}
        allKey="categoryFilter.all"
        initialSelected={selectedCategories}
      />
    </main>
  )
}
