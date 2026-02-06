'use client'

import type { BrandColor, BrandLogo } from '@/lib/brand-store'

interface LogoSectionProps {
  logos: BrandLogo[]
  colors: BrandColor[]
}

export function LogoSection({ logos, colors }: LogoSectionProps) {
  if (logos.length === 0) {
    return <p className="text-muted-foreground text-sm">No logos added yet.</p>
  }

  const backgrounds = [
    { label: 'White', bg: '#ffffff', text: '#111111' },
    { label: 'Light Gray', bg: '#f4f4f5', text: '#111111' },
    { label: 'Dark', bg: '#18181b', text: '#fafafa' },
    { label: 'Black', bg: '#000000', text: '#ffffff' },
    ...colors.slice(0, 3).map(c => ({
      label: c.name,
      bg: c.hex,
      text: luminance(c.hex) > 0.5 ? '#111111' : '#ffffff',
    })),
  ]

  return (
    <div className="flex flex-col gap-8">
      {logos.map(logo => (
        <div key={logo.id} className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{logo.name}</h3>

          {/* Logo on different backgrounds */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {backgrounds.map(bg => (
              <div
                key={`${logo.id}-${bg.label}`}
                className="rounded-xl border border-border aspect-4/3 flex flex-col items-center justify-center p-4 gap-2"
                style={{ backgroundColor: bg.bg }}
              >
                <img
                  src={logo.url || '/placeholder.svg'}
                  alt={`${logo.name} on ${bg.label} background`}
                  className="max-h-16 max-w-full object-contain"
                  crossOrigin="anonymous"
                />
                <span className="text-[10px] font-mono opacity-60" style={{ color: bg.text }}>{bg.label}</span>
              </div>
            ))}
          </div>

          {/* Size variations */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Minimum Sizes</h4>
            <div className="flex items-end gap-6 bg-card rounded-xl border border-border p-6">
              {[80, 56, 40, 28, 20].map(size => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <img
                    src={logo.url || '/placeholder.svg'}
                    alt={`${logo.name} at ${size}px`}
                    style={{ height: size, width: 'auto' }}
                    className="object-contain"
                    crossOrigin="anonymous"
                  />
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {size}
                    px
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear space */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Clear Space</h4>
            <div className="bg-card rounded-xl border border-border p-10 flex items-center justify-center">
              <div className="border-2 border-dashed border-muted-foreground/30 p-8 rounded-lg relative">
                <img
                  src={logo.url || '/placeholder.svg'}
                  alt={`${logo.name} clear space demonstration`}
                  className="max-h-20 object-contain"
                  crossOrigin="anonymous"
                />
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono">1x</span>
                <span className="absolute top-1/2 -right-6 -translate-y-1/2 text-[10px] text-muted-foreground font-mono">1x</span>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono">1x</span>
                <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-[10px] text-muted-foreground font-mono">1x</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function luminance(hex: string): number {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result)
    return 0
  const r = Number.parseInt(result[1], 16) / 255
  const g = Number.parseInt(result[2], 16) / 255
  const b = Number.parseInt(result[3], 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}
