export interface BrandColor {
  id: string
  hex: string
  name: string
}

export interface BrandFont {
  id: string
  name: string
  source: 'google'
  url: string
  cssFamily: string
}

export interface BrandLogo {
  id: string
  name: string
  url: string
  file?: File
}

export interface BrandData {
  brandName: string
  colors: BrandColor[]
  fonts: BrandFont[]
  logos: BrandLogo[]
}

export const defaultBrandData: BrandData = {
  brandName: '',
  colors: [],
  fonts: [],
  logos: [],
}

let idCounter = 0
export function generateId(): string {
  idCounter++
  return `id-${Date.now()}-${idCounter}`
}

export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

export function hexToHsl(hex: string): { h: number, s: number, l: number } | null {
  const rgb = hexToRgb(hex)
  if (!rgb)
    return null
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb)
    return '#000000'
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

export function extractGoogleFontName(url: string): string | null {
  try {
    const parsed = new URL(url)
    const family = parsed.searchParams.get('family')
    if (family) {
      return family.split(':')[0].replace(/\+/g, ' ')
    }
  }
  catch {
  }
  return null
}

export function hasUnsharableAssets(data: BrandData): {
  hasLogos: boolean
} {
  return {
    hasLogos: data.logos.length > 0,
  }
}

export function encodeBrandDataToParams(data: BrandData): string {
  const params = new URLSearchParams()
  params.set('shared', '1')

  if (data.brandName) {
    params.set('name', data.brandName)
  }

  if (data.colors.length > 0) {
    const colorStr = data.colors.map(c => `${c.hex.replace('#', '')}:${encodeURIComponent(c.name)}`).join(',')
    params.set('c', colorStr)
  }

  if (data.fonts.length > 0) {
    const fontStr = data.fonts.map(f => f.url).join('|')
    params.set('gf', fontStr)
  }

  return params.toString()
}

export function decodeBrandDataFromParams(searchParams: URLSearchParams): BrandData | null {
  if (searchParams.get('shared') !== '1')
    return null

  const brandName = searchParams.get('name') || ''

  const colors: BrandColor[] = []
  const colorStr = searchParams.get('c')
  if (colorStr) {
    for (const part of colorStr.split(',')) {
      const [hexRaw, ...nameParts] = part.split(':')
      const hex = `#${hexRaw}`
      const name = decodeURIComponent(nameParts.join(':')) || hex
      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        colors.push({ id: generateId(), hex, name })
      }
    }
  }

  const fonts: BrandFont[] = []
  const fontStr = searchParams.get('gf')
  if (fontStr) {
    for (const url of fontStr.split('|')) {
      const name = extractGoogleFontName(url)
      if (name) {
        fonts.push({
          id: generateId(),
          name,
          source: 'google',
          url,
          cssFamily: name,
        })
      }
    }
  }

  return {
    brandName,
    colors,
    fonts,
    logos: [],
  }
}
