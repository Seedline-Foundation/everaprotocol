// T023 - Implement Header component
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/content/navigation';
import { Button } from '@/components/shared/Button';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';

export interface HeaderProps {
  variant?: 'default' | 'transparent';
}

export function Header({ variant = 'default' }: HeaderProps): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine background based on variant and scroll state
  const getBackgroundClass = () => {
    if (variant === 'transparent' && !isScrolled) {
      return 'bg-transparent';
    }
    return 'bg-charcoal shadow-lg';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getBackgroundClass()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-2xl font-bold text-gold group-hover:text-gold/80 transition-colors">
                EVERA
              </div>
              <div className="hidden sm:block text-sm text-white/60">
                Protocol
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation
                links={mainNavigation.filter((link) => !link.mobileOnly)}
                variant="horizontal"
              />
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="primary" size="small" href="/token#signup">
                Join Presale
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={mainNavigation.filter((link) => !link.desktopOnly)}
      />
    </>
  );
}
