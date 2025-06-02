import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import AuthProvider from './providers'

// Font optimizasyonu
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'FlashCard Uygulaması',
    template: '%s | FlashCard'
  },
  description: 'İngilizce kelime öğrenme uygulaması',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${notoSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}