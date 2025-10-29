// T034 - Implement SolutionSection component
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/shared/Button';
import Image from 'next/image';

interface SolutionFeature {
  id: string;
  title: string;
  description: string;
}

interface SolutionSectionProps {
  headline: string;
  subheadline: string;
  description: string;
  features: SolutionFeature[];
  diagramImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  cta?: {
    text: string;
    href: string;
  };
}

export function SolutionSection({
  headline,
  subheadline,
  description,
  features,
  diagramImage,
  cta,
}: SolutionSectionProps): JSX.Element {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <AnimatedSection animation="fade">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              {headline}
            </h2>
            <p className="text-2xl text-gold font-semibold mb-6">
              {subheadline}
            </p>
            <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </AnimatedSection>

        {/* Diagram (if provided) */}
        {diagramImage && (
          <AnimatedSection animation="zoom" className="my-16">
            <div className="relative max-w-5xl mx-auto">
              <Image
                src={diagramImage.src}
                alt={diagramImage.alt}
                width={diagramImage.width}
                height={diagramImage.height}
                className="w-full h-auto rounded-lg shadow-xl"
                priority={false}
              />
            </div>
          </AnimatedSection>
        )}

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.id}
              animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={index * 0.1}
            >
              <div className="flex gap-4">
                {/* Checkmark Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-charcoal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Feature Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Button */}
        {cta && (
          <AnimatedSection animation="fade" delay={0.5}>
            <div className="text-center">
              <Button
                variant="primary"
                size="large"
                href={cta.href}
                className="text-lg px-8 py-4"
              >
                {cta.text}
              </Button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
