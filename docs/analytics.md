# Analytics Guide

This guide explains the analytics tracking implementation for the Evera Protocol landing page.

## 🎯 Analytics Overview

We use **Plausible Analytics** for privacy-friendly, cookie-free analytics that respects user privacy and complies with GDPR, CCPA, and PECR regulations.

### Why Plausible?

✅ **Privacy-Friendly**
- No cookies or personal data collection
- Fully GDPR compliant
- Respects Do Not Track browser setting
- Data owned by you, not sold to third parties

✅ **Lightweight**
- <1KB script size
- No impact on page performance
- No consent banners needed

✅ **Transparent**
- Public dashboards available
- Simple, easy-to-understand metrics
- Real-time data

---

## 📊 Tracked Events

### Automatic Events

**Page Views**
- Tracked automatically by Plausible
- URL, referrer, device type, country
- No custom code needed

### Custom Events

#### 1. Email Capture (`email_capture`)

**Triggered when:** User successfully subscribes to email list

**Properties:**
```typescript
{
  source: string;      // Where form was submitted (e.g., 'homepage-hero', 'footer')
  interests: string[]; // Selected interests (investor, publisher, verifier, etc.)
}
```

**Implementation:**
```typescript
import { trackEmailCapture } from '@/lib/analytics';

// After successful email submission
trackEmailCapture('homepage-hero', ['investor', 'publisher']);
```

**Usage:**
- Measure email capture rate by page section
- Understand audience interests
- Optimize form placement

---

#### 2. CTA Click (`cta_click`)

**Triggered when:** User clicks any call-to-action button

**Properties:**
```typescript
{
  ctaText: string;     // Button text (e.g., 'Join Presale')
  ctaPosition: string; // Where on page (e.g., 'hero', 'token-page-primary')
}
```

**Implementation:**
```typescript
import { trackCTAClick } from '@/lib/analytics';

// On button click
trackCTAClick('Join Presale', 'hero');
```

**Usage:**
- Measure CTA effectiveness
- A/B test button copy
- Optimize button placement

---

#### 3. Whitepaper Download (`whitepaper_download`)

**Triggered when:** User downloads whitepaper PDF

**Properties:**
```typescript
{
  downloadFormat: string; // File format (e.g., 'pdf', 'epub')
}
```

**Implementation:**
```typescript
import { trackWhitepaperDownload } from '@/lib/analytics';

// On download button click
trackWhitepaperDownload('pdf');
```

**Usage:**
- Measure content engagement
- Track conversion from visitor to interested lead

---

#### 4. Social Share (`social_share`)

**Triggered when:** User shares content on social media

**Properties:**
```typescript
{
  shareDestination: string; // Platform (e.g., 'twitter', 'linkedin', 'telegram')
}
```

**Implementation:**
```typescript
import { trackSocialShare } from '@/lib/analytics';

// On share button click
trackSocialShare('twitter');
```

**Usage:**
- Measure viral growth
- Identify most effective social platforms

---

#### 5. External Link Click (`external_link`)

**Triggered when:** User clicks link to external site

**Properties:**
```typescript
{
  externalUrl: string; // Destination URL
}
```

**Implementation:**
```typescript
import { trackExternalLink } from '@/lib/analytics';

// On external link click
trackExternalLink('https://discord.gg/evera');
```

**Usage:**
- Track community engagement
- Measure referrals to partners

---

## 🛠️ Implementation

### Setup

1. **Add Plausible Script** (already in `layout.tsx`)
```tsx
<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

2. **Configure Environment Variable**
```env
PLAUSIBLE_DOMAIN=evera.network
```

3. **Import Analytics Functions**
```typescript
import {
  trackEvent,
  trackCTAClick,
  trackEmailCapture,
  trackWhitepaperDownload,
  trackSocialShare,
  trackExternalLink,
} from '@/lib/analytics';
```

### Usage in Components

```typescript
'use client';

import { trackCTAClick } from '@/lib/analytics';

