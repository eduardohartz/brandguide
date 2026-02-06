'use client'

import type { BrandColor, BrandData, BrandLogo } from '@/lib/brand-store'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  encodeBrandDataToParams,
  extractGoogleFontName,
  generateId,
  hasUnsharableAssets,
} from '@/lib/brand-store'

interface BrandInputPanelProps {
  data: BrandData
  onChange: (data: BrandData) => void
}

export function BrandInputPanel({ data, onChange }: BrandInputPanelProps) {
  const [colorHex, setColorHex] = useState('#')
  const [colorName, setColorName] = useState('')
  const [fontUrl, setFontUrl] = useState('')
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>('idle')
  const logoFileRef = useRef<HTMLInputElement>(null)

  function addColor() {
    const hex = colorHex.startsWith('#') ? colorHex : `#${colorHex}`
    if (!/^#[0-9A-F]{6}$/i.test(hex))
      return
    const newColor: BrandColor = {
      id: generateId(),
      hex,
      name: colorName || hex,
    }
    onChange({ ...data, colors: [...data.colors, newColor] })
    setColorHex('#')
    setColorName('')
  }

  function removeColor(id: string) {
    onChange({ ...data, colors: data.colors.filter(c => c.id !== id) })
  }

  function addGoogleFont() {
    if (!fontUrl.trim())
      return
    const name = extractGoogleFontName(fontUrl)
    if (!name)
      return
    const newFont = {
      id: generateId(),
      name,
      source: 'google' as const,
      url: fontUrl,
      cssFamily: name,
    }
    onChange({ ...data, fonts: [...data.fonts, newFont] })
    setFontUrl('')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fontUrl
    document.head.appendChild(link)
  }

  function removeFont(id: string) {
    onChange({ ...data, fonts: data.fonts.filter(f => f.id !== id) })
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files)
      return
    for (const file of Array.from(files)) {
      const url = URL.createObjectURL(file)
      const newLogo: BrandLogo = {
        id: generateId(),
        name: file.name.replace(/\.[^.]+$/, ''),
        url,
        file,
      }
      onChange({ ...data, logos: [...data.logos, newLogo] })
    }
    if (logoFileRef.current)
      logoFileRef.current.value = ''
  }

  function removeLogo(id: string) {
    onChange({ ...data, logos: data.logos.filter(l => l.id !== id) })
  }

  async function handleShare() {
    const hasContent = data.colors.length > 0 || data.fonts.length > 0
    if (!hasContent)
      return

    try {
      const params = encodeBrandDataToParams(data)
      const url = `${window.location.origin}${window.location.pathname}?${params}`
      await navigator.clipboard.writeText(url)
      setShareState('copied')
      setTimeout(() => setShareState('idle'), 2500)
    }
    catch {
      setShareState('error')
      setTimeout(() => setShareState('idle'), 2500)
    }
  }

  const unsharable = hasUnsharableAssets(data)
  const hasContent
    = data.colors.length > 0 || data.fonts.length > 0 || data.logos.length > 0

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-sidebar-background text-sidebar-foreground flex flex-col lg:h-screen border-r border-sidebar-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="text-base font-semibold text-sidebar-primary tracking-tight">
          Brand Guide Studio
        </h1>
        <p className="text-xs text-sidebar-foreground/50 mt-0.5">
          Build your brand guide below
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-5">
        {/* Brand Name */}
        <Section label="Brand Name">
          <Input
            value={data.brandName}
            onChange={e => onChange({ ...data, brandName: e.target.value })}
            placeholder="Acme Inc."
            className="bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-foreground/40 h-9 text-sm shadow-2xs"
          />
        </Section>

        {/* Colors */}
        <Section label="Colors">
          <div className="flex gap-2">
            <input
              type="color"
              value={colorHex.length === 7 ? colorHex : '#000000'}
              onChange={e => setColorHex(e.target.value)}
              className="w-9 h-9 rounded-md border border-sidebar-border cursor-pointer shrink-0 bg-sidebar-accent"
              aria-label="Pick a color"
            />
            <Input
              value={colorHex}
              onChange={e => setColorHex(e.target.value)}
              placeholder="#000000"
              className="bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-foreground/40 h-9 text-sm font-mono shadow-2xs"
            />
          </div>
          <Input
            value={colorName}
            onChange={e => setColorName(e.target.value)}
            placeholder="Color name (optional)"
            className="bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-foreground/40 h-9 text-sm shadow-2xs"
          />
          <Button
            onClick={addColor}
            size="sm"
            className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80 w-full"
          >
            <PlusIcon />
            {' '}
            Add Color
          </Button>

          {data.colors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {data.colors.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => removeColor(c.id)}
                  className="group relative w-8 h-8 rounded-md border border-sidebar-border transition-transform hover:scale-110 shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.hex}) - Click to remove`}
                  aria-label={`Remove color ${c.name}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-md text-white text-xs">
                    <XIcon />
                  </span>
                </button>
              ))}
            </div>
          )}
        </Section>

        {/* Fonts */}
        <Section label="Typefaces">
          <Input
            value={fontUrl}
            onChange={e => setFontUrl(e.target.value)}
            placeholder="Google Fonts URL"
            className="bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-foreground/40 h-9 text-sm shadow-2xs"
          />
          <p className="text-[10px] text-sidebar-foreground/40 -mt-1 leading-relaxed">
            Paste a link like fonts.google.com/css2?family=Inter
          </p>
          <Button
            onClick={addGoogleFont}
            size="sm"
            variant="outline"
            className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent w-full bg-transparent"
          >
            <LinkIcon />
            {' '}
            Add Google Font
          </Button>

          {data.fonts.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-1">
              {data.fonts.map(f => (
                <div
                  key={f.id}
                  className="flex items-center justify-between text-sm bg-sidebar-accent rounded-md px-3 py-2 border border-sidebar-border shadow-2xs"
                >
                  <span
                    className="truncate text-sidebar-accent-foreground"
                    style={{ fontFamily: f.cssFamily }}
                  >
                    {f.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFont(f.id)}
                    className="text-sidebar-foreground/40 hover:text-sidebar-foreground ml-2 shrink-0"
                    aria-label={`Remove font ${f.name}`}
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Logos */}
        <Section label="Logos">
          <Button
            onClick={() => logoFileRef.current?.click()}
            size="sm"
            variant="outline"
            className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent w-full bg-transparent"
          >
            <UploadIcon />
            {' '}
            Upload Logo
          </Button>
          <input
            ref={logoFileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleLogoUpload}
            className="hidden"
            aria-label="Upload logo files"
          />

          {data.logos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-1">
              {data.logos.map(l => (
                <div
                  key={l.id}
                  className="group relative aspect-square bg-sidebar-accent rounded-md border border-sidebar-border flex items-center justify-center overflow-hidden shadow-2xs"
                >
                  <img
                    src={l.url || '/placeholder.svg'}
                    alt={l.name}
                    className="w-full h-full object-contain p-1.5"
                    crossOrigin="anonymous"
                  />
                  <button
                    type="button"
                    onClick={() => removeLogo(l.id)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/60 rounded-full p-0.5 text-white transition-opacity"
                    aria-label={`Remove logo ${l.name}`}
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Share */}
        <div className="mt-auto pt-3 flex flex-col gap-3 border-t border-sidebar-border">
          <Button
            onClick={handleShare}
            size="sm"
            disabled={!hasContent}
            className={`w-full transition-colors ${
              shareState === 'copied'
                ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                : 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80'
            }`}
          >
            {shareState === 'copied'
              ? (
                  <>
                    <CheckIcon />
                    {' '}
                    Link Copied
                  </>
                )
              : shareState === 'error'
                ? (
                    'Failed to copy'
                  )
                : (
                    <>
                      <ShareIcon />
                      {' '}
                      Copy Share Link
                    </>
                  )}
          </Button>

          {unsharable.hasLogos && (
            <div className="rounded-lg border border-amber-400/40 bg-amber-50 px-3 py-2.5 flex gap-2">
              <WarningIcon />
              <p className="text-[11px] text-amber-700 leading-relaxed">
                <span className="font-semibold">Logos</span>
                {' '}
                are stored locally
                and won
                {'\''}
                t appear in the shared link.
              </p>
            </div>
          )}

          {!hasContent && (
            <p className="text-[10px] text-sidebar-foreground/40 text-center">
              Add colors or fonts to enable sharing
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}

/* ---- Reusable Section Wrapper ---- */

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-sidebar-accent/40 border border-sidebar-border p-3.5">
      <Label className="text-sidebar-foreground text-[11px] uppercase tracking-wider font-semibold">
        {label}
      </Label>
      {children}
    </div>
  )
}

/* ---- Icons ---- */

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
