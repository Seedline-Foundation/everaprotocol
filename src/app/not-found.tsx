// T071 - Implement 404 not-found page
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Evera Protocol',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound(): JSX.Element {
  const popularLinks = [
    { label: 'Homepage', href: '/', description: 'Return to our homepage' },
    { label: 'Whitepaper', href: '/whitepaper', description: 'Read our technical whitepaper' },
    { label: 'Token Presale', href: '/token', description: 'Join the token presale' },
    { label: 'About Us', href: '/about', description: 'Learn more about Evera Protocol' },
    { label: 'Careers', href: '/careers', description: 'Join our team' },
    { label: 'Roadmap', href: '/milestones', description: 'View our development progress' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-stone-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center py-16">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gold/10 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-charcoal mb-4">404</h1>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Page Not Found</h2>
        <p className="text-lg text-charcoal/70 mb-12 max-w-2xl mx-auto">
          Looks like this page has been verified out of existence! The page you&apos;re looking for
          doesn&apos;t exist or may have been moved.
        </p>

        {/* Popular Links */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-charcoal mb-6">Popular Pages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white hover:bg-gold/5 border border-stone-200 hover:border-gold/30 rounded-lg p-6 transition-all hover:shadow-md text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-charcoal group-hover:text-gold transition-colors">
                    {link.label}
                  </h4>
                  <svg
                    className="w-5 h-5 text-charcoal/40 group-hover:text-gold group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-charcoal/60">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold/90 text-charcoal font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Homepage
          </Link>
          <Link
            href="/about#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-50 text-charcoal font-semibold rounded-lg border-2 border-charcoal transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Support
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-12 text-sm text-charcoal/50">
          If you believe this is an error, please{' '}
          <a
            href="mailto:support@evera.network"
            className="text-gold hover:text-gold/80 underline transition-colors"
          >
            contact our support team
          </a>
          .
        </p>
      </div>
    </main>
  );
}
