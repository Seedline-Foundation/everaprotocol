// T024 - Implement Footer component
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { footerLinks, socialLinks } from '@/content/navigation';
import { EmailCaptureForm } from '@/components/shared/EmailCaptureForm';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Social media icon components (simple SVG icons)
  const SocialIcon = ({ platform }: { platform: string }) => {
    const iconPaths = {
      Twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      Discord: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.299 12.299 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z',
      Telegram: 'M18.384 22.779a1.19 1.19 0 001.107.145 1.16 1.16 0 00.724-.84C21.084 18 23.192 7.663 23.983 3.948a.78.78 0 00-.26-.758a.798.798 0 00-.797-.14C18.733 4.602 5.82 9.447.542 11.4a1.02 1.02 0 00-.591.935c-.015.29.145.566.416.694 1.88.9 4.36 1.395 4.36 1.395s1.16 3.52 1.766 5.32c.076.222.249.39.48.445a.661.661 0 00.59-.125l2.523-2.317s2.935 2.16 4.298 3.032z',
      GitHub: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    };
    
    return (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={iconPaths[platform as keyof typeof iconPaths]} />
      </svg>
    );
  };

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter Signup Section */}
      <div className="border-b border-stone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
            <p className="text-stone mb-6">
              Get the latest updates on token presale, roadmap progress, and ecosystem developments.
            </p>
            {!showEmailForm ? (
              <button
                onClick={() => setShowEmailForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 text-charcoal font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Subscribe to Newsletter
              </button>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <EmailCaptureForm
                  source="footer-newsletter"
                  variant="dark"
                  onSuccess={() => {
                    setTimeout(() => setShowEmailForm(false), 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-3xl font-bold text-gold mb-4">EVERA</div>
            </Link>
            <p className="text-stone text-sm mb-6">
              Verifiable Truth for the Information Age. Building the world&apos;s first
              decentralized information verification protocol.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Community Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.filter((link) => link.displayInFooter).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone hover:text-gold transition-colors"
                  aria-label={link.label}
                  title={link.label}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
            <h4 className="font-semibold text-white text-sm mb-2">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-stone/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone text-sm">
              © {currentYear} Evera Protocol. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-stone hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-stone hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-stone hover:text-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
