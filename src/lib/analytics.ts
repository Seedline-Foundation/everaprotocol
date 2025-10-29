import { EventType, type EventMetadata } from '@/types';

// Extend Window interface for Plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

const SESSION_STORAGE_KEY = 'evera_session_id';

/**
 * Generate a simple UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a session ID for analytics tracking
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  
  return sessionId;
}

/**
 * Check if user has enabled Do Not Track
 */
function isDNTEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check various DNT headers/settings
  const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Track an analytics event
 * Respects Do Not Track browser setting
 * @param eventType - Type of event to track
 * @param metadata - Additional event-specific data
 */
export function trackEvent(
  eventType: EventType | string,
  metadata?: EventMetadata
): void {
  if (typeof window === 'undefined') return;
  
  // Respect Do Not Track setting
  if (isDNTEnabled()) {
    console.log('[Analytics] Tracking disabled due to Do Not Track setting');
    return;
  }

  const sessionId = getSessionId();
  
  const eventData = {
    sessionId,
    eventType,
    page: window.location.pathname,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
    metadata,
  };

  // Send to our analytics API
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  }).catch((error) => {
    // Fail silently to not disrupt user experience
    console.error('Analytics tracking failed:', error);
  });
  
  // Also send to Plausible if available
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventType, {
        props: metadata,
      });
    } catch (error) {
      console.error('Plausible tracking failed:', error);
    }
  }
}

/**
 * Track page view
 */
export function trackPageView(): void {
  trackEvent(EventType.PageView);
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string, ctaPosition: string): void {
  trackEvent(EventType.CTAClick, {
    ctaText,
    ctaPosition,
  });
}

/**
 * Track email capture
 */
export function trackEmailCapture(source: string, interests: string[]): void {
  trackEvent(EventType.EmailCapture, {
    source,
    interests,
  });
}

/**
 * Track whitepaper download
 */
export function trackWhitepaperDownload(format: string): void {
  trackEvent(EventType.WhitepaperDownload, {
    downloadFormat: format,
  });
}

/**
 * Track social share
 */
export function trackSocialShare(destination: string): void {
  trackEvent(EventType.SocialShare, {
    shareDestination: destination,
  });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string): void {
  trackEvent(EventType.ExternalLink, {
    externalUrl: url,
  });
}
