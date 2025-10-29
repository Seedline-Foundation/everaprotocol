// T059 - Implement Whitepaper page
import type { Metadata } from 'next';
import { WhitepaperContent } from '@/components/whitepaper/WhitepaperContent';
import { TableOfContents, TableOfContentsDropdown } from '@/components/whitepaper/TableOfContents';
import { DownloadButton } from '@/components/whitepaper/DownloadButton';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { whitepaperSections, whitepaperTocItems } from '@/content/whitepaper';

export const metadata: Metadata = {
  title: 'Whitepaper | Evera Protocol Technical Documentation',
  description:
    'Deep dive into Evera Protocol\'s technical architecture, tokenomics, and roadmap. Learn how blockchain technology enables decentralized information verification and sustainable journalism.',
  keywords: [
    'blockchain whitepaper',
    'information verification',
    'decentralized protocol',
    'crypto whitepaper',
    'technical documentation',
    'tokenomics',
    'Web3 protocol',
    'misinformation solution',
    'fact-checking blockchain',
  ],
  openGraph: {
    title: 'Evera Protocol Whitepaper - Technical Documentation',
    description:
      'Comprehensive technical documentation for the decentralized information verification protocol.',
    url: 'https://evera.network/whitepaper',
    siteName: 'Evera Protocol',
    images: [
      {
        url: 'https://evera.network/og-whitepaper.jpg',
        width: 1200,
        height: 630,
        alt: 'Evera Protocol Whitepaper',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evera Protocol Whitepaper',
    description: 'Technical documentation for decentralized information verification',
    images: ['https://evera.network/twitter-whitepaper.jpg'],
  },
};

export default function WhitepaperPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              {/* Document Badge */}
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold">
                  Technical Documentation v1.0
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Evera Protocol <span className="text-gold">Whitepaper</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-stone mb-8">
                A Decentralized Infrastructure for Verifiable Information
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap justify-center gap-6 text-stone/80 text-sm mb-10">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Published: October 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span>25 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Technical</span>
                </div>
              </div>

              {/* Download CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DownloadButton
                  pdfUrl="/documents/Evera_Protocol_Whitepaper.pdf"
                  size="large"
                  className="mx-auto sm:mx-0"
                />
                <Button
                  variant="outline"
                  size="large"
                  href="#executive-summary"
                  className="text-white border-white hover:bg-white/10"
                >
                  Read Online
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar - Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-3">
              <TableOfContents items={whitepaperTocItems} />
            </aside>

            {/* Mobile TOC Dropdown */}
            <div className="lg:hidden mb-8">
              <TableOfContentsDropdown items={whitepaperTocItems} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {/* Abstract Card */}
              <AnimatedSection>
                <Card padding="large" shadow="medium" className="mb-12 bg-stone-50">
                  <h2 className="text-2xl font-bold text-charcoal mb-4">
                    Abstract
                  </h2>
                  <p className="text-charcoal/80 leading-relaxed">
                    Evera Protocol introduces a decentralized infrastructure for
                    verifiable information combining blockchain technology with
                    economic incentives. This whitepaper details the technical
                    architecture, token economics, and governance mechanisms
                    enabling transparent content attribution, sustainable
                    fact-checking, and quantifiable reputation systems. By creating
                    on-chain provenance records and incentivizing verification work,
                    Evera Protocol addresses systemic failures in the digital
                    information economy.
                  </p>
                </Card>
              </AnimatedSection>

              {/* Whitepaper Content */}
              <WhitepaperContent sections={whitepaperSections} />

              {/* Bottom CTA */}
              <AnimatedSection>
                <Card
                  padding="large"
                  shadow="medium"
                  className="mt-16 bg-gradient-to-br from-charcoal to-charcoal/90 text-white"
                >
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">
                      Join the Evera Ecosystem
                    </h3>
                    <p className="text-stone text-lg mb-8 max-w-2xl mx-auto">
                      Participate in the presale and become an early supporter of
                      decentralized information verification.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        variant="primary"
                        size="large"
                        href="/token"
                        className="text-lg px-8 py-4"
                      >
                        View Token Presale
                      </Button>
                      <Button
                        variant="outline"
                        size="large"
                        href="/about"
                        className="text-lg px-8 py-4 text-white border-white hover:bg-white/10"
                      >
                        Meet the Team
                      </Button>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-12">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                question: 'How is Evera different from traditional fact-checking?',
                answer:
                  'Evera Protocol uses blockchain technology to create transparent, auditable verification records. Unlike centralized fact-checkers, our decentralized network prevents single points of failure and makes all verification criteria and evidence publicly accessible.',
              },
              {
                question: 'What blockchain does Evera use?',
                answer:
                  'Evera Protocol is built on Ethereum with Layer 2 scaling solutions for cost-effective transactions. This ensures security through Ethereum\'s established network while optimizing for performance and low transaction fees.',
              },
              {
                question: 'How do verifiers earn rewards?',
                answer:
                  'Verifiers stake EVERA tokens and submit evidence-based assessments of content. When their verdicts align with consensus, they earn token rewards proportional to their stake and accuracy. Incorrect judgments result in stake slashing.',
              },
              {
                question: 'Can publishers manipulate their reputation scores?',
                answer:
                  'No. Reputation scores are calculated algorithmically based on verification results recorded on-chain. Publishers have no direct control over their scores—only the quality of their content affects reputation.',
              },
              {
                question: 'How is this sustainable long-term?',
                answer:
                  'The token economics create a flywheel: as ecosystem usage grows, verification fees generate deflationary pressure while rewards attract more verifiers. High-quality publishers gain visibility, attracting more consumers and creating sustainable revenue streams.',
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <Card padding="large" shadow="medium">
                  <h3 className="text-xl font-bold text-charcoal mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-charcoal/80 leading-relaxed">{faq.answer}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
