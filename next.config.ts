import type { NextConfig } from 'next'

const securityHeaders = [
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
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
]

const nextConfig: NextConfig = {
  // Temel ayarlar
  reactStrictMode: true,
  
  // TypeScript ve ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Sunucu paketleri (Yeni format)
  serverExternalPackages: ['jose', 'bcryptjs', 'mssql'],

  // Server Actions (Doğru format)
  experimental: {
    serverActions: {
      enabled: true,
    },
  },

  // HTTP Başlıkları
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Çevre değişkenleri
  env: {
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  }
}

export default nextConfig