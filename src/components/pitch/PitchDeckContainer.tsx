// PitchDeckContainer - Assembles complete pitch deck experience
'use client';

import { SlideContainer } from './SlideContainer';
import { PitchSlide } from './PitchSlide';
import { SlideNavigation } from './SlideNavigation';
import { pitchSlides } from '@/content/pitch-slides';
import { Button } from '@/components/shared/Button';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export function PitchDeckContainer(): JSX.Element {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleDownload = (format: 'pdf' | 'pptx') => {
    trackEvent('pitch_deck_download', {
      format,
      source: 'pitch_page',
    });

    // In production, this would download the actual file
    // For now, we'll create a placeholder
    const fileName = `Evera_Protocol_Pitch_Deck.${format}`;
    console.log(`Downloading ${fileName}`);

    // TODO: Implement actual download once files are generated
    alert(`Pitch deck ${format.toUpperCase()} download will be available soon!`);
    setShowDownloadMenu(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Download Button (Fixed Position) */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
            className="bg-black/30 backdrop-blur-sm text-white border-white/30 hover:bg-black/50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </Button>

          {/* Download Menu */}
          {showDownloadMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDownloadMenu(false)}
              />

              {/* Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full px-4 py-3 text-left text-charcoal hover:bg-stone-50 transition-colors flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5 text-coral"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2v2H4v16h16V4h-3V2h-2v2H9V2H7zm2 6v2h6V8H9zm0 4v2h6v-2H9zm0 4v2h4v-2H9z" />
                  </svg>
                  <div>
                    <div className="font-semibold">PDF</div>
                    <div className="text-sm text-charcoal/60">
                      Best for viewing
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleDownload('pptx')}
                  className="w-full px-4 py-3 text-left text-charcoal hover:bg-stone-50 transition-colors flex items-center gap-3 border-t border-stone-200"
                >
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 2v2H4v16h16V4h-4V2h-2v2h-4V2H8zm1 6h6v2H9V8zm0 4h6v2H9v-2z" />
                  </svg>
                  <div>
                    <div className="font-semibold">PowerPoint</div>
                    <div className="text-sm text-charcoal/60">
                      Best for editing
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pitch Deck Slides */}
      <SlideContainer slides={pitchSlides} autoPlayInterval={8000}>
        {({
          currentSlide,
          currentIndex,
          totalSlides,
          nextSlide,
          previousSlide,
          goToSlide,
          progress,
        }) => (
          <>
            {/* Current Slide */}
            <div className="relative w-full h-screen overflow-hidden">
              <PitchSlide slide={currentSlide} isActive={true} />
            </div>

            {/* Navigation Controls */}
            <SlideNavigation
              currentIndex={currentIndex}
              totalSlides={totalSlides}
              onPrevious={previousSlide}
              onNext={nextSlide}
              onGoToSlide={goToSlide}
              progress={progress}
            />

            {/* Slide Counter (Desktop) */}
            <div className="hidden md:block absolute top-6 left-6 z-50">
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-white/80 text-sm font-medium">
                  Slide {currentIndex + 1} of {totalSlides}
                </span>
              </div>
            </div>

            {/* Exit/Home Button */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 md:left-auto md:translate-x-0 md:left-6 md:top-20">
              <Button
                variant="outline"
                href="/"
                className="bg-black/30 backdrop-blur-sm text-white border-white/30 hover:bg-black/50 text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Button>
            </div>

            {/* Keyboard Shortcuts Help (Toggle) */}
            <div className="hidden md:block absolute bottom-24 right-6 z-50">
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white/60 text-xs">
                <div className="font-semibold mb-1">Keyboard Shortcuts:</div>
                <div className="space-y-0.5">
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">
                      ←
                    </kbd>{' '}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">
                      →
                    </kbd>{' '}
                    Navigate
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">
                      Space
                    </kbd>{' '}
                    Next
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">
                      Home
                    </kbd>{' '}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">
                      End
                    </kbd>{' '}
                    First/Last
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SlideContainer>
    </div>
  );
}
