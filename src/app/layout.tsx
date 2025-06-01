import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { NextAuthProvider } from './providers'

// Font optimizasyonu (Next.js built-in)
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
  keywords: ['flashcard', 'ingilizce', 'kelime', 'eğitim'],
  authors: [{ name: 'İbrahim Kemal', url: 'https://github.com/ibrahimkemalkoyuncu' }],
  metadataBase: new URL('https://flashcardapp.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://flashcardapp.com',
    siteName: 'FlashCard App',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
    }]
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${notoSans.variable}`}>
      <head>
        {/* Favicon (public/favicon.ico otomatik eklenir) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Sistem renk teması */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`min-h-screen bg-gray-50 font-sans antialiased`}>
        <NextAuthProvider>
          <div id="app-root" className="flex flex-col min-h-screen">
            {/* Header otomatik eklenir (app/_components/Header.tsx) */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            {/* Footer otomatik eklenir (app/_components/Footer.tsx) */}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}