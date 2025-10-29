// T025 - Implement Navigation component
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NavigationLink } from '@/types';

export interface NavigationProps {
  links: NavigationLink[];
  variant?: 'horizontal' | 'vertical';
  className?: string;
  onLinkClick?: () => void;
}

export function Navigation({
  links,
  variant = 'horizontal',
  className = '',
  onLinkClick,
}: NavigationProps): JSX.Element {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle anchor links (smooth scroll)
    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      
      // If on same page, just scroll
      if (!path || pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to page first, then scroll
        window.location.href = href;
      }
    }
    onLinkClick?.();
  };

  const containerClasses = variant === 'horizontal'
    ? `flex items-center gap-8 ${className}`
    : `flex flex-col gap-4 ${className}`;

  const linkBaseClasses = 'relative font-semibold transition-all duration-300';
  
  const linkClasses = (link: NavigationLink, active: boolean) => {
    const highlighted = link.highlighted
      ? 'text-gold hover:text-gold/80'
      : active
      ? 'text-gold'
      : 'text-charcoal hover:text-gold';
    
    return `${linkBaseClasses} ${highlighted}`;
  };

  return (
    <nav className={containerClasses}>
      {links.map((link) => {
        const active = isActive(link.href);
        const isExternal = link.external || link.href.startsWith('http');

        return (
          <motion.div
            key={link.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={link.href}
              className={linkClasses(link, active)}
              onClick={(e) => handleClick(e, link.href)}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {link.label}
              {active && !link.highlighted && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
