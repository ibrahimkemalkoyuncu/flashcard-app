import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Çevre değişkenlerini istemci tarafında kullanılabilir yapma
  env: {
    DB_SERVER: process.env.DB_SERVER,
    DB_NAME: process.env.DB_NAME,
    // Hassas bilgileri istemci tarafına göndermeyin!
  },
  // Diğer Next.js yapılandırmaları...
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;