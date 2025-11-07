/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  typescript: {
    // Don't fail build on type errors during development
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.evera.network',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // T074 - Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts', 'swiper'],
  },
  // Enable compression
  compress: true,
  // Generate build ID for cache busting
  generateBuildId: async () => {
    return process.env.BUILD_ID || `build-${Date.now()}`;
  },
};

export default nextConfig;

