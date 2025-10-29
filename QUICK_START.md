# Evera Protocol Landing Page - Quick Start Guide

**Status**: Phase 3.1 Complete ✅  
**Last Updated**: October 29, 2025

---

## Getting Started

### Prerequisites
- Node.js 20+ installed
- pnpm, npm, or yarn package manager
- Git for version control

### Installation

```powershell
# Navigate to project
cd "c:\Users\onech\Desktop\Evera Protocol\evera-landing"

# Install dependencies
npm install

# Create local environment file
Copy-Item .env.example .env.local

# Edit .env.local with your API keys
notepad .env.local
```

### Development

```powershell
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Available Scripts

```powershell
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Type Checking
npm run type-check   # Run TypeScript type checking

# Linting
npm run lint         # Run ESLint

# Building
npm run build        # Create production build
npm start            # Start production server
```

---

## Project Structure

```
evera-landing/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── api/               # API routes
│   │       ├── subscribe/     # Email subscription endpoint
│   │       └── analytics/     # Analytics tracking endpoint
│   │
│   ├── components/            # React components
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── shared/           # Reusable UI components
│   │   ├── token/            # Token page components
│   │   ├── pitch/            # Pitch deck components
│   │   ├── whitepaper/       # Whitepaper components
│   │   ├── about/            # About page components
│   │   └── careers/          # Careers page components
│   │
│   ├── content/              # Static content data
│   │   ├── team.ts           # Team member data
│   │   ├── navigation.ts     # Navigation links
│   │   ├── presale.ts        # Presale configuration
│   │   ├── features.ts       # Homepage features
│   │   ├── milestones.ts     # Roadmap milestones
│   │   ├── careers.ts        # Job listings
│   │   └── pitch-slides.ts   # Pitch deck slides
│   │
│   ├── lib/                  # Utility functions
│   │   ├── analytics.ts      # Analytics tracking utilities
│   │   └── utils.ts          # General utilities
│   │
│   └── types/                # TypeScript definitions
│       └── index.ts          # All type definitions
│
├── public/                    # Static assets
│   ├── images/
│   │   ├── team/             # Team photos
│   │   ├── hero/             # Hero backgrounds
│   │   ├── logos/            # Brand logos
│   │   ├── pitch/            # Pitch deck images
│   │   └── diagrams/         # Architecture diagrams
│   └── documents/            # PDF downloads
│
├── tests/                     # Test files
│   ├── contract/             # API contract tests
│   ├── components/           # Component tests
│   └── integration/          # E2E tests
│
└── Configuration files
    ├── .env.example          # Environment template
    ├── .env.local           # Local environment (gitignored)
    ├── .eslintrc.json       # ESLint rules
    ├── .prettierrc          # Prettier config
    ├── next.config.mjs      # Next.js config
    ├── tailwind.config.ts   # Tailwind config
    ├── tsconfig.json        # TypeScript config
    └── package.json         # Dependencies
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Required for production
CONVERTKIT_API_KEY=your_api_key_here
PLAUSIBLE_DOMAIN=evera.network
NEXT_PUBLIC_SITE_URL=https://evera.network

# Social links (optional in development)
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/evera
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/EveraProtocol
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/evera
NEXT_PUBLIC_GITHUB_URL=https://github.com/evera-protocol
```

---

## Tech Stack

### Core Framework
- **Next.js 14.2+** - React framework with App Router
- **React 18.3+** - UI library
- **TypeScript 5.3+** - Type safety

### Styling
- **Tailwind CSS 3.4+** - Utility-first CSS
- **Framer Motion 11+** - Animations

### Forms & Validation
- **React Hook Form 7+** - Form management
- **Zod 3+** - Schema validation

### Data Visualization
- **Recharts 2+** - Charts for token economics

### Content
- **MDX** - Markdown with JSX for whitepaper
- **Swiper 11+** - Slider for pitch deck

---

## Development Workflow

### 1. Create New Component

```tsx
// src/components/shared/MyComponent.tsx
'use client'; // Only if you need interactivity

import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
  description: string;
}

export function MyComponent({ title, description }: MyComponentProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-stone rounded-lg"
    >
      <h3 className="text-2xl font-bold text-charcoal">{title}</h3>
      <p className="text-lg text-charcoal/70">{description}</p>
    </motion.div>
  );
}
```

### 2. Add to Page

```tsx
// src/app/page.tsx
import { MyComponent } from '@/components/shared/MyComponent';

