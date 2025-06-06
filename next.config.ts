import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/whatsapp-pitch-deck' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/whatsapp-pitch-deck' : '',
}

export default nextConfig