export function HeroSection() {
  const handleJoinPresale = () => {
    // Track analytics
    trackCTAClick('Join Presale', 'hero');
    
    // Navigate or perform action
    window.location.href = '/token';
  };

  return (
    <button onClick={handleJoinPresale}>
      Join Presale
    </button>
  );
}
```

### Do Not Track Support

Analytics automatically respects the browser's Do Not Track (DNT) setting:

```typescript
function isDNTEnabled(): boolean {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

// Tracking is skipped if DNT is enabled
if (isDNTEnabled()) {
  console.log('[Analytics] Tracking disabled due to Do Not Track');
  return;
}
```

---

## 📈 Viewing Analytics Data

### Plausible Dashboard

Access dashboard at: `https://plausible.io/evera.network`

**Available Metrics:**
- Real-time visitors
- Page views
- Bounce rate
- Visit duration
- Top pages
- Traffic sources
- Countries
- Devices (desktop/mobile/tablet)
- Browsers
- Operating systems

### Custom Events

View custom events in **Goal Conversions** section:
- Event name
- Number of conversions
- Conversion rate
- Revenue (if applicable)

### Filters

Filter data by:
- Date range (today, 7 days, 30 days, custom)
- Country
- Device type
- Browser
- Operating system
- Page path

---

## 🎯 Key Performance Indicators (KPIs)

### Primary KPIs

**Email Capture Rate**
```
(Total email captures / Total visitors) × 100
Target: >20%
```

**Bounce Rate**
```
(Single-page sessions / Total sessions) × 100
Target: <40%
```

**Conversion Rate (Presale Interest)**
```
(Presale CTA clicks / Total visitors) × 100
Target: >5%
```

### Secondary KPIs

- **Average Session Duration**: Target >2 minutes
- **Pages per Session**: Target >3 pages
- **Whitepaper Download Rate**: Target >10%
- **Social Share Rate**: Target >2%

---

## 🔍 Analyzing User Behavior

### Funnel Analysis

**Visitor → Email Subscriber → Presale Participant**

1. **Top of Funnel**: Homepage visitors
2. **Middle of Funnel**: Email captures
3. **Bottom of Funnel**: Presale participation

Track conversion rates at each stage.

### Traffic Sources

**Organic Search**
- SEO performance
- Keyword rankings
- Content discoverability

**Direct Traffic**
- Brand awareness
- Word-of-mouth
- Return visitors

**Referrals**
- Partnership effectiveness
- Media mentions
- Community sharing

**Social Media**
- Twitter/X engagement
- Discord activity
- Telegram community

---

## 🧪 A/B Testing

### Testing Ideas

**Hero Section CTA**
- "Join Presale Now" vs "Get Early Access"
- "Read Whitepaper" vs "Learn More"

**Email Form Placement**
- Above the fold vs below the fold
- Sidebar vs inline

**Button Colors**
- Gold (primary) vs Coral (accent)

### Measuring Results

Compare event conversion rates:
```
Variant A: email_capture events / page views
Variant B: email_capture events / page views
Winner: Highest conversion rate
```

---

## 🔐 Privacy & Compliance

### GDPR Compliance

✅ **No Cookies**: Plausible doesn't use cookies
✅ **No Personal Data**: Only anonymous aggregate data
✅ **Data Ownership**: You own all data
✅ **No Consent Banner**: Not required under GDPR

### Data Retention

- **Raw data**: Stored indefinitely
- **Aggregated reports**: Available forever
- **No PII**: No personally identifiable information collected

### Data Processing Agreement (DPA)

Plausible provides GDPR-compliant DPA:
- Available in account settings
- EU-based data storage
- No data sold to third parties

---

## 🛠️ Custom Analytics (Advanced)

### Create Custom Events

```typescript
import { trackEvent, EventType } from '@/lib/analytics';

// Custom event
trackEvent('pitch_deck_view', {
  slideNumber: 5,
  timeSpent: 120, // seconds
});
```

### Track Scroll Depth

```typescript
'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function ScrollTracker() {
  useEffect(() => {
    let maxScrollDepth = 0;
    
    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = Math.floor(scrollPercentage / 25) * 25;
        
        if ([25, 50, 75, 100].includes(maxScrollDepth)) {
          trackEvent('scroll_depth', { depth: `${maxScrollDepth}%` });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return null;
}
```

---

## 📞 Support & Resources

### Resources

- [Plausible Documentation](https://plausible.io/docs)
- [Plausible API](https://plausible.io/docs/stats-api)
- [Privacy Policy](https://evera.network/privacy)

### Contact

- Email: analytics@evera.network
- Discord: [#analytics channel](https://discord.gg/evera)

---

**Track with confidence, respect user privacy!** 📊
