// T026 - Implement MobileMenu component
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { NavigationLink } from '@/types';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavigationLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps): JSX.Element {
  useEffect(() => {
    // Handle ESC key press
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-stone">
                <h2 className="text-xl font-bold text-charcoal">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-stone rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-charcoal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <Navigation
                  links={links}
                  variant="vertical"
                  onLinkClick={onClose}
                  className="text-lg"
                />
              </div>

              {/* Footer */}
              <div className="p-6 border-t-2 border-stone">
                <p className="text-sm text-charcoal/60 text-center">
                  © {new Date().getFullYear()} Evera Protocol
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
