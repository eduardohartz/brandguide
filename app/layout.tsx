import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import React from 'react'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'Brand Guide Studio',
  description: 'Create polished brand guides to share with clients',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_spaceMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
