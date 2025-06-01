import type { NextConfig } from 'next'

/**
 * Next.js yapılandırma nesnesi
 * @type {NextConfig}
 */
const nextConfig: NextConfig = {
  // ===== Temel Ayarlar =====
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // Production'da source map
  
  // ===== Turbopack Ayarları (Next.js 15+ ile stabil) =====
  turbopack: {
    // Loader tanımları (eski experimental.turbo.loaders yerine)
    rules: {
      '*.md': ['text-loader'], // Örnek: Markdown dosyaları için
    },
  },

  // ===== Sunucu Paketleri =====
  serverExternalPackages: [
    'jose',      // JWT işlemleri için
    'bcryptjs',  // Şifre hashleme
    'mssql'      // SQL Server bağlantısı
  ],

  // ===== Görsel Optimizasyonları =====
  images: {
    domains: [
      'localhost',       // Yerel geliştirme
      'flashcardapp.com' // Production domain
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ===== Uluslararasılaştırma (App Router'da farklı yapılandırma gerekir) =====
  // Not: i18n ayarları app/[lang]/layout.tsx'te yapılmalı
  // i18n: { locales: ['tr', 'en'], defaultLocale: 'tr' },

  // ===== Derleme Ayarları =====
  typescript: {
    ignoreBuildErrors: false, // Production'da false kalmalı
  },
  eslint: {
    ignoreDuringBuilds: false, // Production'da false kalmalı
  },

  // ===== Güvenlik Başlıkları =====
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
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },

  // ===== Webpack Özel Ayarları (Opsiyonel) =====
  webpack: (config, { isServer }) => {
    // Özel yapılandırmalar (örneğin SVG yükleyici)
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  }
}

export default nextConfig