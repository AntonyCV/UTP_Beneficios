import { Star, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Deal } from '../lib/mockDiscounts'
import { PromoImage } from './PromoImage'

interface DiscountCardProps {
  deal: Deal
}

export function DiscountCard({ deal }: DiscountCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { announce } = useApp()
  const brand = t(`deals.${deal.i18nKey}.brand`)
  const description = t(`deals.${deal.i18nKey}.description`)
  const imageAlt = t(`deals.${deal.i18nKey}.imageAlt`)

  function handleClick() {
    if (deal.offerId) {
      navigate(`/descuento/${deal.offerId}`)
    } else {
      announce(t('home.comingSoon'), 'info')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left"
      aria-label={brand}
    >
      <PromoImage
  alt={imageAlt}
  icon={deal.icon}
  accent={deal.accent}
  imageUrl={deal.logoUrl}
  className="h-32 w-full"
/>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-bold text-fg">{brand}</h3>
        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-fg-muted">{description}</p>

        <p className="fm mt-1 flex items-center gap-1.5 font-bold text-danger">
          <Tag className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {deal.free
              ? t('home.discountFree')
              : `${t('home.discountUpTo', { amount: deal.discountAmount })} ${t('home.discountLabel')}`}
          </span>
        </p>

        <p
          className="mt-auto flex items-center gap-1 pt-1 text-sm text-fg-muted"
          aria-label={t('home.ratingLabel', {
            rating: deal.rating,
            reviews: deal.reviewCount.toLocaleString('es-PE'),
          })}
        >
          <Star className="h-4 w-4 fill-current text-accent" aria-hidden="true" />
          <span aria-hidden="true">{deal.rating.toFixed(1)}</span>
          <span aria-hidden="true">·</span>
          <span aria-hidden="true">{deal.reviewCount.toLocaleString('es-PE')}</span>
        </p>
      </div>
    </button>
  )
}