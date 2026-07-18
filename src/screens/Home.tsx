import { Filter, SlidersHorizontal, User } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BrandShortcuts } from '../components/BrandShortcuts'
import { CategorySection } from '../components/CategorySection'
import { DailyDealBanner } from '../components/DailyDealBanner'
import { FilterChip } from '../components/FilterChip'
import { HeaderMenu } from '../components/HeaderMenu'
import type { FilterItem } from '../components/ListFilterModal'
import { ListFilterModal } from '../components/ListFilterModal'
import { PromoCarousel } from '../components/PromoCarousel'
import { SearchBar } from '../components/SearchBar'
import { Switch } from '../components/Switch'
import { UtpLogo } from '../components/UtpLogo'
import { useApp } from '../context/AppContext'
import { CATEGORY_SECTIONS } from '../lib/mockDiscounts'

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

const CATEGORY_ITEMS: FilterItem[] = [
  { id: 'principales',       labelKey: 'categoryFilter.principales'       },
  { id: 'alimentos',         labelKey: 'categoryFilter.alimentos'         },
  { id: 'modaEstilo',        labelKey: 'categoryFilter.modaEstilo'        },
  { id: 'entretenimiento',   labelKey: 'categoryFilter.entretenimiento'   },
  { id: 'educacionIdiomas',  labelKey: 'categoryFilter.educacionIdiomas'  },
  { id: 'tecnologia',        labelKey: 'categoryFilter.tecnologia'        },
  { id: 'tiendasViajes',     labelKey: 'categoryFilter.tiendasViajes'     },
  { id: 'saludDeporte',      labelKey: 'categoryFilter.saludDeporte'      },
]

export function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme, toggleTheme, announce } = useApp()

  const [cityModalOpen, setCityModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set())
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())

  function handleCityApply(selected: Set<string>) {
    setSelectedCities(selected)
    announce(t('cityFilter.applied'), 'info')
    if (selected.size > 0) {
      navigate(`/beneficios?city=${encodeURIComponent([...selected].join(','))}`)
    } else {
      navigate('/beneficios')
    }
  }

  function handleCategoryApply(selected: Set<string>) {
    setSelectedCategories(selected)
    announce(t('categoryFilter.applied'), 'info')
    if (selected.size > 0) {
      navigate(`/beneficios?category=${encodeURIComponent([...selected].join(','))}`)
    } else {
      navigate('/beneficios')
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex-1 flex-col px-5">
      <header className="flex items-center gap-3 py-4">
        <div className="lg:hidden"><HeaderMenu /></div>
        <UtpLogo alt={t('login.logoAlt')} className="h-8 w-auto" />
        <h1 className="flex-1 truncate text-lg font-extrabold text-brand">{t('home.headerTitle')}</h1>
        <button
          type="button"
          onClick={() => navigate('/perfil')}
          aria-label={t('home.avatarAlt')}
          className="touch-target inline-flex items-center justify-center rounded-full"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-strong text-fg">
            <User className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      </header>

      <div className="flex flex-col gap-5">
        <SearchBar />

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-danger">{t('home.exploreTitle')}</h2>
          <label className="flex items-center gap-2 text-sm font-medium text-fg">
            {t('home.darkModeLabel')}
            <Switch checked={theme === 'dark'} onChange={toggleTheme} label={t('home.darkModeLabel')} />
          </label>
        </div>

        <div className="fm -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FilterChip
            icon={SlidersHorizontal}
            label={t('home.filterCity')}
            onClick={() => setCityModalOpen(true)}
            active={selectedCities.size > 0}
          />
          <FilterChip
            icon={Filter}
            label={t('home.filterCategory')}
            onClick={() => setCategoryModalOpen(true)}
            active={selectedCategories.size > 0}
          />
        </div>

        <BrandShortcuts />

        <PromoCarousel />

        <DailyDealBanner onViewAll={() => navigate('/beneficios')} />

        {CATEGORY_SECTIONS.map((section) => (
          <CategorySection key={section.key} section={section} />
        ))}
      </div>

      <ListFilterModal
        open={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
        onApply={handleCityApply}
        title={t('cityFilter.title')}
        applyLabel={t('cityFilter.apply')}
        items={CITY_ITEMS}
        allKey="cityFilter.all"
        initialSelected={selectedCities}
      />

      <ListFilterModal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onApply={handleCategoryApply}
        title={t('categoryFilter.title')}
        applyLabel={t('categoryFilter.apply')}
        items={CATEGORY_ITEMS}
        allKey="categoryFilter.all"
        initialSelected={selectedCategories}
      />
    </main>
  )
}
