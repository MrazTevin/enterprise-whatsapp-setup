import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Optional: only use if you're avoiding Vercel image optimization
  },
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
