// T065 - Root layout implementation
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://evera.network'),
  title: {
    default: 'Evera Protocol - Verifiable Truth for the Information Age',
    template: '%s | Evera Protocol',
  },
  description:
    'Blockchain-based decentralized information verification platform. Fight misinformation with transparent content attribution, fact-checking, and reputation scoring.',
  keywords: [
    'blockchain',
    'verification',
    'truth',
    'information',
    'decentralized',
    'crypto',
    'token',
    'presale',
    'fact-checking',
    'content attribution',
    'Web3',
    'misinformation',
  ],
  authors: [{ name: 'Evera Protocol', url: 'https://evera.network' }],
  creator: 'Evera Protocol',
  publisher: 'Evera Protocol',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://evera.network',
    siteName: 'Evera Protocol',
    title: 'Evera Protocol - Verifiable Truth for the Information Age',
    description:
      'Blockchain-based decentralized information verification. Join our presale.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evera Protocol - Decentralized Information Verification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evera Protocol - Verifiable Truth for the Information Age',
    description:
      'Blockchain-based information verification. Fight misinformation.',
    creator: '@EveraProtocol',
    images: ['/twitter-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* T074 - Performance: Resource hints for external domains */}
        <link rel="preconnect" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="preconnect" href="https://api.resend.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        
        {/* Plausible Analytics - Privacy-friendly analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <>
            <Script
              defer
              data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
            {/* Enable custom event tracking */}
            <Script id="plausible-custom-events" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased font-sans bg-white text-charcoal">
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-charcoal focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

