import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MessageCircle, 
  Mail, 
  FileText, 
  HelpCircle,
  ExternalLink,
  Clock,
  Users,
  Book
} from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

export const metadata: Metadata = {
  title: 'Support - Evera Protocol',
  description: 'Get help and support for Evera Protocol. Contact our team, access documentation, and join our community.',
  openGraph: {
    title: 'Support - Evera Protocol',
    description: 'Get help and support for Evera Protocol. Contact our team, access documentation, and join our community.',
    url: 'https://evera.network/support',
    siteName: 'Evera Protocol',
    images: [
      {
        url: 'https://evera.network/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support - Evera Protocol',
    description: 'Get help and support for Evera Protocol. Contact our team, access documentation, and join our community.',
    images: ['https://evera.network/twitter-image.jpg'],
  },
};

export default function SupportPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/90 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl md:text-2xl text-stone mb-8 max-w-3xl mx-auto">
            Get the support you need to succeed with Evera Protocol. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community Support */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Join Our Community
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with other users, get quick answers, and stay updated on the latest developments.
              </p>
              <Button
                variant="primary"
                href="https://t.me/EveraNetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Telegram
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Email Support */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Email Support
              </h3>
              <p className="text-gray-600 mb-6">
                For technical questions, partnership inquiries, or general support.
              </p>
              <Button
                variant="outline"
                href="mailto:support@evera.network"
                className="w-full"
              >
                <Mail className="w-5 h-5 mr-2" />
                support@evera.network
              </Button>
            </Card>

            {/* Documentation */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Documentation
              </h3>
              <p className="text-gray-600 mb-6">
                Learn about Evera Protocol with our comprehensive documentation and guides.
              </p>
              <Button
                variant="outline"
                href="/whitepaper"
                className="w-full"
              >
                <FileText className="w-5 h-5 mr-2" />
                Read Whitepaper
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about Evera Protocol
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    What is Evera Protocol?
                  </h3>
                  <p className="text-gray-600">
                    Evera Protocol is a blockchain-based decentralized information verification platform that fights misinformation through transparent content attribution and verification.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    How can I participate in the presale?
                  </h3>
                  <p className="text-gray-600">
                    You can join our presale by signing up for early access on our homepage or token page. We'll notify you when the presale goes live with exclusive bonuses for early supporters.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    Who can use Evera Protocol?
                  </h3>
                  <p className="text-gray-600">
                    Evera Protocol serves three main audiences: Publishers who want to protect their content, Verifiers who earn rewards for fact-checking, and Investors who believe in the future of decentralized information verification.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    When will the platform launch?
                  </h3>
                  <p className="text-gray-600">
                    We're currently in development with a planned mainnet launch in Q2 2025. You can track our progress on the milestones page and join our community for the latest updates.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-8">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 text-center">
              <Clock className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Response Time
              </h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Community First
              </h3>
              <p className="text-gray-600">
                Join our Telegram for the fastest responses and community support.
              </p>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-gold/10 to-coral/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-charcoal mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is ready to help you with any questions about Evera Protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                href="https://t.me/EveraNetwork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Telegram Community
              </Button>
              <Button
                variant="outline"
                href="mailto:support@evera.network"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}