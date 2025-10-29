# Evera Protocol Landing Page# Evera Protocol Landing Page# Evera Protocol Landing PageThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



**Blockchain-based decentralized information verification platform**



[![Next.js](https://img.shields.io/badge/Next.js-14.2+-black?logo=next.js)](https://nextjs.org/)**Blockchain-based Decentralized Information Verification Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?logo=typescript)](https://www.typescriptlang.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)



## 🌟 Overview---Welcome to the Evera Protocol landing page - a high-conversion marketing website for the world's first blockchain-based decentralized information verification platform.## Getting Started



This is the official landing page and web presence for Evera Protocol. Built with Next.js 14+ App Router, TypeScript, and Tailwind CSS for optimal performance and developer experience.



### Key Features## 🚀 Project Overview



- 🎨 Modern, professional design with brand identity

- 📱 Fully responsive (mobile, tablet, desktop)

- ⚡ Performance optimized (Lighthouse >90)This is the official landing page for Evera Protocol - the world's first blockchain-based decentralized information verification platform. The website serves multiple purposes:## 🚀 Quick StartFirst, run the development server:

- ♿ WCAG 2.1 AA accessible

- 🔍 SEO optimized with meta tags and structured data

- 📊 Privacy-friendly Plausible Analytics

- 💌 ConvertKit email integration- Convert visitors into presale email subscribers (target: >20% capture rate)

- 📄 Comprehensive content (whitepaper, pitch deck, roadmap)

- Educate about Evera's value proposition across three audiences: investors, publishers, verifiers

## 🚀 Quick Start

- Build trust through professional design and comprehensive documentationFollow the steps in the [quickstart.md](../specs/001-develop-an-eye/quickstart.md) guide to get started.```bash

### Prerequisites

- Drive engagement with token presale and community initiatives

- Node.js 20+

- pnpm 8+ (recommended)npm run dev



### Installation### Success Metrics



```bash- Bounce rate < 40%### Prerequisites# or

# Clone repository

git clone https://github.com/evera-protocol/evera-landing.git- Email capture rate > 20%

cd evera-landing

- Presale signup intent > 5%yarn dev

# Install dependencies

pnpm install- Page load time < 3 seconds



# Copy environment variables- Lighthouse performance score > 90- Node.js 20+# or

cp .env.example .env.local



# Edit .env.local with your API keys

# - CONVERTKIT_API_KEY---- npm (comes with Node.js)pnpm dev

# - PLAUSIBLE_DOMAIN  

# - NEXT_PUBLIC_SITE_URL



# Run development server## 🛠 Tech Stack# or

pnpm dev

```



Open [http://localhost:3000](http://localhost:3000)### Core Framework### Installationbun dev



## 📁 Project Structure- **Next.js 14.2+** with App Router



```- **React 18+** with Server Components & Client Components```

src/

├── app/              # Next.js 14 App Router pages- **TypeScript 5.3+** (strict mode enabled)

│   ├── page.tsx      # Homepage

│   ├── whitepaper/   # Whitepaper page- **Node.js 20+** runtime```powershell

│   ├── token/        # Token presale page

│   └── api/          # API routes

├── components/       # React components

│   ├── layout/       # Header, Footer, Navigation### Styling & Animation# Navigate to project directoryOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│   ├── home/         # Homepage sections

│   └── shared/       # Reusable UI components- **Tailwind CSS 3.4+** with custom brand colors

├── content/          # Static content data

├── lib/              # Utilities (analytics, validation)- **Framer Motion 11+** for animationscd evera-landing

└── types/            # TypeScript definitions

```- **@tailwindcss/typography** for whitepaper prose styling



## 🛠️ DevelopmentYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



```bash### Forms & Validation

# Development with hot reload

pnpm dev- **React Hook Form 7+** for form state management# Install dependencies



# Build for production- **Zod 3+** for schema validation

pnpm build

npm installThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Start production server

pnpm start### Data Visualization



# Run linter- **Recharts 2+** for token economics charts

pnpm lint



# Run tests

pnpm test### Additional Libraries# Copy environment variables## Learn More



# Run E2E tests- **Swiper.js 11+** for pitch deck slides

pnpm test:e2e

```Copy-Item .env.local.example .env.local



## 🧪 Testing---



- **Unit tests**: Jest + React Testing LibraryTo learn more about Next.js, take a look at the following resources:

- **E2E tests**: Playwright

- **Coverage**: Contract tests, component tests, integration tests## 🚦 Getting Started



```bash# Start development server

pnpm test              # Unit tests

pnpm test:e2e          # Integration tests### Prerequisites

```

- Node.js 20+ installednpm run dev- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## 📊 Analytics

- npm package manager

Privacy-friendly Plausible Analytics tracks:

- Email signups```- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- CTA clicks

- Whitepaper downloads### Installation

- Page views



Respects Do Not Track and requires no cookies.

1. **Navigate to project directory**

## 🌐 Deployment

   ```powershellThe site will be available at `http://localhost:3000`You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Vercel (Recommended)

   cd "c:\Users\onech\Desktop\Evera Protocol\evera-landing"

```bash

# Install Vercel CLI   ```

pnpm install -g vercel



# Deploy

vercel2. **Install dependencies**## 📁 Project Structure## Deploy on Vercel



# Deploy to production   ```powershell

vercel --prod

```   npm install



Configure environment variables in Vercel dashboard.   ```



## 🔒 Environment Variables```The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



Required variables (see `.env.example`):3. **Set up environment variables**



- `CONVERTKIT_API_KEY` - Email subscriptions   - Copy `.env.local.example` to `.env.local`evera-landing/

- `PLAUSIBLE_DOMAIN` - Analytics domain

- `NEXT_PUBLIC_SITE_URL` - Production URL   - Add your API keys (ConvertKit, Plausible Analytics)

- `NEXT_PUBLIC_DISCORD_URL` - Community link

- `NEXT_PUBLIC_TWITTER_URL` - Social media link├── src/Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## 🎨 Brand Colors4. **Run the development server**



```css   ```powershell│   ├── app/              # Next.js App Router pages

--charcoal: #313638;  /* Primary dark */

--gold: #E4B363;      /* Accent/CTA */   npm run dev│   │   ├── page.tsx      # Homepage

--stone: #E0DFD5;     /* Light background */

--coral: #EF6461;     /* Error/accent */   ```│   │   ├── layout.tsx    # Root layout

```

│   │   ├── globals.css   # Global styles

## 📝 Documentation

5. **Open your browser**│   │   └── api/          # API routes

- [Contributing Guide](./CONTRIBUTING.md) - Code style and contribution guidelines

- [Deployment Guide](./docs/deployment.md) - Detailed deployment instructions   Navigate to [http://localhost:3000](http://localhost:3000)│   │       ├── analytics/

- [Analytics Guide](./docs/analytics.md) - Analytics events and tracking

- [Content Update Guide](./docs/content-updates.md) - Non-technical content editing│   │       └── subscribe/



## 🤝 Contributing---│   ├── components/       # React components



1. Fork the repository│   │   ├── layout/       # Header, Footer, Navigation

2. Create feature branch (`git checkout -b feature/amazing-feature`)

3. Commit changes (`git commit -m 'Add amazing feature'`)## 📜 Available Scripts│   │   ├── home/         # Homepage sections

4. Push to branch (`git push origin feature/amazing-feature`)

5. Open Pull Request│   │   ├── shared/       # Reusable UI components



See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.```powershell│   │   ├── whitepaper/   # Whitepaper page components



## 📄 Licensenpm run dev          # Start development server (http://localhost:3000)│   │   ├── pitch/        # Pitch deck components



MIT License - see [LICENSE](LICENSE) filenpm run build        # Build for production│   │   ├── token/        # Token page components



## 📞 Contactnpm run start        # Start production server│   │   └── about/        # About page components



- Website: [https://evera.network](https://evera.network)npm run lint         # Run ESLint│   ├── lib/              # Utility functions

- Email: contact@evera.network

- Twitter: [@EveraProtocol](https://twitter.com/EveraProtocol)npm run type-check   # Run TypeScript type checking│   │   ├── analytics.ts  # Analytics tracking

- Discord: [Join our community](https://discord.gg/evera)

```│   │   └── utils.ts      # General utilities

---

│   ├── types/            # TypeScript type definitions

**Built with ❤️ by the Evera Protocol team**

---│   └── content/          # Static content data

│       ├── navigation.ts # Navigation links

## 📁 Project Structure│       └── team.ts       # Team member data

├── public/               # Static assets

```├── tailwind.config.ts    # Tailwind configuration

src/├── tsconfig.json         # TypeScript configuration

├── app/                    # Next.js App Router└── package.json          # Dependencies

│   ├── layout.tsx         # Root layout```

│   ├── page.tsx           # Homepage

│   └── api/               # API routes## 🎨 Tech Stack

├── components/

│   ├── home/              # Homepage sections- **Framework**: Next.js 14.2+ (App Router)

│   ├── layout/            # Header, Footer- **Language**: TypeScript 5.3+

│   └── shared/            # Reusable UI components- **Styling**: Tailwind CSS 3.4+

├── content/               # Static data- **Animation**: Framer Motion 11+

├── lib/                   # Utilities- **Forms**: React Hook Form 7+ + Zod 3+

└── types/                 # TypeScript definitions- **Charts**: Recharts 2+

```- **Carousels**: Swiper 11+



---## 🛠️ Available Scripts



## 🎨 Brand Colors```powershell

# Development server with hot reload

- **Charcoal**: `#313638` (Primary dark)npm run dev

- **Gold**: `#E4B363` (Accent/CTA)

- **Stone**: `#E0DFD5` (Light background)# Build for production

- **Coral**: `#EF6461` (Error/accent)npm run build



---# Start production server

npm start

## 📚 Documentation

# Lint code

Full documentation available in `specs/001-develop-an-eye/`:npm run lint

- **spec.md** - Complete feature specification

- **data-model.md** - TypeScript interfaces# Type check

- **quickstart.md** - Testing scenariosnpm run type-check

- **contracts/** - API and component specifications```



---## 🎯 Key Features Implemented



## ✅ Current Status### ✅ Core Infrastructure

- [x] Next.js 14 with App Router

**✔️ Completed:**- [x] TypeScript with strict mode

- Next.js 14 project initialization- [x] Tailwind CSS with brand colors

- TypeScript configuration with strict mode- [x] Framer Motion animations

- Tailwind CSS with brand colors- [x] Environment configuration

- Project folder structure- [x] Analytics tracking system

- Shared UI components (Button, Card, Input)- [x] API routes for subscriptions

- Layout components (Header, Footer)

- Hero section with animations### ✅ Layout Components

- API routes (analytics, subscription)- [x] Responsive Header with navigation

- Type definitions- [x] Footer with links and social media

- Environment configuration- [x] Mobile menu with hamburger

- Development server running at http://localhost:3000

### ✅ Homepage

**🚧 In Progress:**- [x] Hero section with CTA buttons

- Homepage sections (Problem, Solution, Features, Stats)- [x] Animated entrance effects

- Whitepaper page- [x] Stats display

- Token page- [x] Scroll indicator

- Pitch deck

- About page### ✅ Shared UI Components

- [x] Button (with variants and sizes)

---- [x] Card (with elevation styles)

- [x] Input (with validation states)

## 🆘 Troubleshooting

### ✅ API Endpoints

### SWC Binary Error- [x] `/api/analytics/track` - Event tracking

If you see "Failed to load SWC binary":- [x] `/api/subscribe` - Email subscription with rate limiting

```powershell

Remove-Item -Path "node_modules" -Recurse -Force## 🎨 Brand Colors

Remove-Item -Path "package-lock.json" -Force

npm install- **Charcoal**: `#313638` - Primary dark

```- **Gold**: `#E4B363` - Accent/CTA

- **Stone**: `#E0DFD5` - Light background

### Port Already in Use- **Coral**: `#EF6461` - Error/accent

If port 3000 is busy:

```powershell## 📝 Environment Variables

npm run dev -- -p 3001

```See `.env.local.example` for all required environment variables:



---- `CONVERTKIT_API_KEY` - ConvertKit API key for email subscriptions

- `CONVERTKIT_FORM_ID` - ConvertKit form ID

**Built with ❤️ for a more truthful internet**- `PLAUSIBLE_DOMAIN` - Domain for Plausible Analytics

- `NEXT_PUBLIC_SITE_URL` - Full site URL
- `NEXT_PUBLIC_SITE_NAME` - Site name
- Social media links (Twitter, Discord, Telegram, GitHub)
- Feature flags (presale enabled, pitch deck enabled, etc.)

## 🔜 Next Steps

The foundation is complete! Next features to implement:

1. **Homepage Sections**:
   - Problem Section (key problems with icons)
   - Solution Section (architecture diagram)
   - Features Grid (3-column layout)
   - Stats Section (animated counters)
   - CTA Section (email capture form)

2. **Additional Pages**:
   - `/whitepaper` - Full whitepaper with TOC
   - `/token` - Token economics and presale
   - `/pitch` - Animated pitch deck slides
   - `/about` - Team, mission, vision
   - `/careers` - Job listings
   - `/milestones` - Project roadmap

3. **Advanced Features**:
   - Email capture form with React Hook Form
   - Token economics charts with Recharts
   - Pitch deck carousel with Swiper
   - Whitepaper PDF download
   - Social sharing functionality

## 📚 Documentation

- [Full Specification](../specs/001-develop-an-eye/spec.md)
- [Data Model](../specs/001-develop-an-eye/data-model.md)
- [API Contracts](../specs/001-develop-an-eye/contracts/api-routes.md)
- [Component Props](../specs/001-develop-an-eye/contracts/component-props.md)
- [Testing Guide](../specs/001-develop-an-eye/quickstart.md)

## 🤝 Contributing

This project follows the Evera Protocol coding guidelines. See [copilot-instructions.md](../.github/copilot-instructions.md) for detailed coding standards.

## 📄 License

Copyright © 2025 Evera Protocol. All rights reserved.
