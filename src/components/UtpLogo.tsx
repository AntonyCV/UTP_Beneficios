interface UtpLogoProps {
  /** Texto alternativo accesible. Si es decorativo, pasar alt="" explícito (WCAG 1.1.1). */
  alt: string
  className?: string
  /** true para la variante monocromática sobre fondo rojo (onboarding). */
  onBrand?: boolean
}

/**
 * Recreación en SVG del logotipo "Beneficios UTP" (grilla 2x2 U · destello · T · P
 * + banderín BENEFICIOS). Es contenido no textual: lleva role="img" + aria-label
 * para lectores de pantalla (WCAG 1.1.1). Escala sin pixelarse en cualquier tema.
 */
export function UtpLogo({ alt, className, onBrand = false }: UtpLogoProps) {
  const red = onBrand ? '#ffffff' : '#e30613'
  const black = onBrand ? '#000000' : '#111111'
  const tile = onBrand ? '#e30613' : '#ffffff' // fondo del cuadro del destello
  const glyphOnRed = onBrand ? '#e30613' : '#ffffff'
  const glyphOnBlack = '#ffffff'

  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cuadro U (rojo) */}
      <rect x="55" y="15" width="43" height="43" rx="2" fill={red} />
      <text
        x="76.5"
        y="47"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill={glyphOnRed}
      >
        U
      </text>

      {/* Cuadro destello (asteriscos/cruces) */}
      <rect x="102" y="15" width="43" height="43" rx="2" fill={tile} />
      <g fill={onBrand ? '#e30613' : '#111111'}>
        <text x="116" y="35" fontFamily="Arial" fontWeight="900" fontSize="18">+</text>
        <text x="127" y="30" fontFamily="Arial" fontWeight="900" fontSize="14">+</text>
        <text x="124" y="48" fontFamily="Arial" fontWeight="900" fontSize="20" fill={red}>+</text>
      </g>

      {/* Cuadro T (negro) */}
      <rect x="55" y="62" width="43" height="43" rx="2" fill={black} />
      <text
        x="76.5"
        y="94"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill={glyphOnBlack}
      >
        T
      </text>

      {/* Cuadro P (rojo) */}
      <rect x="102" y="62" width="43" height="43" rx="2" fill={red} />
      <text
        x="123.5"
        y="94"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill={glyphOnRed}
      >
        P
      </text>

      {/* Banderín BENEFICIOS */}
      <polygon points="48,114 155,114 150,134 43,134" fill={black} />
      <text
        x="99"
        y="129"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="15"
        letterSpacing="1"
        fill="#ffffff"
      >
        BENEFICIOS
      </text>
    </svg>
  )
}
