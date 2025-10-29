// T064 - Implement milestones page
import { Metadata } from 'next';
import { MilestoneTimeline } from '@/components/milestones/MilestoneTimeline';
import { milestones } from '@/content/milestones';

export const metadata: Metadata = {
  title: 'Roadmap & Milestones - Evera Protocol',
  description:
    'Track the progress of Evera Protocol with our transparent roadmap. View completed milestones, current development status, and upcoming features for our decentralized information verification platform.',
  openGraph: {
    title: 'Roadmap & Milestones - Evera Protocol',
    description:
      'Track the progress of Evera Protocol with our transparent roadmap. View completed milestones, current development status, and upcoming features.',
    url: 'https://evera.network/milestones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap & Milestones - Evera Protocol',
    description:
      'Track the progress of Evera Protocol with our transparent roadmap. View completed milestones and upcoming features.',
  },
};

export default function MilestonesPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Transparent Roadmap</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Journey to
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold/70">
              Verifiable Truth
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            We believe in radical transparency. Track our progress, view completed milestones, and
            see what's coming next for Evera Protocol.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-stone-300" />
              <span>Planned</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <div className="w-3 h-3 rounded-full bg-coral" />
              <span>Delayed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Message */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gold/5 to-gold/10 border border-gold/20 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-3">Why We're Transparent</h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">
                  At Evera Protocol, we practice what we preach. Just as we're building a platform
                  for verifiable information, we commit to complete transparency about our own
                  progress. Every milestone, delay, and achievement is documented here.
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                  If we encounter delays, we'll explain why. When we hit milestones ahead of
                  schedule, you'll see the evidence. This roadmap is our promise to you—our
                  community, investors, and partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Development Roadmap</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Follow our journey from initial design to full ecosystem launch. Click on any
              milestone to view detailed progress and evidence.
            </p>
          </div>

          <MilestoneTimeline milestones={milestones} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-charcoal to-charcoal/95 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Progress at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Milestones */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">{milestones.length}</div>
              <div className="text-stone-300 text-sm uppercase tracking-wider">Total Milestones</div>
            </div>

            {/* Completed */}
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">
                {milestones.filter((m) => m.status === 'completed').length}
              </div>
              <div className="text-stone-300 text-sm uppercase tracking-wider">Completed</div>
            </div>

            {/* In Progress */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">
                {milestones.filter((m) => m.status === 'in-progress').length}
              </div>
              <div className="text-stone-300 text-sm uppercase tracking-wider">In Progress</div>
            </div>

            {/* Average Progress */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                {Math.round(
                  milestones.reduce((sum, m) => sum + (m.progress || 0), 0) / milestones.length
                )}
                %
              </div>
              <div className="text-stone-300 text-sm uppercase tracking-wider">Overall Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Want Updates on Our Progress?
          </h2>
          <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive monthly updates on milestone completions, new
            features, and development insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#email-signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold/90 text-charcoal font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Subscribe for Updates
            </a>
            <a
              href="/whitepaper"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-50 text-charcoal font-semibold rounded-lg border-2 border-charcoal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Read Technical Whitepaper
            </a>
          </div>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="py-12 px-4 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm">
            <svg className="w-6 h-6 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-charcoal/70">
              Follow our open-source development on{' '}
              <a
                href="https://github.com/evera-protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-charcoal hover:text-gold transition-colors"
              >
                GitHub
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
