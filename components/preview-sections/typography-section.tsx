'use client'

import type { BrandColor, BrandFont } from '@/lib/brand-store'

interface TypographySectionProps {
  fonts: BrandFont[]
  colors: BrandColor[]
}

const sampleSizes = [
  { label: 'Display', className: 'text-5xl font-bold' },
  { label: 'Heading 1', className: 'text-3xl font-bold' },
  { label: 'Heading 2', className: 'text-2xl font-semibold' },
  { label: 'Heading 3', className: 'text-xl font-semibold' },
  { label: 'Body', className: 'text-base font-normal' },
  { label: 'Small', className: 'text-sm font-normal' },
  { label: 'Caption', className: 'text-xs font-normal' },
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+-=[]{}|;:\',.<>?/'

export function TypographySection({ fonts, colors }: TypographySectionProps) {
  if (fonts.length === 0) {
    return <p className="text-muted-foreground text-sm">No typefaces added yet.</p>
  }

  const primaryColor = colors[0]?.hex

  return (
    <div className="flex flex-col gap-10">
      {fonts.map(font => (
        <div key={font.id} className="flex flex-col gap-6">
          {/* Font header */}
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h3
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: font.cssFamily }}
            >
              {font.name}
            </h3>
            <span className="text-xs text-muted-foreground font-mono uppercase">Google Fonts</span>
          </div>

          {/* Type scale */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type Scale</h4>
            <div className="flex flex-col gap-2">
              {sampleSizes.map(size => (
                <div key={size.label} className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 font-mono">{size.label}</span>
                  <span
                    className={`${size.className} text-foreground truncate`}
                    style={{
                      fontFamily: font.cssFamily,
                      ...(primaryColor ? { color: undefined } : {}),
                    }}
                  >
                    The quick brown fox jumps
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Character set */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Character Set</h4>
            <div className="rounded-xl border border-border bg-card p-5">
              <p
                className="text-lg leading-relaxed text-card-foreground tracking-wide"
                style={{ fontFamily: font.cssFamily }}
              >
                {alphabet}
              </p>
              <p
                className="text-lg leading-relaxed text-card-foreground tracking-wide mt-2"
                style={{ fontFamily: font.cssFamily }}
              >
                {numbers}
              </p>
              <p
                className="text-lg leading-relaxed text-muted-foreground tracking-wide mt-2"
                style={{ fontFamily: font.cssFamily }}
              >
                {symbols}
              </p>
            </div>
          </div>

          {/* Paragraph specimen */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paragraph Specimen</h4>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
              <h5
                className="text-2xl font-bold text-card-foreground"
                style={{ fontFamily: font.cssFamily, ...(primaryColor ? { color: primaryColor } : {}) }}
              >
                Design is not just what it looks like
              </h5>
              <p
                className="text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: font.cssFamily }}
              >
                Good design is as little design as possible. Less, but better because it concentrates on the essential aspects, and the products are not burdened with non-essentials. Back to purity, back to simplicity. Typography is the craft of endowing human language with a durable visual form.
              </p>
            </div>
          </div>

          {/* Weight display if Google Font */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weights</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Light', weight: 300 },
                { label: 'Regular', weight: 400 },
                { label: 'Semi Bold', weight: 600 },
                { label: 'Bold', weight: 700 },
              ].map(w => (
                <div key={w.label} className="rounded-lg border border-border bg-card p-4 text-center">
                  <span
                    className="text-2xl text-card-foreground block"
                    style={{ fontFamily: font.cssFamily, fontWeight: w.weight }}
                  >
                    Ag
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 block font-mono">
                    {w.label}
                    {' '}
                    (
                    {w.weight}
                    )
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
