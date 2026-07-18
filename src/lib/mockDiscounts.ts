import {
  Dumbbell,
  Film,
  Flame,
  Laptop,
  Pizza,
  ShieldCheck,
  Smartphone,
  UtensilsCrossed,
} from 'lucide-react'
import type { ComponentType } from 'react'

export interface Deal {
  id: string
  i18nKey: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  accent: string
  logoUrl?: string
  offerId?: string
  discountAmount?: number
  free?: boolean
  rating: number
  reviewCount: number
}

export interface CategorySection {
  key: string
  titleKey: string
  deals: Deal[]
}

export interface BrandShortcut {
  id: string
  name: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  accent: string
  logoUrl?: string
}

export const BRAND_SHORTCUTS: BrandShortcut[] = [
  { id: 'entel', name: 'Entel', icon: Smartphone, accent: '#1256b8', logoUrl: '/img/Logos/entel.png' },
  { id: 'bembos', name: 'Bembos', icon: UtensilsCrossed, accent: '#241a8f', logoUrl: '/img/Logos/bembos.png' },
  { id: 'eset', name: 'Eset', icon: ShieldCheck, accent: '#0b8f6b', logoUrl: '/img/Logos/eset.png' },
  { id: 'icpna', name: 'Icpna', icon: Film, accent: '#8a8f99', logoUrl: '/img/Logos/icpna.png' },
  { id: 'kfc', name: 'KFC', icon: UtensilsCrossed, accent: '#b3400b', logoUrl: '/img/Logos/kfc.png' },
  { id: 'cineplanet', name: 'Cineplanet', icon: Film, accent: '#b8000f', logoUrl: '/img/Logos/cineplanet.png' },
  { id: 'smartfit', name: 'Smart Fit', icon: Dumbbell, accent: '#0b6b3a', logoUrl: '/img/Logos/smart-fit.png' },
  { id: 'oeschle', name: 'Oeschle', icon: Laptop, accent: '#5a616b', logoUrl: '/img/Logos/oechsle.png' },
  { id: 'pizzahut', name: 'Pizza Hut', icon: Pizza, accent: '#c0392b', logoUrl: '/img/Logos/pizzahut.png' },
  { id: 'rallykart', name: 'Rally Kart', icon: Flame, accent: '#b3400b', logoUrl: '/img/Logos/rallykart.png' },
]

export const DAILY_DEAL: Deal = {
  id: 'entelPhone',
  i18nKey: 'entelPhone',
  icon: Smartphone,
  accent: '#1256b8',
  discountAmount: 540,
  offerId: 'entel-equipo-540',
  logoUrl: '/img/promos/entel-promos.jpg',
  rating: 4.3,
  reviewCount: 56890,
}

const ENTEL_EQUIPO_300: Deal = {
  id: 'entelEquipo300',
  i18nKey: 'entelEquipo300',
  icon: Smartphone,
  accent: '#1256b8',
  discountAmount: 300,
  offerId: 'entel-equipo-300',
  logoUrl: '/img/promos/entel-promos.jpg',
  rating: 4.2,
  reviewCount: 42100,
}

const ESET_ANTIVIRUS: Deal = {
  id: 'esetAntivirus',
  i18nKey: 'esetAntivirus',
  icon: ShieldCheck,
  accent: '#0b8f6b',
  discountAmount: 40,
  offerId: 'eset-antivirus-1pc',
  logoUrl: '/img/promos/eset-promos.jpg',
  rating: 4.6,
  reviewCount: 12300,
}

const CINEPLANET_DOSX1: Deal = {
  id: 'cineplanetDosx1',
  i18nKey: 'cineplanetDosx1',
  icon: Film,
  accent: '#b8000f',
  discountAmount: 15,
  offerId: 'cineplanet-entrada-2x1',
  logoUrl: '/img/promos/cineplanet-promos.jpg',
  rating: 4.1,
  reviewCount: 32450,
}

const RALLYKART_3VUELTAS: Deal = {
  id: 'rallykart3vueltas',
  i18nKey: 'rallykart3vueltas',
  icon: Flame,
  accent: '#b3400b',
  discountAmount: 15,
  offerId: 'rallykart-3vueltas',
  logoUrl: '/img/promos/rallykart-promos.jpg',
  rating: 4.3,
  reviewCount: 21500,
}

const LATACONA_MENU: Deal = {
  id: 'lataconaMenu',
  i18nKey: 'lataconaMenu',
  icon: UtensilsCrossed,
  accent: '#7c3a1e',
  discountAmount: 7,
  offerId: 'latacona-menu-ejecutivo',
  logoUrl: '/img/promos/latacona-promos.jpg',
  rating: 4.0,
  reviewCount: 8900,
}

const BEMBOS_COMBO: Deal = {
  id: 'bembosCombo',
  i18nKey: 'bembosCombo',
  icon: UtensilsCrossed,
  accent: '#241a8f',
  offerId: 'bembos-combo',
  logoUrl: '/img/promos/bembos-promos.jpg',
  discountAmount: 20,
  rating: 4.5,
  reviewCount: 77200,
}

