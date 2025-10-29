// T037 - Implement CTASection component
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/shared/Button';
import { EmailCaptureForm } from '@/components/shared/EmailCaptureForm';
import Image from 'next/image';

interface CTASectionProps {
  headline: string;
  subheadline?: string;
  description?: string;
  variant?: 'default' | 'email-capture' | 'dual-cta';
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  emailCaptureSource?: string;
  backgroundImage?: string;
  backgroundColor?: 'charcoal' | 'gold' | 'stone' | 'white';
}

export function CTASection({
  headline,
  subheadline,
  description,
  variant = 'default',
  primaryCTA,
  secondaryCTA,
  emailCaptureSource = 'cta-section',
  backgroundImage,
  backgroundColor = 'charcoal',
}: CTASectionProps): JSX.Element {
  const bgColorClass = {
    charcoal: 'bg-charcoal',
    gold: 'bg-gold',
    stone: 'bg-stone',
    white: 'bg-white',
  }[backgroundColor];

  const textColorClass =
    backgroundColor === 'charcoal' ? 'text-white' : 'text-charcoal';
  const subTextColorClass =
    backgroundColor === 'charcoal' ? 'text-stone' : 'text-charcoal/70';

  return (
    <section className={`relative py-20 ${bgColorClass} overflow-hidden`}>
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="CTA background"
            fill
            className="object-cover opacity-20"
            quality={90}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <AnimatedSection animation="fade">
          <div className="text-center mb-10">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${textColorClass}`}
            >
              {headline}
            </h2>
            {subheadline && (
              <p className={`text-2xl font-semibold mb-6 ${textColorClass}`}>
                {subheadline}
              </p>
            )}
            {description && (
              <p className={`text-lg max-w-3xl mx-auto ${subTextColorClass}`}>
                {description}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* Variant: Default (Button CTAs) */}
        {variant === 'default' && (
          <AnimatedSection animation="slide-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && (
                <Button
                  variant="primary"
                  size="large"
                  href={primaryCTA.href}
                  className="text-lg px-8 py-4"
                >
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant="outline"
                  size="large"
                  href={secondaryCTA.href}
                  className={`text-lg px-8 py-4 ${
                    backgroundColor === 'charcoal'
                      ? 'text-white border-white hover:bg-white/10'
                      : 'text-charcoal border-charcoal hover:bg-charcoal/10'
                  }`}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Variant: Dual CTA (Same as default but explicit) */}
        {variant === 'dual-cta' && (
          <AnimatedSection animation="slide-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && (
                <Button
                  variant="primary"
                  size="large"
                  href={primaryCTA.href}
                  className="text-lg px-8 py-4"
                >
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant="secondary"
                  size="large"
                  href={secondaryCTA.href}
                  className="text-lg px-8 py-4"
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Variant: Email Capture */}
        {variant === 'email-capture' && (
          <AnimatedSection animation="slide-up" delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <EmailCaptureForm source={emailCaptureSource} />
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
    </section>
  );
}
