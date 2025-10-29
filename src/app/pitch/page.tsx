// T060 - Implement pitch deck page
import { Metadata } from 'next';
import { PitchDeckContainer } from '@/components/pitch/PitchDeckContainer';

export const metadata: Metadata = {
  title: 'Investor Pitch Deck - Evera Protocol',
  description:
    'Explore the Evera Protocol pitch deck: market opportunity, solution, tokenomics, team, and investment details for the future of verifiable information.',
  keywords: [
    'pitch deck',
    'investor presentation',
    'blockchain investment',
    'crypto pitch deck',
    'information verification',
    'Evera Protocol',
  ],
  openGraph: {
    title: 'Investor Pitch Deck - Evera Protocol',
    description:
      'Explore the Evera Protocol pitch deck with market analysis, solution details, and investment opportunity.',
    url: 'https://evera.network/pitch',
    siteName: 'Evera Protocol',
    images: [
      {
        url: 'https://evera.network/images/pitch/og-pitch.jpg',
        width: 1200,
        height: 630,
        alt: 'Evera Protocol Pitch Deck',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investor Pitch Deck - Evera Protocol',
    description:
      'Explore the Evera Protocol pitch deck: market, solution, tokenomics, team, and investment.',
    images: ['https://evera.network/images/pitch/twitter-pitch.jpg'],
  },
};

export default function PitchPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-charcoal">
      <PitchDeckContainer />
    </main>
  );
}
