// T046 - Implement DownloadButton component
'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { trackEvent } from '@/lib/analytics';

interface DownloadButtonProps {
  pdfUrl: string;
  fileName?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showIcon?: boolean;
}

export function DownloadButton({
  pdfUrl,
  fileName = 'Evera_Protocol_Whitepaper.pdf',
  variant = 'primary',
  size = 'medium',
  className = '',
  showIcon = true,
}: DownloadButtonProps): JSX.Element {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Track download event
      trackEvent('whitepaper_download', {
        fileName,
        format: 'pdf',
        source: 'download_button',
      });

      // Fetch the PDF
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Track successful download
      trackEvent('whitepaper_download_success', {
        fileName,
      });
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError('Failed to download. Please try again.');
      
      // Track failed download
      trackEvent('whitepaper_download_error', {
        fileName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        variant={variant}
        size={size}
        onClick={handleDownload}
        disabled={isDownloading}
        className="relative"
      >
        {isDownloading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Downloading...
          </>
        ) : (
          <>
            {showIcon && (
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
            Download Whitepaper (PDF)
          </>
        )}
      </Button>
      
      {downloadError && (
        <p className="text-coral text-sm mt-2" role="alert">
          {downloadError}
        </p>
      )}
    </div>
  );
}

// Compact version for inline use
export function DownloadLink({
  pdfUrl,
  fileName = 'Evera_Protocol_Whitepaper.pdf',
  className = '',
}: {
  pdfUrl: string;
  fileName?: string;
  className?: string;
}): JSX.Element {
  const handleClick = () => {
    trackEvent('whitepaper_download', {
      fileName,
      format: 'pdf',
      source: 'inline_link',
    });
  };

  return (
    <a
      href={pdfUrl}
      download={fileName}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-gold hover:text-gold/80 font-semibold transition-colors ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download PDF
    </a>
  );
}
