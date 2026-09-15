/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 로컬 이미지 최적화 설정
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 외부 이미지 도메인 (필요 시 추가)
    remotePatterns: [
      // Supabase Storage
      {
        protocol: 'https',
        hostname: 'bjxatvkmajmicdamrjam.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
