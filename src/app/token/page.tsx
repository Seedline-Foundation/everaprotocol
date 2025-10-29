// T061 - Implement token page
import { Metadata } from 'next';
import { PresaleCard } from '@/components/token/PresaleCard';
import { TokenEconomicsChart } from '@/components/token/TokenEconomicsChart';
import { RoadmapTimeline } from '@/components/token/RoadmapTimeline';
import { CTASection } from '@/components/home/CTASection';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { tokenAllocation } from '@/content/presale';
import { milestones } from '@/content/milestones';

export const metadata: Metadata = {
  title: 'Token & Presale | Evera Protocol',
  description:
    'Join the Evera Protocol token presale. Learn about EVERA tokenomics, presale details, bonus tiers, and development roadmap.',
  keywords: [
    'EVERA token',
    'token presale',
    'cryptocurrency presale',
    'blockchain token',
    'token economics',
    'tokenomics',
    'crypto investment',
    'token allocation',
    'presale bonus',
  ],
  openGraph: {
    title: 'Join EVERA Token Presale | Evera Protocol',
    description:
      'Be among the first to join the Evera Protocol presale. Exclusive bonuses for early supporters.',
    url: 'https://evera.network/token',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join EVERA Token Presale',
    description: 'Exclusive bonuses for early supporters. Join now!',
  },
};

export default function TokenPage(): JSX.Element {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                EVERA Token Presale
              </h1>
              <p className="text-xl md:text-2xl text-stone max-w-3xl mx-auto">
                Be among the first to own EVERA tokens and help build the future
                of information verification
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Presale Card Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <PresaleCard showCountdown showProgress showBonusTier />
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">
                Why Invest in EVERA?
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                The EVERA token powers the entire Evera Protocol ecosystem
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Scarce Supply',
                description:
                  'Fixed supply of 1 billion tokens ensures long-term value preservation',
              },
              {
                icon: '🔥',
                title: 'Token Burns',
                description:
                  'Regular token burns from protocol fees increase scarcity over time',
              },
              {
                icon: '🎯',
                title: 'Utility-Driven',
                description:
                  'Required for staking, verification, and accessing premium features',
              },
              {
                icon: '💰',
                title: 'Staking Rewards',
                description:
                  'Earn passive income by staking tokens to secure the network',
              },
              {
                icon: '🗳️',
                title: 'Governance Rights',
                description:
                  'Vote on protocol upgrades, fee structures, and ecosystem developments',
              },
              {
                icon: '📈',
                title: 'Early Access',
                description:
                  'Presale participants get exclusive bonuses and early platform access',
              },
            ].map((benefit, index) => (
              <AnimatedSection
                key={index}
                animation="slide-up"
                delay={index * 0.1}
              >
                <div className="bg-stone-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal/70">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Token Economics Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <TokenEconomicsChart
            allocations={tokenAllocation}
            totalSupply={1_000_000_000}
            chartType="donut"
            showLegend
            showPercentages
          />
        </div>
      </section>

      {/* Vesting Schedule Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">
                Token Vesting Schedule
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                Ensuring long-term alignment and sustainable growth
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up">
              <div className="bg-stone-50 rounded-xl p-8">
                <div className="space-y-6">
                  {[
                    {
                      category: 'Presale Participants',
                      schedule: '20% at TGE, then 20% monthly for 4 months',
                      cliff: 'No cliff',
                    },
                    {
                      category: 'Team & Advisors',
                      schedule: '10% quarterly over 4 years',
                      cliff: '1-year cliff',
                    },
                    {
                      category: 'Community & Ecosystem',
                      schedule: 'Released based on milestones and community growth',
                      cliff: 'No cliff',
                    },
                    {
                      category: 'Treasury & Development',
                      schedule: '5% quarterly as needed for operations',
                      cliff: '6-month cliff',
                    },
                    {
                      category: 'Liquidity',
                      schedule: '50% at TGE, 50% over 6 months',
                      cliff: 'No cliff',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-charcoal mb-1">
                          {item.category}
                        </h4>
                        <p className="text-sm text-charcoal/70">
                          {item.schedule}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full font-semibold">
                          {item.cliff}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                  <p className="text-sm text-charcoal/70">
                    <span className="font-bold text-charcoal">Note:</span> TGE =
                    Token Generation Event. All vesting schedules are subject to
                    change based on market conditions and community governance
                    votes.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <RoadmapTimeline
            milestones={milestones}
            showProgress
            showEvidence
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">
                Presale FAQ
              </h2>
              <p className="text-xl text-charcoal/70">
                Common questions about the EVERA token presale
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                q: 'What payment methods are accepted?',
                a: 'We accept USDT, USDC, ETH, and BNB on multiple chains.',
              },
              {
                q: 'When will tokens be distributed?',
                a: 'Token distribution begins immediately after TGE, following the vesting schedule.',
              },
              {
                q: 'Is there a minimum purchase amount?',
                a: 'Yes, the minimum purchase is $100 worth of EVERA tokens.',
              },
              {
                q: 'Are there KYC requirements?',
                a: 'KYC is required for purchases over $10,000 to comply with regulations.',
              },
              {
                q: 'Can I get a refund?',
                a: 'Presale purchases are final and non-refundable. Please invest responsibly.',
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="slide-up"
                delay={index * 0.05}
              >
                <div className="bg-stone-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-charcoal/70">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready to Join the Presale?"
        description="Don't miss out on exclusive presale bonuses. Join thousands of early supporters building the future of information verification."
        variant="dual-cta"
        primaryCTA={{
          text: 'Join Presale Now',
          href: '#presale',
        }}
        secondaryCTA={{
          text: 'Read Whitepaper',
          href: '/whitepaper',
        }}
        backgroundColor="charcoal"
      />
    </main>
  );
}
