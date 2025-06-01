import type { NextConfig } from 'next'

/**
 * Next.js yapılandırma nesnesi
 * 
 * @type {NextConfig}
 */
const nextConfig: NextConfig = {
  // Sunucu tarafında kullanılacak external paketler
  serverExternalPackages: ['jose', 'bcryptjs', 'mssql'],
  
  // Deneysel özellikler
  experimental: {
    // Sunucu Aksiyonları (Next.js 14+)
    serverActions: {
      enabled: true, // Server Actions'ı aktif et
    },
    
    // TürboPack optimizasyonları
    turbo: {
      loaders: {
        // Özel yükleyici ayarları
        '.md': ['text-loader'],
      },
    },
  },
  
  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/(.*)', // Tüm rotalar için
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ]
  },
  
  // Uluslararasılaştırma (i18n) ayarları
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
  },
  
  // Görsel optimizasyonları
  images: {
    domains: [
      'localhost', // Yerel geliştirme
      'yourdomain.com', // Production domain
    ],
  },
  
  // TypeScript build hatalarını yönetme
  typescript: {
    ignoreBuildErrors: false, // Production'da false olmalı
  },
  
  // ESLint ayarları
  eslint: {
    ignoreDuringBuilds: false, // Production'da false olmalı
  },
}

export default nextConfig