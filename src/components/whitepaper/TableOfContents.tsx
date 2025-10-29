// T045 - Implement TableOfContents component
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/shared/Card';

export interface TocItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({
  items,
  className = '',
}: TableOfContentsProps): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getLevelClass = (level: 1 | 2 | 3): string => {
    switch (level) {
      case 1:
        return 'pl-0 font-semibold';
      case 2:
        return 'pl-4 font-medium';
      case 3:
        return 'pl-8 font-normal';
    }
  };

  return (
    <Card
      padding="medium"
      shadow="medium"
      className={`sticky top-24 ${className}`}
    >
      <nav aria-label="Table of contents">
        <h3 className="text-lg font-bold text-charcoal mb-4">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  w-full text-left py-2 px-3 rounded-lg
                  transition-colors duration-200
                  ${getLevelClass(item.level)}
                  ${
                    activeSection === item.id
                      ? 'bg-gold text-charcoal'
                      : 'text-charcoal/70 hover:bg-stone-50 hover:text-charcoal'
                  }
                `}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
}

// Compact version for mobile
export function TableOfContentsDropdown({
  items,
  className = '',
}: TableOfContentsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  const activeItem = items.find((item) => item.id === activeSection);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-charcoal/20 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <span className="font-semibold text-charcoal">
          {activeItem?.title || 'Table of Contents'}
        </span>
        <svg
          className={`w-5 h-5 text-charcoal transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-charcoal/20 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <ul className="py-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`
                      w-full text-left py-2 px-4
                      transition-colors duration-200
                      ${item.level === 2 ? 'pl-8' : item.level === 3 ? 'pl-12' : 'pl-4'}
                      ${
                        activeSection === item.id
                          ? 'bg-gold text-charcoal font-semibold'
                          : 'text-charcoal/70 hover:bg-stone-50'
                      }
                    `}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
