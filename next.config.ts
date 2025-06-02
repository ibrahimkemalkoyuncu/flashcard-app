import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['jose', 'bcryptjs'],
  reactStrictMode: true,
}

export default nextConfig