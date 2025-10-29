// T058 - Implement homepage
import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Evera Protocol - Verifiable Truth for the Information Age',
  description:
    'Blockchain-based decentralized information verification platform. Fight misinformation with transparent content attribution, fact-checking, and reputation scoring.',
  keywords: [
    'blockchain',
    'misinformation',
    'fact-checking',
    'content verification',
    'decentralized',
    'Web3',
    'information integrity',
    'content attribution',
  ],
  openGraph: {
    title: 'Evera Protocol - Verifiable Truth for the Information Age',
    description:
      'Fight misinformation with blockchain-based content verification. Join the presale.',
    url: 'https://evera.network',
    siteName: 'Evera Protocol',
    images: [
      {
        url: 'https://evera.network/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evera Protocol - Decentralized Information Verification',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evera Protocol - Verifiable Truth for the Information Age',
    description:
      'Blockchain-based decentralized information verification. Join presale.',
    images: ['https://evera.network/twitter-image.jpg'],
    creator: '@EveraProtocol',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://evera.network',
  },
};

export default function Home(): JSX.Element {
  // Problems data
  const problems = [
    {
      id: 'misinformation-spread',
      icon: '🚨',
      title: 'Misinformation Epidemic',
      description:
        'False information spreads 6x faster than truth online, eroding public trust and causing real-world harm.',
      impact: '$89B annual cost',
    },
    {
      id: 'no-accountability',
      icon: '🎭',
      title: 'Zero Accountability',
      description:
        'Content creators can publish false claims with impunity, while victims have no recourse or proof of harm.',
      impact: '78% trust crisis',
    },
    {
      id: 'ai-deepfakes',
      icon: '🤖',
      title: 'AI-Generated Deception',
      description:
        'Advanced AI generates convincing fake content at scale, making traditional verification methods obsolete.',
      impact: '3.5B exposed daily',
    },
  ];

  // Solution features
  const solutionFeatures = [
    {
      id: 'immutable-records',
      title: 'Immutable Content Records',
      description:
        'Every piece of content is cryptographically signed and stored on-chain, creating permanent proof of authorship.',
    },
    {
      id: 'community-verification',
      title: 'Decentralized Verification Network',
      description:
        'Global network of verifiers stakes tokens to validate claims, earning rewards for accuracy.',
    },
    {
      id: 'reputation-economy',
      title: 'On-Chain Reputation Economy',
      description:
        'Publishers and verifiers build verifiable reputation scores based on historical accuracy.',
    },
    {
      id: 'instant-validation',
      title: 'Instant Validation',
      description:
        'Real-time verification results powered by decentralized consensus and cryptographic proofs.',
    },
  ];

  // Features for grid
  const features = [
    {
      id: 'content-attribution',
      icon: '📝',
      title: 'Content Attribution',
      description:
        'Immutable proof of authorship and content origin with cryptographic verification.',
      benefits: [
        'Cryptographic signatures',
        'Timestamp verification',
        'Ownership tracking',
      ],
    },
    {
      id: 'fact-checking',
      icon: '✓',
      title: 'Decentralized Fact-Checking',
      description:
        'Community-driven verification with economic incentives for accuracy.',
      benefits: [
        'Stake-based verification',
        'Consensus mechanisms',
        'Transparent results',
      ],
    },
    {
      id: 'reputation-system',
      icon: '🏆',
      title: 'Reputation Scoring',
      description:
        'On-chain reputation for publishers and verifiers based on accuracy.',
      benefits: [
        'Historical tracking',
        'Performance metrics',
        'Trust indicators',
      ],
    },
  ];

  // Statistics
  const stats = [
    {
      id: 'economic-impact',
      value: 89,
      label: 'Billion $ annual misinformation cost',
      prefix: '$',
      suffix: 'B',
      animated: true,
    },
    {
      id: 'trust-crisis',
      value: 78,
      label: 'Of users struggle to identify fake news',
      suffix: '%',
      animated: true,
    },
    {
      id: 'daily-exposure',
      value: 3.5,
      label: 'Billion people exposed daily',
      suffix: 'B',
      animated: true,
    },
    {
      id: 'accuracy',
      value: '90+',
      label: 'Verification accuracy with Evera',
      suffix: '%',
      animated: false,
    },
  ];

  return (
    <main>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Evera Protocol',
            description:
              'Blockchain-based decentralized information verification platform',
            url: 'https://evera.network',
            logo: 'https://evera.network/logo.png',
            foundingDate: '2024',
            sameAs: [
              'https://twitter.com/EveraProtocol',
              'https://github.com/evera-protocol',
              'https://discord.gg/evera',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'support@evera.network',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection
        headline="The Crisis We Face"
        subheadline="Misinformation is undermining truth, democracy, and trust in institutions worldwide."
        problems={problems}
      />

      {/* Solution Section */}
      <SolutionSection
        headline="The Evera Solution"
        subheadline="Blockchain-Powered Truth Infrastructure"
        description="Evera Protocol creates a decentralized network for verifying information authenticity, combining cryptographic proofs with economic incentives to ensure accuracy."
        features={solutionFeatures}
        diagramImage={{
          src: '/images/diagrams/evera-architecture.png',
          alt: 'Evera Protocol Architecture Diagram',
          width: 1200,
          height: 675,
        }}
        cta={{
          text: 'Explore Technology',
          href: '/whitepaper',
        }}
      />

      {/* Features Grid */}
      <FeaturesGrid
        headline="Powerful Features for Information Integrity"
        subheadline="Built for publishers, verifiers, and content consumers"
        features={features}
        columns={3}
      />

      {/* Stats Section */}
      <StatsSection headline="The Impact of Misinformation" stats={stats} />

      {/* Final CTA */}
      <CTASection
        headline="Join the Movement for Verifiable Truth"
        subheadline="Be part of the solution"
        description="Join our presale and help build the future of information verification. Early supporters get exclusive benefits and governance rights."
        variant="email-capture"
        emailCaptureSource="homepage-bottom"
        backgroundColor="charcoal"
      />
    </main>
  );
}
