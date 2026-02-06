'use client'

import type { BrandColor } from '@/lib/brand-store'
import { getContrastColor, hexToHsl, hexToRgb } from '@/lib/brand-store'

interface ColorSectionProps {
  colors: BrandColor[]
}

export function ColorSection({ colors }: ColorSectionProps) {
  if (colors.length === 0) {
    return <p className="text-muted-foreground text-sm">No colors added yet.</p>
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Color strip */}
      <div className="rounded-xl overflow-hidden flex h-32 shadow-2xs border border-border">
        {colors.map(c => (
          <div
            key={c.id}
            className="flex-1 flex items-end justify-start p-3 transition-all"
            style={{ backgroundColor: c.hex, color: getContrastColor(c.hex) }}
          >
            <span className="text-xs font-mono opacity-80">{c.hex.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Detailed cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((c) => {
          const rgb = hexToRgb(c.hex)
          const hsl = hexToHsl(c.hex)
          return (
            <div key={c.id} className="rounded-xl border border-border overflow-hidden bg-card shadow-2xs">
              <div className="h-28" style={{ backgroundColor: c.hex }} />
              <div className="p-4 flex flex-col gap-2">
                <h4 className="font-semibold text-sm text-card-foreground">{c.name}</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
                  <span>HEX</span>
                  <span className="text-card-foreground">{c.hex.toUpperCase()}</span>
                  {rgb && (
                    <>
                      <span>RGB</span>
                      <span className="text-card-foreground">
                        {rgb.r}
                        ,
                        {' '}
                        {rgb.g}
                        ,
                        {' '}
                        {rgb.b}
                      </span>
                    </>
                  )}
                  {hsl && (
                    <>
                      <span>HSL</span>
                      <span className="text-card-foreground">
                        {hsl.h}
                        ,
                        {' '}
                        {hsl.s}
                        %,
                        {' '}
                        {hsl.l}
                        %
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Accessibility pairings */}
      {colors.length >= 2 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Color Pairings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {colors.slice(0, 4).map(bg =>
              colors.filter(fg => fg.id !== bg.id).slice(0, 2).map(fg => (
                <div
                  key={`${bg.id}-${fg.id}`}
                  className="rounded-lg p-4 border border-border"
                  style={{ backgroundColor: bg.hex, color: fg.hex }}
                >
                  <p className="text-sm font-semibold">Aa Bb Cc 123</p>
                  <p className="text-xs mt-1 opacity-80">
                    {bg.name}
                    {' '}
                    +
                    {' '}
                    {fg.name}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