export default function HomePage(): JSX.Element {
  return (
    <main>
      <MyComponent 
        title="Welcome" 
        description="This is my component" 
      />
    </main>
  );
}
```

### 3. Add Content Data

```typescript
// src/content/my-data.ts
export const myData = [
  {
    id: 'item-1',
    title: 'Item 1',
    description: 'Description 1',
  },
  // ... more items
];
```

### 4. Add Type Definitions

```typescript
// src/types/index.ts
export interface MyDataItem {
  id: string;
  title: string;
  description: string;
}
```

---

## Code Style Guidelines

### TypeScript
- ✅ Always use explicit types
- ✅ Avoid `any` type
- ✅ Define interfaces for props
- ✅ Use type inference where possible

### React Components
- ✅ Use Server Components by default
- ✅ Add `'use client'` only when needed
- ✅ Define prop interfaces
- ✅ Export component and props interface

### Styling
- ✅ Use Tailwind utility classes
- ✅ Use brand colors from config
- ✅ Follow mobile-first approach
- ✅ Use responsive prefixes (sm:, md:, lg:)

### File Naming
- ✅ Components: PascalCase (Button.tsx)
- ✅ Utilities: camelCase (formatDate.ts)
- ✅ Pages: lowercase (page.tsx)
- ✅ Types: PascalCase (UserProfile.ts)

---

## Brand Colors

Use these Tailwind classes:

```tsx
// Primary dark
className="bg-charcoal text-white"

// Accent/CTA
className="bg-gold text-charcoal"

// Light background
className="bg-stone text-charcoal"

// Error/accent
className="bg-coral text-white"
```

---

## Common Tasks

### Add New Page

```powershell
# Create page directory
New-Item -ItemType Directory -Path "src/app/mypage"

# Create page file
New-Item -ItemType File -Path "src/app/mypage/page.tsx"
```

```tsx
// src/app/mypage/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page - Evera Protocol',
  description: 'Description for SEO',
};

export default function MyPage(): JSX.Element {
  return (
    <main className="container-custom section-padding">
      <h1>My Page</h1>
    </main>
  );
}
```

### Add API Route

```powershell
# Create API route directory
New-Item -ItemType Directory -Path "src/app/api/myroute"

# Create route file
New-Item -ItemType File -Path "src/app/api/myroute/route.ts"
```

```tsx
// src/app/api/myroute/route.ts
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: 'Hello World' });
}
```

### Update Team Members

```typescript
// src/content/team.ts
// Just add a new object to the array:
{
  id: 'new-member',
  name: 'New Member',
  role: 'Position',
  bio: 'Biography...',
  photo: '/images/team/new-member.jpg',
  twitter: 'twitter_handle',
  linkedin: 'https://linkedin.com/in/profile',
  isFounder: false,
  isAdvisor: false,
  displayOrder: 7,
}
```

---

## Troubleshooting

### Build Errors

**Error**: `Cannot find module '@next/mdx'`
```powershell
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-highlight
```

**Error**: `The 'border-border' class does not exist`
```css
/* src/app/globals.css - Remove invalid Tailwind class */
* {
  box-sizing: border-box; /* Instead of @apply border-border */
}
```

### Type Errors

**Error**: Missing return type
```typescript
// Add explicit return type
export function MyComponent(): JSX.Element {
  return <div>Content</div>;
}
```

### ESLint Warnings

**Warning**: Unexpected console statement
```typescript
// Use console.error or console.warn for allowed logging
console.error('Error:', error);
```

---

## Testing (Phase 3.2)

Testing infrastructure is ready:

```
tests/
├── contract/      # API route tests
├── components/    # Component tests
└── integration/   # E2E tests with Playwright
```

Install testing dependencies:
```powershell
npm install -D @testing-library/react @testing-library/jest-dom jest @playwright/test
```

---

## Deployment

### Vercel (Recommended)

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:
- `CONVERTKIT_API_KEY`
- `PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DISCORD_URL`
- `NEXT_PUBLIC_TWITTER_URL`
- `NEXT_PUBLIC_TELEGRAM_URL`
- `NEXT_PUBLIC_GITHUB_URL`

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)

### Project Files
- `PHASE_3_1_COMPLETE.md` - Detailed completion report
- `specs/001-develop-an-eye/` - Feature specifications
- `public/README.md` - Asset guidelines

---

## Support

For questions or issues:
1. Check `PHASE_3_1_COMPLETE.md` for details
2. Review `.github/copilot-instructions.md` for patterns
3. Consult `specs/001-develop-an-eye/spec.md` for requirements

---

**Status**: ✅ Ready for Development

**Next Phase**: 3.2 - Tests First (TDD)

**Happy Coding!** 🚀
