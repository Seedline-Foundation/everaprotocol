// T043 - Implement SlideNavigation component
'use client';

import { motion } from 'framer-motion';

interface SlideNavigationProps {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  progress: number;
  className?: string;
}

export function SlideNavigation({
  currentIndex,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
  progress,
  className = '',
}: SlideNavigationProps): JSX.Element {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <div className={`absolute inset-x-0 bottom-0 z-50 ${className}`}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-8 py-6">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            transition-all duration-200
            ${
              isFirst
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-white/10 hover:scale-105'
            }
          `}
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-white font-semibold hidden md:inline">
            Previous
          </span>
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`
                transition-all duration-200
                ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gold rounded-full'
                    : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isLast}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            transition-all duration-200
            ${
              isLast
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-white/10 hover:scale-105'
            }
          `}
          aria-label="Next slide"
        >
          <span className="text-white font-semibold hidden md:inline">
            Next
          </span>
          <svg
            className="w-6 h-6 text-white"
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
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
        <span className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
}

// Minimal navigation variant (just dots)
export function SlideNavigationMinimal({
  currentIndex,
  totalSlides,
  onGoToSlide,
  className = '',
}: {
  currentIndex: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
  className?: string;
}): JSX.Element {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onGoToSlide(index)}
          className={`
            transition-all duration-200
            ${
              index === currentIndex
                ? 'w-8 h-3 bg-gold rounded-full'
                : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentIndex ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}

// Arrow navigation only
export function SlideNavigationArrows({
  currentIndex,
  totalSlides,
  onPrevious,
  onNext,
  className = '',
}: {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}): JSX.Element {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`
          absolute left-4 top-1/2 -translate-y-1/2 z-50
          p-3 rounded-full bg-black/30 backdrop-blur-sm
          transition-all duration-200
          ${
            isFirst
              ? 'opacity-0 cursor-not-allowed'
              : 'hover:bg-black/50 hover:scale-110'
          }
          ${className}
        `}
        aria-label="Previous slide"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={isLast}
        className={`
          absolute right-4 top-1/2 -translate-y-1/2 z-50
          p-3 rounded-full bg-black/30 backdrop-blur-sm
          transition-all duration-200
          ${
            isLast
              ? 'opacity-0 cursor-not-allowed'
              : 'hover:bg-black/50 hover:scale-110'
          }
          ${className}
        `}
        aria-label="Next slide"
      >
        <svg
          className="w-8 h-8 text-white"
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
      </button>
    </>
  );
}
