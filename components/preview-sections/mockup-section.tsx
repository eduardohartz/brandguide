'use client'

import type { BrandData } from '@/lib/brand-store'
import { getContrastColor } from '@/lib/brand-store'

interface MockupSectionProps {
  data: BrandData
}

export function MockupSection({ data }: MockupSectionProps) {
  const colors = data.colors
  const primaryFont = data.fonts[0]
  const primaryColor = colors[0]
  const secondaryColor = colors[1]
  const logo = data.logos[0]
  const brandName = data.brandName || 'Brand'

  if (colors.length === 0 && data.fonts.length === 0 && data.logos.length === 0) {
    return <p className="text-muted-foreground text-sm">Add brand elements to see mockups.</p>
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Business card mockup */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Business Card</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Front */}
          <div
            className="rounded-xl aspect-[1.75/1] p-6 flex flex-col justify-between shadow-lg"
            style={{
              backgroundColor: primaryColor?.hex || '#18181b',
              color: primaryColor ? getContrastColor(primaryColor.hex) : '#fafafa',
              fontFamily: primaryFont?.cssFamily,
            }}
          >
            <div className="flex items-start justify-between">
              {logo && <img src={logo.url || '/placeholder.svg'} alt={logo.name} className="h-6 object-contain" crossOrigin="anonymous" />}
              <div />
            </div>
            <div>
              <p className="text-lg font-bold">{brandName}</p>
              <p className="text-xs opacity-60">Design & Strategy</p>
            </div>
          </div>
          {/* Back */}
          <div
            className="rounded-xl aspect-[1.75/1] p-6 flex flex-col justify-between shadow-lg"
            style={{
              backgroundColor: secondaryColor?.hex || '#fafafa',
              color: secondaryColor ? getContrastColor(secondaryColor.hex) : '#18181b',
              fontFamily: primaryFont?.cssFamily,
            }}
          >
            <div>
              <p className="text-sm font-bold">Jane Smith</p>
              <p className="text-xs opacity-70">Creative Director</p>
            </div>
            <div className="flex flex-col gap-0.5 text-xs opacity-70">
              <span>
                jane@
                {brandName.toLowerCase().replace(/\s/g, '')}
                .com
              </span>
              <span>+1 (555) 123-4567</span>
              <span>
                www.
                {brandName.toLowerCase().replace(/\s/g, '')}
                .com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social media header */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Social Media Banner</h3>
        <div
          className="rounded-xl aspect-3/1 flex items-center justify-center relative overflow-hidden shadow-lg"
          style={{
            backgroundColor: primaryColor?.hex || '#18181b',
            color: primaryColor ? getContrastColor(primaryColor.hex) : '#fafafa',
            fontFamily: primaryFont?.cssFamily,
          }}
        >
          {/* Decorative background circles */}
          {secondaryColor && (
            <>
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
                style={{ backgroundColor: secondaryColor.hex }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10"
                style={{ backgroundColor: secondaryColor.hex }}
              />
            </>
          )}
          <div className="relative text-center flex flex-col items-center gap-3">
            {logo && <img src={logo.url || '/placeholder.svg'} alt={logo.name} className="h-10 object-contain" crossOrigin="anonymous" />}
            <h3 className="text-2xl lg:text-3xl font-bold">{brandName}</h3>
          </div>
        </div>
      </div>

      {/* Email signature */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Email Signature</h3>
        <div className="rounded-xl border border-border bg-card p-6 max-w-md">
          <div className="flex gap-4" style={{ fontFamily: primaryFont?.cssFamily }}>
            {logo && (
              <div className="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor?.hex || '#18181b' }}>
                <img src={logo.url || '/placeholder.svg'} alt={logo.name} className="h-8 w-8 object-contain" crossOrigin="anonymous" />
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold text-card-foreground">Jane Smith</p>
              <p className="text-xs text-muted-foreground">Creative Director</p>
              <div className="w-8 h-0.5 rounded-full my-1" style={{ backgroundColor: primaryColor?.hex || '#18181b' }} />
              <p className="text-xs text-muted-foreground">
                jane@
                {brandName.toLowerCase().replace(/\s/g, '')}
                .com
              </p>
              <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Letterhead */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Letterhead</h3>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xs" style={{ fontFamily: primaryFont?.cssFamily }}>
          <div className="h-2" style={{ backgroundColor: primaryColor?.hex || '#18181b' }} />
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              {logo && <img src={logo.url || '/placeholder.svg'} alt={logo.name} className="h-8 object-contain" crossOrigin="anonymous" />}
              <div className="text-right text-xs text-muted-foreground">
                <p>123 Creative Street</p>
                <p>Design City, DC 10001</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>February 5, 2026</p>
              <p>Dear Client,</p>
              <p className="leading-relaxed">
                Thank you for choosing
                {' '}
                {brandName}
                . We are excited to partner with you on this project.
                Our team is committed to delivering exceptional results that align with your vision.
              </p>
              <p className="mt-2">Best regards,</p>
              <p className="font-semibold text-card-foreground">Jane Smith</p>
              <p className="text-xs">
                Creative Director,
                {brandName}
              </p>
            </div>
          </div>
          <div className="h-1" style={{ backgroundColor: primaryColor?.hex || '#18181b' }} />
        </div>
      </div>

      {/* App UI mockup */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">App UI Preview</h3>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xs max-w-sm" style={{ fontFamily: primaryFont?.cssFamily }}>
          {/* Nav bar */}
          <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: primaryColor?.hex || '#18181b', color: primaryColor ? getContrastColor(primaryColor.hex) : '#fafafa' }}>
            {logo
              ? (
                  <img src={logo.url || '/placeholder.svg'} alt={logo.name} className="h-5 object-contain" crossOrigin="anonymous" />
                )
              : (
                  <span className="text-sm font-bold">{brandName}</span>
                )}
            <div className="flex gap-1">
              <div className="w-5 h-0.5 rounded-full bg-current opacity-80" />
              <div className="w-5 h-0.5 rounded-full bg-current opacity-80" />
            </div>
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col gap-3">
            <h4 className="text-lg font-bold text-card-foreground">Welcome back</h4>
            <div className="flex flex-col gap-2">
              <div className="h-2.5 rounded-full bg-muted w-full" />
              <div className="h-2.5 rounded-full bg-muted w-3/4" />
              <div className="h-2.5 rounded-full bg-muted w-5/6" />
            </div>
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold w-full"
              style={{
                backgroundColor: primaryColor?.hex || '#18181b',
                color: primaryColor ? getContrastColor(primaryColor.hex) : '#fafafa',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
