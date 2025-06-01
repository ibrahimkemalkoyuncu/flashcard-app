import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlashCard App',
  description: 'Kelime kartları uygulaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Temel yapıyı korurken admin layout'unu da destekler */}
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}