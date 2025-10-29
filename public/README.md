# Static Assets

This directory contains all static assets for the Evera Protocol landing page.

## Directory Structure

### `/images/`
- **`/team/`** - Team member photos (recommended: 400x400px, WebP format)
  - `niceface.jpg` - Founder photo
  - `sarah-chen.jpg` - CTO photo
  - `marcus-rodriguez.jpg` - Product Lead photo
  - `emily-watson.jpg` - Research Officer photo
  - `james-liu.jpg` - Blockchain Advisor photo
  - `amanda-foster.jpg` - Media Advisor photo

- **`/hero/`** - Hero section background images (recommended: 1920x1080px, WebP format)
  - `homepage-hero.webp` - Main homepage hero background
  - `token-hero.webp` - Token page hero background
  - `about-hero.webp` - About page hero background

- **`/diagrams/`** - Architecture and technical diagrams (SVG format preferred)
  - `architecture-diagram.svg` - Protocol architecture overview
  - `verification-flow.svg` - Verification process flowchart
  - `token-flow.svg` - Token economics flow diagram

- **`/pitch/`** - Pitch deck slide images
  - `architecture.svg` - How Evera works diagram
  - `market-chart.png` - Market size visualization
  - `competitive-matrix.png` - Competitive analysis

- **`/logos/`** - Brand logos and icons
  - `evera-logo.svg` - Full color logo
  - `evera-logo-white.svg` - White logo for dark backgrounds
  - `evera-icon.svg` - Icon only (for favicon)
  - `evera-wordmark.svg` - Text-only logo

### `/documents/`
- `evera-whitepaper.pdf` - Complete technical whitepaper (PDF format)
- `evera-pitch-deck.pdf` - Investor pitch deck (PDF format)
- `evera-pitch-deck.pptx` - Editable pitch deck (PowerPoint format)
- `evera-litepaper.pdf` - Condensed version for quick reading

## Image Optimization Guidelines

### Recommended Formats
- **Photos**: WebP format (fallback: JPG)
- **Diagrams/Logos**: SVG format (vector, scalable)
- **Icons**: SVG or optimized PNG with transparency

### Compression
- Use tools like Squoosh, TinyPNG, or ImageOptim
- Target file sizes:
  - Hero images: < 200KB
  - Team photos: < 50KB
  - Diagrams: < 100KB (PNG), unlimited (SVG)
  - Logos: < 20KB

### Responsive Sizes
Generate multiple sizes for responsive images:
- **Desktop**: 1920w, 1440w, 1024w
- **Tablet**: 768w, 640w
- **Mobile**: 480w, 320w

### Next.js Image Component
All images should be loaded through Next.js `<Image>` component for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero/homepage-hero.webp"
  alt="Evera Protocol Network"
  width={1920}
  height={1080}
  priority={true}
  placeholder="blur"
/>
```

## Brand Assets

Official brand assets can be downloaded from:
- [Evera Brand Kit](https://evera.network/brand)

## License

All images and documents in this directory are proprietary to Evera Protocol.
Unauthorized use is prohibited.
