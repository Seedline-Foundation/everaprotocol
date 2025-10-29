// T062 - Implement About page (app/about/page.tsx)
import type { Metadata } from 'next';
import { TeamGrid } from '@/components/about/TeamGrid';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { teamMembers } from '@/content/team';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

export const metadata: Metadata = {
  title: 'About Evera Protocol | Team, Mission & Values',
  description:
    'Meet the team building the future of decentralized information verification. Learn about Evera Protocol\'s mission to combat misinformation through transparent blockchain technology.',
  keywords: [
    'blockchain team',
    'crypto founders',
    'information verification',
    'decentralized protocol',
    'Web3 company',
    'blockchain advisors',
    'misinformation solutions',
    'transparency technology',
  ],
  openGraph: {
    title: 'About Evera Protocol - Meet Our Team',
    description:
      'World-class team building decentralized information verification infrastructure.',
    url: 'https://evera.network/about',
    siteName: 'Evera Protocol',
    images: [
      {
        url: 'https://evera.network/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Evera Protocol Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Evera Protocol - Meet Our Team',
    description:
      'World-class team building decentralized information verification infrastructure.',
    images: ['https://evera.network/twitter-about.jpg'],
  },
};

export default function AboutPage(): JSX.Element {
  // Company values
  const values = [
    {
      icon: '🎯',
      title: 'Truth Above All',
      description:
        'We believe verifiable truth is the foundation of an informed society. Every decision we make prioritizes accuracy and transparency.',
    },
    {
      icon: '🔓',
      title: 'Radically Open',
      description:
        'Open-source protocols, transparent operations, public roadmaps. We build in the open because trust requires visibility.',
    },
    {
      icon: '🌍',
      title: 'Globally Inclusive',
      description:
        'Information verification should be accessible to everyone, everywhere. We design for diversity and global participation.',
    },
    {
      icon: '⚡',
      title: 'User-First Innovation',
      description:
        'Technology serves people, not the other way around. We prioritize usability and real-world impact over technical complexity.',
    },
  ];

  // Mission stats
  const stats = [
    {
      value: '50M+',
      label: 'Monthly Users (Target)',
      description: 'Information consumers protected from misinformation',
    },
    {
      value: '10K+',
      label: 'Publishers (Target)',
      description: 'Content creators using Evera verification',
    },
    {
      value: '1K+',
      label: 'Verifiers (Target)',
      description: 'Independent fact-checkers securing the network',
    },
    {
      value: '$50M+',
      label: 'Economic Impact (Target)',
      description: 'Value distributed to ecosystem participants',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Building the Future of{' '}
                <span className="text-gold">Verifiable Truth</span>
              </h1>
              <p className="text-xl md:text-2xl text-stone mb-8">
                We're a team of blockchain innovators, journalists, and cryptographers
                united by a single mission: make truth verifiable, misinformation
                transparent, and quality journalism sustainable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="large"
                  href="#team"
                  className="text-lg px-8 py-4"
                >
                  Meet the Team
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  href="/careers"
                  className="text-lg px-8 py-4 text-white border-white hover:bg-white/10"
                >
                  Join Us
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed mb-8">
                Every day, billions of people consume information without knowing its
                source, accuracy, or bias. This information asymmetry enables
                misinformation to spread, erodes trust in institutions, and threatens
                democratic discourse.
              </p>
              <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed">
                Evera Protocol creates a decentralized infrastructure where every piece of
                information carries verifiable provenance, publisher reputation, and
                community validation. We're not building a fact-checking service—we're
                building the rails for a trustworthy information economy.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-12">
              Our Target Impact
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <Card padding="large" shadow="medium" className="text-center h-full">
                  <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-charcoal mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-charcoal/70">{stat.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                Our Values
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                These principles guide every decision we make, from product design to
                partnerships.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <Card padding="large" shadow="medium" className="h-full">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-charcoal mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70">{value.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamGrid
            members={teamMembers}
            showFilters={true}
            variant="detailed"
            title="Meet the Team"
            subtitle="World-class builders, researchers, and advisors from leading blockchain and media companies."
          />
        </div>
      </section>

      {/* Backed By Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Backed by Industry Leaders
              </h2>
              <p className="text-xl text-charcoal/70 mb-12">
                We're fortunate to have support from world-class investors, blockchain
                foundations, and media organizations who share our vision for verifiable
                information.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                {/* Placeholder for investor/partner logos */}
                <div className="text-center text-charcoal/40 font-semibold">
                  [Investor Logo]
                </div>
                <div className="text-center text-charcoal/40 font-semibold">
                  [Investor Logo]
                </div>
                <div className="text-center text-charcoal/40 font-semibold">
                  [Investor Logo]
                </div>
                <div className="text-center text-charcoal/40 font-semibold">
                  [Investor Logo]
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-charcoal to-charcoal/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl text-stone mb-8">
                We're hiring talented engineers, researchers, and operators who want to
                make a real impact on the information economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="large"
                  href="/careers"
                  className="text-lg px-8 py-4"
                >
                  View Open Positions
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  href="mailto:hello@evera.network"
                  className="text-lg px-8 py-4 text-white border-white hover:bg-white/10"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