const SMARTFIT_ANUAL: Deal = {
  id: 'smartfitAnual',
  i18nKey: 'smartfitAnual',
  icon: Dumbbell,
  accent: '#0b6b3a',
  discountAmount: 200,
  offerId: 'smartfit-plan-anual',
  logoUrl: '/img/promos/smart-fit-promos.jpg',
  rating: 4.2,
  reviewCount: 18300,
}

const GMO_FOTOS: Deal = {
  id: 'gmoFotos',
  i18nKey: 'gmoFotos',
  icon: Smartphone,
  accent: '#2c3e50',
  discountAmount: 9,
  offerId: 'gmo-impresion-fotos',
  logoUrl: '/img/promos/gmo-promos.jpg',
  rating: 4.0,
  reviewCount: 6500,
}

const ICPNA_INGLES: Deal = {
  id: 'icpnaIngles',
  i18nKey: 'icpnaIngles',
  icon: Film,
  accent: '#4a5568',
  discountAmount: 40,
  offerId: 'icpna-ingles-matricula',
  logoUrl: '/img/promos/icpna-promos.jpg',
  rating: 4.3,
  reviewCount: 28900,
}

export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: 'tech',
    titleKey: 'tech',
    deals: [
      DAILY_DEAL,
      {
        id: 'oeschle',
        i18nKey: 'oeschle',
        icon: Laptop,
        accent: '#5a616b',
        offerId: 'oeschle-tecnologia-300',
        logoUrl: '/img/promos/oechsle-promos.jpg',
        discountAmount: 300,
        rating: 4.4,
        reviewCount: 344567,
      },
      ENTEL_EQUIPO_300,
      ESET_ANTIVIRUS,
    ],
  },
  {
    key: 'entertainment',
    titleKey: 'entertainment',
    deals: [
      {
        id: 'cineplanet',
        i18nKey: 'cineplanet',
        icon: Film,
        accent: '#b8000f',
        offerId: 'cineplanet-entradas-13',
        logoUrl: '/img/promos/cineplanet-promos.jpg',
        discountAmount: 13,
        rating: 4.3,
        reviewCount: 56890,
      },
      {
        id: 'rallykart',
        i18nKey: 'rallykart',
        icon: Flame,
        accent: '#b3400b',
        offerId: 'rallykart-descuento-50',
        logoUrl: '/img/promos/rallykart-promos.jpg',
        discountAmount: 50,
        rating: 4.4,
        reviewCount: 344567,
      },
      CINEPLANET_DOSX1,
      RALLYKART_3VUELTAS,
    ],
  },
  {
    key: 'food',
    titleKey: 'food',
    deals: [
      {
        id: 'kfc',
        i18nKey: 'kfc',
        icon: UtensilsCrossed,
        accent: '#b3400b',
        offerId: 'kfc-combo-completo',
        logoUrl: '/img/promos/kfc-promos.jpg',
        discountAmount: 15,
        rating: 4.5,
        reviewCount: 98211,
      },
      {
        id: 'pizzahut',
        i18nKey: 'pizzahut',
        icon: Pizza,
        accent: '#b8000f',
        offerId: 'pizzahut-combo-regular',
        logoUrl: '/img/promos/pizzahut-promos.jpg',
        discountAmount: 20,
        rating: 4.2,
        reviewCount: 65310,
      },
      BEMBOS_COMBO,
      LATACONA_MENU,
    ],
  },
  {
    key: 'salud',
    titleKey: 'salud',
    deals: [
      {
        id: 'smartfit',
        i18nKey: 'smartfit',
        icon: Dumbbell,
        accent: '#0b6b3a',
        offerId: 'smartfit-matricula-gratis',
        logoUrl: '/img/promos/smart-fit-promos.jpg',
        free: true,
        rating: 4.4,
        reviewCount: 344567,
      },
      SMARTFIT_ANUAL,
      ICPNA_INGLES,
      GMO_FOTOS,
    ],
  },
]

export interface PromoSlide {
  id: string
  dealId: string
  accent: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  imageUrl?: string
  offerId?: string
}

export const PROMO_SLIDES: PromoSlide[] = [
  { id: 'entel-promo', dealId: 'entelPhone', accent: '#1256b8', icon: Smartphone, imageUrl: '/img/slides/entel.jpg', offerId: 'entel-equipo-540' },
  { id: 'bembos-promo', dealId: 'bembosCombo', accent: '#241a8f', icon: UtensilsCrossed, imageUrl: '/img/slides/bembos.jpg', offerId: 'bembos-combo' },
  { id: 'latacona-promo', dealId: 'latacona', accent: '#7c3a1e', icon: UtensilsCrossed, imageUrl: '/img/slides/latacona.jpg', offerId: 'latacona-menu-ejecutivo' },
]
