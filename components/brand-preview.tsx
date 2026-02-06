'use client'

import type { BrandData } from '@/lib/brand-store'
import { ColorSection } from '@/components/preview-sections/color-section'
import { LogoSection } from '@/components/preview-sections/logo-section'
import { MockupSection } from '@/components/preview-sections/mockup-section'
import { OverviewSection } from '@/components/preview-sections/overview-section'
import { TypographySection } from '@/components/preview-sections/typography-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getContrastColor, hexToHsl, hexToRgb } from '@/lib/brand-store'

interface BrandPreviewProps {
  data: BrandData
  viewOnly?: boolean
}

export function BrandPreview({ data, viewOnly = false }: BrandPreviewProps) {
  const hasContent = data.colors.length > 0 || data.fonts.length > 0 || data.logos.length > 0

  if (!hasContent && !viewOnly) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Start Building Your Brand Guide</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">Add colors, typefaces, and logos using the panel on the left. Your brand guide preview will appear here in real time.</p>
        </div>
      </main>
    )
  }

  if (!hasContent && viewOnly) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-foreground mb-2">Empty Brand Guide</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This brand guide doesn
            {'\''}
            t contain any assets yet.
          </p>
        </div>
      </main>
    )
  }

  // Determine which tabs to show in shared view (hide logos/mockups if no logos)
  const showLogosTab = data.logos.length > 0
  const showMockupsTab = data.colors.length > 0 || data.fonts.length > 0 || data.logos.length > 0

  return (
    <main className="flex-1 bg-background overflow-y-auto lg:h-screen">
      <div className="max-w-5xl mx-auto p-6 lg:p-10">
        <header className="mb-8">
          {viewOnly && (
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Only
              </span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-foreground tracking-tight text-balance">
            {data.brandName || 'Brand'}
            {' '}
            <span className="text-muted-foreground font-normal">Guide</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Visual identity reference sheet</p>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-muted mb-8 w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            {showLogosTab && <TabsTrigger value="logos">Logos</TabsTrigger>}
            {showMockupsTab && <TabsTrigger value="mockups">Mockups</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <OverviewSection data={data} />
          </TabsContent>
          <TabsContent value="colors">
            <ColorSection colors={data.colors} />
          </TabsContent>
          <TabsContent value="typography">
            <TypographySection fonts={data.fonts} colors={data.colors} />
          </TabsContent>
          {showLogosTab && (
            <TabsContent value="logos">
              <LogoSection logos={data.logos} colors={data.colors} />
            </TabsContent>
          )}
          {showMockupsTab && (
            <TabsContent value="mockups">
              <MockupSection data={data} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </main>
  )
}

export { getContrastColor, hexToHsl, hexToRgb }
