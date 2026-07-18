import type { ComponentType } from 'react'

interface PromoImageProps {
  /** Texto alternativo descriptivo (WCAG 1.1.1). La imagen es informativa: describe la promoción real. */
  alt: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  accent: string
  imageUrl?: string
  className?: string
}

/**
 * Imagen promocional. Si la marca tiene una foto real (imageUrl), se muestra esa;
 * si no, cae en el placeholder con degradado de marca + ícono.
 */
export function PromoImage({ alt, icon: Icon, accent, imageUrl, className = '' }: PromoImageProps) {
  if (imageUrl) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={imageUrl} alt={alt} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
      }}
    >
      <Icon className="h-10 w-10 text-white/90" aria-hidden="true" />
    </div>
  )
}
