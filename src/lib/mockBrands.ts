export interface BrandOffer {
  id: string
  brandId: string
  title: string
  price: number
  originalPrice: number
  discountPercent: number
  description: string
  imageUrl?: string
  imageAlt: string
  couponCode: string
  /** Si está definido, muestra "Oferta acaba en X días" */
  expiresInDays?: number
}

export interface BrandLocation {
  name: string
  address: string
  city: string
}

export interface BrandInfo {
  id: string
  name: string
  accent: string
  logoUrl?: string
  /** Título de categoría que aparece en el header del detalle de oferta */
  categoryTitle: string
  location: string
  offers: BrandOffer[]
  locations: BrandLocation[]
  detailsTerms: string[]
}

export const BRANDS: Record<string, BrandInfo> = {
  bembos: {
    id: 'bembos',
    name: 'Bembos',
    accent: '#241a8f',
    logoUrl: '/img/Logos/bembos.png',
    categoryTitle: 'Descuentos en comidas',
    location: 'Lima - Los Olivos\nCerca de UTP Lima Norte',
    offers: [
      {
        id: 'bembos-combo',
        brandId: 'bembos',
        title: 'Cheese regular + papas regulares + 1 gaseosa',
        price: 21.90,
        originalPrice: 43.50,
        discountPercent: 46,
        description: 'Aprovecha esta promoción presencial o por delivery mostrando tu código de la app UTP',
        imageUrl: '/img/promos/bembos-promos.jpg',
        imageAlt: 'Combo Bembos Parrillera y Extremo con papas y Inca Kola',
        couponCode: 'UTPBB26',
      },
      {
        id: 'bembos-queso-tocino',
        brandId: 'bembos',
        title: '1 Queso Tocino + 1 Papa regular',
        price: 12.90,
        originalPrice: 22.80,
        discountPercent: 43,
        description: 'Hamburguesa Queso Tocino más una papa regular a precio especial para estudiantes UTP',
        imageUrl: '/img/promos/bembos-promos.jpg',
        imageAlt: 'Hamburguesa Bembos Queso Tocino con papa regular',
        couponCode: 'UTPBB27',
        expiresInDays: 2,
      },
    ],
    locations: [
      { name: 'Real Plaza', address: 'Avenida Alfredo Mendiola 7042', city: 'San Martín de Porres, Lima.' },
      { name: 'Mega Plaza', address: 'Avenida Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'CC Jockey Plaza', address: 'Av. Javier Prado Este 4200', city: 'Surco, Lima.' },
      { name: 'La Rambla San Miguel', address: 'Av. La Marina 2000', city: 'San Miguel, Lima.' },
    ],
    detailsTerms: [
      'Válido para canje presencial y pedidos por delivery.',
      'Es necesario presentar el código de la app UTP.',
      'Locales disponibles a nivel nacional.',
    ],
  },

  entel: {
    id: 'entel',
    name: 'Entel',
    accent: '#0057B8',
    logoUrl: '/img/Logos/entel.png',
    categoryTitle: 'Descuentos en tecnología y telefonía',
    location: 'Lima\nBeneficio disponible en tiendas Entel seleccionadas',
    offers: [
      {
        id: 'entel-equipo-540',
        brandId: 'entel',
        title: 'Hasta S/. 540 de descuento en equipos seleccionados',
        price: 1460.00,
        originalPrice: 2000.00,
        discountPercent: 27,
        description: 'Válido solo en equipos mostrados en los detalles del producto.',
        imageUrl: '/img/promos/entel-promos.jpg',
        imageAlt: 'Smartphones Entel con hasta S/. 540 de descuento',
        couponCode: 'UTP540',
      },
      {
        id: 'entel-equipo-300',
        brandId: 'entel',
        title: 'Hasta S/. 300 de descuento en equipos seleccionados',
        price: 1200.00,
        originalPrice: 1500.00,
        discountPercent: 20,
        description: 'Aplica en modelos seleccionados y sujeto a disponibilidad.',
        imageUrl: '/img/promos/entel-promos.jpg',
        imageAlt: 'Celulares Entel con hasta S/. 300 de descuento',
        couponCode: 'UTP300',
        expiresInDays: 15,
      },
      {
        id: 'entel-plan-power',
        brandId: 'entel',
        title: '20% de descuento en Plan Power 99.90',
        price: 79.92,
        originalPrice: 99.90,
        discountPercent: 20,
        description: 'Obtén un 20% de descuento en tu Plan Power 99.90 durante la vigencia de la promoción.',
        imageUrl: '/img/promos/entel-promos.jpg',
        imageAlt: 'Plan Power Entel',
        couponCode: 'UTPPOWER20',
      },
      {
        id: 'entel-accesorios',
        brandId: 'entel',
        title: '15% de descuento en accesorios seleccionados',
        price: 85.00,
        originalPrice: 100.00,
        discountPercent: 15,
        description: 'Descuento válido para audífonos, cargadores, parlantes y otros accesorios participantes.',
        imageUrl: '/img/promos/entel-promos.jpg',
        imageAlt: 'Accesorios Entel',
        couponCode: 'UTPACC15',
        expiresInDays: 7,
      },
    ],
    locations: [
      { name: 'Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'Plaza Norte', address: 'Av. Tomás Valle', city: 'Independencia, Lima.' },
      { name: 'Jockey Plaza', address: 'Av. Javier Prado Este 4200', city: 'Surco, Lima.' },
      { name: 'Mall del Sur', address: 'Av. Los Lirios', city: 'San Juan de Miraflores, Lima.' },
    ],
    detailsTerms: [
      'Promoción válida para estudiantes UTP con documento vigente.',
      'Sujeto a evaluación crediticia de Entel.',
      'No acumulable con otras promociones.',
      'Beneficio disponible en tiendas participantes.',
    ],
  },

  eset: {
    id: 'eset',
    name: 'Eset',
    accent: '#0b8f6b',
    logoUrl: '/img/Logos/eset.png',
    categoryTitle: 'Descuentos en seguridad digital',
    location: 'Lima\nBeneficio disponible en compra online',
    offers: [
      {
        id: 'eset-antivirus-1pc',
        brandId: 'eset',
        title: 'ESET Internet Security 1 equipo x 1 año',
        price: 49.90,
        originalPrice: 89.90,
        discountPercent: 44,
        description: 'Licencia digital para 1 equipo, entrega inmediata por correo tras la compra.',
        imageUrl: '/img/promos/eset-promos.jpg',
        imageAlt: 'Licencia ESET Internet Security para 1 equipo',
        couponCode: 'UTPESET44',
      },
      {
        id: 'eset-antivirus-3pc',
        brandId: 'eset',
        title: 'ESET Internet Security 3 equipos x 1 año',
        price: 79.90,
        originalPrice: 139.90,
        discountPercent: 43,
        description: 'Protege hasta 3 dispositivos con una sola licencia digital.',
        imageUrl: '/img/promos/eset-promos.jpg',
        imageAlt: 'Licencia ESET Internet Security para 3 equipos',
        couponCode: 'UTPESET43',
        expiresInDays: 10,
      },
    ],
    locations: [
      { name: 'Tienda online ESET Perú', address: 'Compra 100% digital', city: 'Disponible a nivel nacional.' },
    ],
    detailsTerms: [
      'Promoción válida solo para compras a través de la tienda online oficial.',
      'La licencia se entrega por correo electrónico tras confirmar el pago.',
      'No acumulable con otras promociones.',
    ],
  },

  icpna: {
    id: 'icpna',
    name: 'ICPNA',
    accent: '#4a5568',
    logoUrl: '/img/Logos/icpna.png',
    categoryTitle: 'Descuentos en cursos de idiomas',
    location: 'Lima\nSedes ICPNA a nivel nacional',
    offers: [
      {
        id: 'icpna-ingles-matricula',
        brandId: 'icpna',
        title: '20% de descuento en matrícula de inglés',
        price: 159.20,
        originalPrice: 199.00,
        discountPercent: 20,
        description: 'Válido para nuevos ciclos de inglés general, presencial u online.',
        imageUrl: '/img/promos/icpna-promos.jpg',
        imageAlt: 'Curso de inglés ICPNA con descuento en matrícula',
        couponCode: 'UTPICPNA20',
      },
      {
        id: 'icpna-idiomas-adicional',
        brandId: 'icpna',
        title: '15% de descuento en otros idiomas',
        price: 169.15,
        originalPrice: 199.00,
        discountPercent: 15,
        description: 'Aplica en cursos de portugués, italiano y otros idiomas disponibles.',
        imageUrl: '/img/promos/icpna-promos.jpg',
        imageAlt: 'Cursos de idiomas adicionales ICPNA',
        couponCode: 'UTPICPNA15',
        expiresInDays: 20,
      },
    ],
    locations: [
      { name: 'ICPNA Miraflores', address: 'Av. Angamos Oeste 160', city: 'Miraflores, Lima.' },
      { name: 'ICPNA Los Olivos', address: 'Av. Carlos Izaguirre', city: 'Los Olivos, Lima.' },
    ],
    detailsTerms: [
      'Beneficio válido para estudiantes UTP con carné vigente.',
      'No aplica para renovaciones de ciclo.',
      'Cupos sujetos a disponibilidad por sede.',
    ],
  },

  latacona: {
    id: 'latacona',
    name: 'La Tacona',
    accent: '#7c3a1e',
    logoUrl: '/img/Logos/latacona.png',
    categoryTitle: 'Descuentos en comidas',
    location: 'Lima\nCerca de UTP Lima Norte',
    offers: [
      {
        id: 'latacona-menu-ejecutivo',
        brandId: 'latacona',
        title: 'Menú ejecutivo + bebida',
        price: 14.90,
        originalPrice: 22.00,
        discountPercent: 32,
        description: 'Incluye entrada, plato de fondo y bebida. Válido de lunes a viernes.',
        imageUrl: '/img/promos/latacona-promos.jpg',
        imageAlt: 'Menú ejecutivo La Tacona con bebida',
        couponCode: 'UTPLTC32',
      },
      {
        id: 'latacona-parrilla-2p',
        brandId: 'latacona',
        title: 'Parrilla para 2 personas',
        price: 39.90,
        originalPrice: 59.00,
        discountPercent: 32,
        description: 'Parrilla completa para compartir, ideal para ir con un compañero de clase.',
        imageUrl: '/img/promos/latacona-promos.jpg',
        imageAlt: 'Parrilla para dos personas en La Tacona',
        couponCode: 'UTPLTC33',
        expiresInDays: 5,
      },
    ],
    locations: [
      { name: 'La Tacona Los Olivos', address: 'Av. Carlos Izaguirre 233', city: 'Los Olivos, Lima.' },
    ],
    detailsTerms: [
      'Válido para consumo en local presentando el código UTP.',
      'No incluye bebidas alcohólicas.',
      'Horario válido: lunes a viernes de 12 m. a 4 p.m.',
    ],
  },

  kfc: {
    id: 'kfc',
    name: 'KFC',
    accent: '#b3400b',
    logoUrl: '/img/Logos/kfc.png',
    categoryTitle: 'Descuentos en comidas',
    location: 'Lima\nLocales KFC a nivel nacional',
    offers: [
      {
        id: 'kfc-balde-familiar',
        brandId: 'kfc',
        title: 'Balde familiar 12 piezas + papas + gaseosa 1.5L',
        price: 59.90,
        originalPrice: 79.90,
        discountPercent: 25,
        description: 'Ideal para compartir en grupo, válido para delivery y recojo en tienda.',
        imageUrl: '/img/promos/kfc-promos.jpg',
        imageAlt: 'Balde familiar KFC de 12 piezas con papas y gaseosa',
        couponCode: 'UTPKFC25',
      },
      {
        id: 'kfc-combo-completo',
        brandId: 'kfc',
        title: 'Hasta S/. 15 de descuento en combo completo',
        price: 30.00,
        originalPrice: 45.00,
        discountPercent: 33,
        description: 'Combo completo con presas de pollo y acompañamientos.',
        imageUrl: '/img/promos/kfc-promos.jpg',
        imageAlt: 'Combo completo KFC con presas de pollo y acompañamientos',
        couponCode: 'UTPKFC15B',
      },
      {
        id: 'kfc-combo-personal',
        brandId: 'kfc',
        title: 'Combo personal 2 piezas + papa + gaseosa',
        price: 15.90,
        originalPrice: 22.90,
        discountPercent: 30,
        description: 'Combo individual a precio especial para estudiantes UTP.',
        imageUrl: '/img/promos/kfc-promos.jpg',
        imageAlt: 'Combo personal KFC de 2 piezas con papa y gaseosa',
        couponCode: 'UTPKFC30',
        expiresInDays: 8,
      },
    ],
    locations: [
      { name: 'Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'Plaza Norte', address: 'Av. Tomás Valle', city: 'Independencia, Lima.' },
    ],
    detailsTerms: [
      'Válido para pedidos presenciales, recojo en tienda y delivery.',
      'Presentar el código de la app UTP antes de pagar.',
      'Promoción sujeta a disponibilidad de locales participantes.',
    ],
  },

  smartfit: {
    id: 'smartfit',
    name: 'Smart Fit',
    accent: '#0b6b3a',
    logoUrl: '/img/Logos/smart-fit.png',
    categoryTitle: 'Descuentos en gimnasios',
    location: 'Lima\nSedes Smart Fit a nivel nacional',
    offers: [
      {
        id: 'smartfit-matricula-gratis',
        brandId: 'smartfit',
        title: 'Matrícula gratis + primer mes con descuento',
        price: 0,
        originalPrice: 49.90,
        discountPercent: 100,
        description: 'Sin costo de matrícula para nuevos estudiantes UTP que se inscriban este mes.',
        imageUrl: '/img/promos/smart-fit-promos.jpg',
        imageAlt: 'Promoción de matrícula gratis en Smart Fit',
        couponCode: 'UTPSF100',
        free: true,
      } as any,
      {
        id: 'smartfit-plan-anual',
        brandId: 'smartfit',
        title: '20% de descuento en plan anual',
        price: 799.20,
        originalPrice: 999.00,
        discountPercent: 20,
        description: 'Descuento aplicado al pagar el plan anual completo.',
        imageUrl: '/img/promos/smart-fit-promos.jpg',
        imageAlt: 'Plan anual Smart Fit con descuento',
        couponCode: 'UTPSF20',
        expiresInDays: 12,
      },
    ],
    locations: [
      { name: 'Smart Fit Los Olivos', address: 'Av. Universitaria 1801', city: 'Los Olivos, Lima.' },
      { name: 'Smart Fit Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
    ],
    detailsTerms: [
      'Beneficio válido solo para nuevas membresías.',
      'Presentar carné UTP vigente al momento de la inscripción.',
      'No acumulable con otras promociones vigentes.',
    ],
  },

  oeschle: {
    id: 'oeschle',
    name: 'Oeschle',
    accent: '#b8000f',
    logoUrl: '/img/Logos/oechsle.png',
    categoryTitle: 'Descuentos en moda y tecnología',
    location: 'Lima\nTiendas Oechsle a nivel nacional',
    offers: [
      {
        id: 'oeschle-tecnologia-300',
        brandId: 'oeschle',
        title: 'Hasta S/. 300 de descuento en tecnología',
        price: 1200.00,
        originalPrice: 1500.00,
        discountPercent: 20,
        description: 'Válido en laptops y celulares seleccionados de la tienda.',
        imageUrl: '/img/promos/oechsle-promos.jpg',
        imageAlt: 'Descuento en tecnología en tienda Oechsle',
        couponCode: 'UTPOEC300',
      },
      {
        id: 'oeschle-moda-25',
        brandId: 'oeschle',
        title: '25% de descuento en moda seleccionada',
        price: 74.90,
        originalPrice: 99.90,
        discountPercent: 25,
        description: 'Aplica en ropa y calzado de marcas participantes.',
        imageUrl: '/img/promos/oechsle-promos.jpg',
        imageAlt: 'Descuento en moda en tienda Oechsle',
        couponCode: 'UTPOEC25',
        expiresInDays: 15,
      },
    ],
    locations: [
      { name: 'Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'Plaza Norte', address: 'Av. Tomás Valle', city: 'Independencia, Lima.' },
    ],
    detailsTerms: [
      'Válido presentando el código de la app UTP en caja.',
      'Aplica solo en productos y marcas participantes.',
      'No acumulable con otras promociones o tarjetas de descuento.',
    ],
  },

  gmo: {
    id: 'gmo',
    name: 'GMO',
    accent: '#2c3e50',
    logoUrl: '/img/Logos/gmo.png',
    categoryTitle: 'Descuentos en fotografía e impresión',
    location: 'Lima\nTiendas GMO a nivel nacional',
    offers: [
      {
        id: 'gmo-impresion-fotos',
        brandId: 'gmo',
        title: '30% de descuento en revelado de fotos',
        price: 20.93,
        originalPrice: 29.90,
        discountPercent: 30,
        description: 'Válido para revelado digital en formato estándar.',
        imageUrl: '/img/promos/gmo-promos.jpg',
        imageAlt: 'Servicio de revelado de fotos GMO con descuento',
        couponCode: 'UTPGMO30',
      },
      {
        id: 'gmo-camaras-15',
        brandId: 'gmo',
        title: '15% de descuento en cámaras seleccionadas',
        price: 849.15,
        originalPrice: 999.00,
        discountPercent: 15,
        description: 'Aplica en modelos de cámaras compactas seleccionadas.',
        imageUrl: '/img/promos/gmo-promos.jpg',
        imageAlt: 'Cámaras fotográficas GMO con descuento',
        couponCode: 'UTPGMO15',
        expiresInDays: 10,
      },
    ],
    locations: [
      { name: 'GMO Jockey Plaza', address: 'Av. Javier Prado Este 4200', city: 'Surco, Lima.' },
    ],
    detailsTerms: [
      'Beneficio válido presentando el código de la app UTP.',
      'No aplica en productos ya rebajados.',
      'Sujeto a disponibilidad de stock por tienda.',
    ],
  },

  cineplanet: {
    id: 'cineplanet',
    name: 'Cineplanet',
    accent: '#b8000f',
    logoUrl: '/img/Logos/cineplanet.png',
    categoryTitle: 'Descuentos en entretenimiento',
    location: 'Lima\nCines Cineplanet a nivel nacional',
    offers: [
      {
        id: 'cineplanet-entrada-2x1',
        brandId: 'cineplanet',
        title: '2x1 en entradas 2D de lunes a jueves',
        price: 15.00,
        originalPrice: 30.00,
        discountPercent: 50,
        description: 'Válido de lunes a jueves en funciones 2D, no aplica en estrenos.',
        imageUrl: '/img/promos/cineplanet-promos.jpg',
        imageAlt: 'Promoción 2x1 en entradas Cineplanet',
        couponCode: 'UTPCP2X1',
      },
      {
        id: 'cineplanet-entradas-13',
        brandId: 'cineplanet',
        title: 'Hasta S/. 13 de descuento en entradas 2D',
        price: 13.00,
        originalPrice: 26.00,
        discountPercent: 50,
        description: 'En entradas 2D, cada promoción podrá ser utilizada una vez.',
        imageUrl: '/img/promos/cineplanet-promos.jpg',
        imageAlt: 'Descuento en entradas 2D Cineplanet',
        couponCode: 'UTPCP13',
      },
      {
        id: 'cineplanet-combo-canchita',
        brandId: 'cineplanet',
        title: '20% de descuento en combo canchita + gaseosa',
        price: 15.92,
        originalPrice: 19.90,
        discountPercent: 20,
        description: 'Combo mediano de canchita con gaseosa a precio especial.',
        imageUrl: '/img/promos/cineplanet-promos.jpg',
        imageAlt: 'Combo canchita y gaseosa Cineplanet con descuento',
        couponCode: 'UTPCP20',
        expiresInDays: 6,

      },
    ],
    locations: [
      { name: 'Cineplanet Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'Cineplanet Jockey Plaza', address: 'Av. Javier Prado Este 4200', city: 'Surco, Lima.' },
    ],
    detailsTerms: [
      'Válido presentando el código de la app UTP en boletería.',
      'No aplica en funciones 3D, 4DX ni estrenos.',
      'Promoción sujeta a disponibilidad de asientos.',
    ],
  },

  pizzahut: {
    id: 'pizzahut',
    name: 'Pizza Hut',
    accent: '#c0392b',
    logoUrl: '/img/Logos/pizzahut.png',
    categoryTitle: 'Descuentos en comidas',
    location: 'Lima\nLocales Pizza Hut a nivel nacional',
    offers: [
      {
        id: 'pizzahut-familiar-2x1',
        brandId: 'pizzahut',
        title: '2x1 en pizzas familiares clásicas',
        price: 39.90,
        originalPrice: 79.80,
        discountPercent: 50,
        description: 'Válido para pedidos por delivery, recojo en tienda o consumo en local.',
        imageUrl: '/img/promos/pizzahut-promos.jpg',
        imageAlt: 'Promoción 2x1 en pizzas familiares Pizza Hut',
        couponCode: 'UTPPH2X1',
      },
      {
        id: 'pizzahut-personal-20',
        brandId: 'pizzahut',
        title: '20% de descuento en pizza personal + bebida',
        price: 19.90,
        originalPrice: 24.90,
        discountPercent: 20,
        description: 'Combo individual ideal para estudiantes, incluye bebida personal.',
        imageUrl: '/img/promos/pizzahut-promos.jpg',
        imageAlt: 'Pizza personal con bebida Pizza Hut con descuento',
        couponCode: 'UTPPH20',
        expiresInDays: 9,
      },
      {
        id: 'pizzahut-combo-regular',
        brandId: 'pizzahut',
        title: 'Hasta S/. 20 de descuento en combo regular',
        price: 40.00,
        originalPrice: 60.00,
        discountPercent: 33,
        description: 'Combo regular con pizza a elección.',
        imageUrl: '/img/promos/pizzahut-promos.jpg',
        imageAlt: 'Combo regular con pizza a elección Pizza Hut',
        couponCode: 'UTPPH20B',
      },
    ],
    locations: [
      { name: 'Mega Plaza', address: 'Av. Alfredo Mendiola 3698', city: 'Independencia, Lima.' },
      { name: 'Plaza Norte', address: 'Av. Tomás Valle', city: 'Independencia, Lima.' },
    ],
    detailsTerms: [
      'Válido para pedidos presenciales, recojo en tienda y delivery.',
      'Presentar el código de la app UTP antes de pagar.',
      'No acumulable con otras promociones.',
    ],
  },

  rallykart: {
    id: 'rallykart',
    name: 'Rally Kart',
    accent: '#b3400b',
    logoUrl: '/img/Logos/rallykart.png',
    categoryTitle: 'Descuentos en entretenimiento',
    location: 'Lima\nSede Rally Kart',
    offers: [
      {
        id: 'rallykart-3vueltas',
        brandId: 'rallykart',
        title: '3 carreras de karts a precio especial',
        price: 35.00,
        originalPrice: 50.00,
        discountPercent: 30,
        description: 'Válido de lunes a viernes, no aplica en fechas festivas.',
        imageUrl: '/img/promos/rallykart-promos.jpg',
        imageAlt: 'Carreras de karts Rally Kart con descuento',
        couponCode: 'UTPRK30',
      },
      {
        id: 'rallykart-grupo5',
        brandId: 'rallykart',
        title: 'Pack grupal de 5 personas con 25% de descuento',
        price: 131.25,
        originalPrice: 175.00,
        discountPercent: 25,
        description: 'Ideal para ir con tu grupo de clase, incluye una carrera por persona.',
        imageUrl: '/img/promos/rallykart-promos.jpg',
        imageAlt: 'Pack grupal de karts para 5 personas con descuento',
        couponCode: 'UTPRK25',
        expiresInDays: 14,
      },
      {
        id: 'rallykart-descuento-50',
        brandId: 'rallykart',
        title: 'Hasta S/. 50 de descuento en carreras',
        price: 100.00,
        originalPrice: 150.00,
        discountPercent: 33,
        description: 'En carreras, descuento disponible: cortas y normales.',
        imageUrl: '/img/promos/rallykart-promos.jpg',
        imageAlt: 'Descuento en carreras cortas y normales Rally Kart',
        couponCode: 'UTPRK50',
      },
    ],
    locations: [
      { name: 'Rally Kart Los Olivos', address: 'Panamericana Norte km 15', city: 'Los Olivos, Lima.' },
    ],
    detailsTerms: [
      'Válido presentando el código de la app UTP en counter.',
      'Recomendado reservar horario con anticipación.',
      'No acumulable con otras promociones vigentes.',
    ],
  },
};

/** Busca una oferta en todos los brands por su id. */
export function findOffer(offerId: string): { brand: BrandInfo; offer: BrandOffer } | null {
  for (const brand of Object.values(BRANDS)) {
    const offer = brand.offers.find((o) => o.id === offerId)
    if (offer) return { brand, offer }
  }
  return null
}
