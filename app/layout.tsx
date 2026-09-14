import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://benlee.dev'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F1E8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export const metadata: Metadata = {
  // 기본 메타데이터
  title: {
    default: 'Ben Lee | Back-end & ABAP Developer',
    template: '%s | Ben Lee',
  },
  description:
    '안녕하세요. 이재헌입니다. Back-end 및 ABAP 개발자로서 다양한 프로젝트와 생각을 공유합니다.',
  keywords: [
    'Ben Lee',
    '이재헌',
    'Developer',
    '개발자',
    'Back-end',
    'ABAP',
    'Portfolio',
    '포트폴리오',
  ],
  authors: [{ name: 'Ben Lee (이재헌)', url: siteUrl }],
  creator: 'Ben Lee',

  // 검색엔진 설정
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, KakaoTalk 등)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'Ben Lee Portfolio',
    title: 'Ben Lee | Back-end & ABAP Developer',
    description:
      '안녕하세요. 이재헌입니다. Back-end 및 ABAP 개발자로서 다양한 프로젝트와 생각을 공유합니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ben Lee - Developer Portfolio',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Ben Lee | Back-end & ABAP Developer',
    description:
      '안녕하세요. 이재헌입니다. Back-end 및 ABAP 개발자로서 다양한 프로젝트와 생각을 공유합니다.',
    images: ['/og-image.png'],
  },

  // 아이콘 설정
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // 기타
  category: 'technology',
}

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ben Lee (이재헌)',
  url: siteUrl,
  jobTitle: 'Back-end & ABAP Developer',
  description:
    '안녕하세요. 이재헌입니다. Back-end 및 ABAP 개발자로서 다양한 프로젝트와 생각을 공유합니다.',
  email: 'javerdose@gmail.com',
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
