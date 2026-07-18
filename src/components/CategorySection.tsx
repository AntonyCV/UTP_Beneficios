import { useTranslation } from 'react-i18next'
import type { CategorySection as CategorySectionData } from '../lib/mockDiscounts'
import { DiscountCard } from './DiscountCard'
import { HorizontalScroller } from './HorizontalScroller'

interface CategorySectionProps {
  section: CategorySectionData
}

export function CategorySection({ section }: CategorySectionProps) {
  const { t } = useTranslation()
  const title = t(`categories.${section.titleKey}`)

  return (
    <section aria-labelledby={`section-${section.key}`} className="flex flex-col gap-3">
      <h2 id={`section-${section.key}`} className="text-lg font-bold text-danger">
        {title}
      </h2>
      <HorizontalScroller label={t('home.sectionScrollLabel', { section: title })}>
        {section.deals.map((deal) => (
          <DiscountCard key={deal.id} deal={deal} />
        ))}
      </HorizontalScroller>
    </section>
  )
}
