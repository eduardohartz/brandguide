'use client'

import type { BrandData } from '@/lib/brand-store'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BrandInputPanel } from '@/components/brand-input-panel'
import { BrandPreview } from '@/components/brand-preview'
import {

  decodeBrandDataFromParams,
  defaultBrandData,
} from '@/lib/brand-store'

export default function Page() {
  const searchParams = useSearchParams()
  const [brandData, setBrandData] = useState<BrandData>(defaultBrandData)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSharedView, setIsSharedView] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Check for shared mode on mount
  useEffect(() => {
    const decoded = decodeBrandDataFromParams(searchParams)
    if (decoded) {
      setIsSharedView(true)
      setBrandData(decoded)

      // Load Google Fonts from the shared data
      const googleFonts = decoded.fonts.filter(
        f => f.source === 'google' && f.url,
      )
      for (const font of googleFonts) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = font.url!
        document.head.appendChild(link)
      }
      // Give fonts a moment to load
      setTimeout(() => setFontsLoaded(true), 500)
    }
    else {
      setFontsLoaded(true)
    }
  }, [searchParams])

  // Shared view — no sidebar, just the brand guide
  if (isSharedView) {
    return (
      <div className="min-h-screen bg-background">
        {!fontsLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading brand guide...</p>
            </div>
          </div>
        )}
        <BrandPreview data={brandData} viewOnly />
      </div>
    )
  }

  // Builder view — sidebar + preview
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center shadow-lg"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen
          ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )
          : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:relative lg:z-auto transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
          onClick={() => setSidebarOpen(false)}
          onKeyDown={e => e.key === 'Escape' && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
        <div className="relative z-10 h-full w-80">
          <BrandInputPanel data={brandData} onChange={setBrandData} />
        </div>
      </div>

      {/* Preview */}
      <BrandPreview data={brandData} />
    </div>
  )
}
