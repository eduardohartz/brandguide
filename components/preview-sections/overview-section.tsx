'use client'

import type { BrandData } from '@/lib/brand-store'
import { getContrastColor } from '@/lib/brand-store'

interface OverviewSectionProps {
  data: BrandData
}

export function OverviewSection({ data }: OverviewSectionProps) {
  const primaryColor = data.colors[0]
  const primaryFont = data.fonts[0]

  return (
    <div className="flex flex-col gap-8">
      {/* Hero banner */}
      <div
        className="rounded-2xl p-8 lg:p-12 flex flex-col gap-4 min-h-[240px] justify-end shadow-2xs border border-border"
        style={{
          backgroundColor: primaryColor?.hex || '#18181b',
          color: primaryColor ? getContrastColor(primaryColor.hex) : '#fafafa',
        }}
      >
        {data.logos[0] && (
          <img
            src={data.logos[0].url || '/placeholder.svg'}
            alt={data.logos[0].name}
            className="max-h-12 object-contain self-start mb-2"
            crossOrigin="anonymous"
          />
        )}
        <h2
          className="text-4xl lg:text-5xl font-bold tracking-tight text-balance"
          style={{ fontFamily: primaryFont?.cssFamily }}
        >
          {data.brandName || 'Your Brand'}
        </h2>
        <p
          className="text-sm opacity-70 max-w-lg"
          style={{ fontFamily: primaryFont?.cssFamily }}
        >
          A comprehensive visual identity system crafted for consistency and impact across all touchpoints.
        </p>
      </div>

      {/* Quick summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Colors summary */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color Palette</h3>
          {data.colors.length > 0
            ? (
                <div className="flex gap-2">
                  {data.colors.map(c => (
                    <div key={c.id} className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="w-full aspect-square rounded-lg border border-border" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-muted-foreground font-mono truncate w-full text-center">{c.hex.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              )
            : (
                <p className="text-xs text-muted-foreground">No colors added</p>
              )}
        </div>

        {/* Fonts summary */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typefaces</h3>
          {data.fonts.length > 0
            ? (
                <div className="flex flex-col gap-2">
                  {data.fonts.map(f => (
                    <div key={f.id} className="flex items-center justify-between">
                      <span className="text-lg text-card-foreground" style={{ fontFamily: f.cssFamily }}>{f.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">Google Fonts</span>
                    </div>
                  ))}
                </div>
              )
            : (
                <p className="text-xs text-muted-foreground">No fonts added</p>
              )}
        </div>

        {/* Logos summary */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logos</h3>
          {data.logos.length > 0
            ? (
                <div className="grid grid-cols-2 gap-2">
                  {data.logos.map(l => (
                    <div key={l.id} className="aspect-square rounded-lg border border-border bg-muted flex items-center justify-center p-2">
                      <img src={l.url || '/placeholder.svg'} alt={l.name} className="max-h-full max-w-full object-contain" crossOrigin="anonymous" />
                    </div>
                  ))}
                </div>
              )
            : (
                <p className="text-xs text-muted-foreground">No logos added</p>
              )}
        </div>
      </div>

      {/* Type specimen with brand colors */}
      {primaryFont && primaryColor && (
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Brand Typography Preview</h3>
          <div className="flex flex-col gap-2" style={{ fontFamily: primaryFont.cssFamily }}>
            <p className="text-5xl font-bold text-card-foreground" style={{ color: primaryColor.hex }}>
              Aa Bb Cc
            </p>
            <p className="text-3xl font-semibold text-card-foreground">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mt-2">
              Every element of this brand guide has been carefully considered to maintain visual harmony.
              Consistent use of these guidelines ensures your brand communicates effectively across every medium.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
