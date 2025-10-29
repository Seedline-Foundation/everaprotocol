// T041 - Implement SlideContainer component
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PitchSlide as PitchSlideType } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface SlideContainerProps {
  slides: PitchSlideType[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  children: (props: {
    currentSlide: PitchSlideType;
    currentIndex: number;
    totalSlides: number;
    nextSlide: () => void;
    previousSlide: () => void;
    goToSlide: (index: number) => void;
    progress: number;
  }) => React.ReactNode;
}

export function SlideContainer({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
  children,
}: SlideContainerProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / totalSlides) * 100;

  // Track slide view
  useEffect(() => {
    trackEvent('pitch_slide_view', {
      slideId: currentSlide.id,
      slideTitle: currentSlide.title,
      slideIndex: currentIndex,
      category: currentSlide.category,
    });
  }, [currentIndex, currentSlide]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide, goToSlide, totalSlides]);

  // Touch/swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const handleNavigation = (action: () => void) => {
    pauseAutoPlay();
    action();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children({
        currentSlide,
        currentIndex,
        totalSlides,
        nextSlide: () => handleNavigation(nextSlide),
        previousSlide: () => handleNavigation(previousSlide),
        goToSlide: (index: number) => handleNavigation(() => goToSlide(index)),
        progress,
      })}
    </div>
  );
}

// Hook for slide container state (alternative pattern)
export function useSlideContainer(slides: PitchSlideType[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / totalSlides) * 100;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  }, [totalSlides]);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return {
    currentSlide,
    currentIndex,
    totalSlides,
    nextSlide,
    previousSlide,
    goToSlide,
    progress,
    isFirst,
    isLast,
  };
}
